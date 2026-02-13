# AI Research Articles Blog

A modern, automated blog for publishing daily AI research articles. Built with Next.js, Tailwind CSS, and deployed on Vercel.

## Features

- 🚀 **Next.js 15** with App Router
- 📝 **Markdown-based** articles with MDX support
- 🎨 **Tailwind CSS** for styling
- 🌙 **Dark mode** support
- 📱 **Responsive** design
- 🔍 **SEO optimized**
- ⚡ **Vercel** deployment ready

## Project Structure

```
├── app/                    # Next.js app directory
├── articles/              # Markdown articles
├── components/            # React components
├── lib/                   # Utility functions
├── public/               # Static assets
├── scripts/              # Automation scripts
└── templates/            # Article templates
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Daily Automation Workflow

1. Run `scripts/generate-article.js` to create new articles
2. Articles are saved to `articles/` with proper frontmatter
3. Push to GitHub triggers Vercel deployment
4. New articles go live automatically

## Article Format

Articles use YAML frontmatter:
```yaml
---
title: "Article Title"
date: "2026-02-13"
author: "AI Research Team"
category: "AI Models"
tags: ["Gemini", "Google", "LLM"]
image: "/assets/images/article-header.jpg"
---
```

## License

MIT
