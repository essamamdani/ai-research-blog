#!/usr/bin/env node

/**
 * Daily AI Article Generator
 * 
 * This script generates a new AI research article based on current topics.
 * Usage: node generate-article.js --topic "Topic Name" --models "Model1,Model2"
 */

const fs = require('fs')
const path = require('path')

// Template for new articles
const articleTemplate = `---
title: "{{TITLE}}"
date: "{{DATE}}"
author: "AI Research Team"
category: "AI Models"
tags: [{{TAGS}}]
image: "/assets/images/article-header.jpg"
readingTime: {{READING_TIME}}
---

# {{TITLE}}

![AI Research](/assets/images/article-header.jpg)

{{INTRODUCTION}}

## {{SECTION_1_TITLE}}

{{SECTION_1_CONTENT}}

## {{SECTION_2_TITLE}}

{{SECTION_2_CONTENT}}

## {{SECTION_3_TITLE}}

{{SECTION_3_CONTENT}}

## Key Takeaways

{{CONCLUSION}}

---

*Published: {{DATE}}*  
*Categories: AI Research, LLM, Technology Trends*
`

function generateArticle(options = {}) {
  const today = new Date().toISOString().split('T')[0]
  const dateStr = today.replace(/-/g, '-')
  
  const title = options.title || `AI Model Analysis - ${today}`
  const tags = options.tags || ['AI', 'LLM', 'Research']
  const readingTime = options.readingTime || 8
  
  // Generate slug from title
  const slug = `${dateStr}-${title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')}`
  
  const fileName = `${slug}.md`
  const filePath = path.join(__dirname, '../articles', fileName)
  
  // Check if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`Article already exists: ${fileName}`)
    return null
  }
  
  // Generate content
  let content = articleTemplate
    .replace(/{{TITLE}}/g, title)
    .replace(/{{DATE}}/g, today)
    .replace(/{{TAGS}}/g, tags.map(t => `"${t}"`).join(', '))
    .replace(/{{READING_TIME}}/g, readingTime)
    .replace(/{{INTRODUCTION}}/g, options.introduction || 'Introduction to the latest AI developments.')
    .replace(/{{SECTION_1_TITLE}}/g, options.section1Title || 'Overview')
    .replace(/{{SECTION_1_CONTENT}}/g, options.section1Content || 'Section content...')
    .replace(/{{SECTION_2_TITLE}}/g, options.section2Title || 'Technical Details')
    .replace(/{{SECTION_2_CONTENT}}/g, options.section2Content || 'Section content...')
    .replace(/{{SECTION_3_TITLE}}/g, options.section3Title || 'Real-World Applications')
    .replace(/{{SECTION_3_CONTENT}}/g, options.section3Content || 'Section content...')
    .replace(/{{CONCLUSION}}/g, options.conclusion || 'Summary of key points.')
  
  // Write file
  fs.writeFileSync(filePath, content)
  console.log(`Generated article: ${fileName}`)
  
  return fileName
}

// Parse command line arguments
const args = process.argv.slice(2)
const options = {}

for (let i = 0; i < args.length; i += 2) {
  const key = args[i].replace('--', '')
  const value = args[i + 1]
  if (key && value) {
    if (key === 'tags') {
      options[key] = value.split(',').map(t => t.trim())
    } else if (key === 'readingTime') {
      options[key] = parseInt(value)
    } else {
      options[key] = value
    }
  }
}

// Generate article if run directly
if (require.main === module) {
  const fileName = generateArticle(options)
  if (fileName) {
    console.log('Article generated successfully!')
    console.log(`File: articles/${fileName}`)
  }
}

module.exports = { generateArticle }
