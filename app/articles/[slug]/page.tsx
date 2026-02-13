import { getAllArticles, getArticleBySlug, getArticleContent } from '@/lib/articles'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react'
import { format } from 'date-fns'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  
  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: `${article.title} | AI Research Blog`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const contentHtml = await getArticleContent(article.content)

  return (
    <main className="min-h-screen bg-gray-900">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Articles
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="tag">{article.category}</span>
            {article.tags.slice(0, 3).map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <User size={16} />
              {article.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {format(new Date(article.date), 'MMMM d, yyyy')}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} />
              {article.readingTime} min read
            </span>
          </div>
        </header>

        {/* Featured Image Placeholder */}
        <div className="w-full h-64 md:h-96 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-2xl border border-gray-700 flex items-center justify-center mb-12">
          <span className="text-8xl">🤖</span>
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Tags Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span key={tag} className="tag">
                <Tag size={12} className="inline mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </footer>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
            Browse All Articles
          </Link>
        </div>
      </article>
    </main>
  )
}
