import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'

const articlesDirectory = path.join(process.cwd(), 'articles')

export interface Article {
  slug: string
  title: string
  date: string
  author: string
  category: string
  tags: string[]
  excerpt: string
  content: string
  readingTime: number
}

export function getAllArticles(): Article[] {
  // Get file names under /articles
  const fileNames = fs.readdirSync(articlesDirectory)
  const allArticlesData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '')

      // Read markdown file as string
      const fullPath = path.join(articlesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents)

      // Generate excerpt from content (first 200 chars)
      const content = matterResult.content
      const excerpt = content
        .replace(/#.*$/gm, '') // Remove headings
        .replace(/\*\*/g, '') // Remove bold
        .replace(/\*/g, '') // Remove italic
        .replace(/`/g, '') // Remove code
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links but keep text
        .replace(/\n+/g, ' ') // Replace newlines with spaces
        .trim()
        .slice(0, 250) + '...'

      return {
        slug,
        title: matterResult.data.title || 'Untitled',
        date: matterResult.data.date || new Date().toISOString(),
        author: matterResult.data.author || 'AI Research Team',
        category: matterResult.data.category || 'General',
        tags: matterResult.data.tags || [],
        excerpt,
        content,
        readingTime: matterResult.data.readingTime || 5,
      }
    })

  // Sort articles by date
  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      slug,
      title: matterResult.data.title || 'Untitled',
      date: matterResult.data.date || new Date().toISOString(),
      author: matterResult.data.author || 'AI Research Team',
      category: matterResult.data.category || 'General',
      tags: matterResult.data.tags || [],
      excerpt: '',
      content: matterResult.content,
      readingTime: matterResult.data.readingTime || 5,
    }
  } catch {
    return null
  }
}

export async function getArticleContent(content: string): Promise<string> {
  const processedContent = await remark()
    .use(gfm)
    .use(html, { allowDangerousHtml: true })
    .process(content)
  
  return processedContent.toString()
}
