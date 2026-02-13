import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'

export default function Home() {
  const articles = getAllArticles()

  return (
    <main className="min-h-screen hero-gradient">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">AI Research Blog</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8">
            Daily insights on the latest AI model releases, benchmarks, and industry trends
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Daily Updates
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              In-Depth Analysis
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Expert Reviews
            </span>
          </div>
        </div>

        {/* Featured Article */}
        {articles.length > 0 && (
          <div className="mb-16">
            <div className="article-card group cursor-pointer">
              <Link href={`/articles/${articles[0].slug}`}>
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-2/3">
                    <span className="tag">Latest Article</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4 group-hover:text-blue-400 transition-colors">
                      {articles[0].title}
                    </h2>
                    <p className="text-gray-400 text-lg mb-6">
                      {articles[0].excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-2">
                        <Calendar size={16} />
                        {format(new Date(articles[0].date), 'MMMM d, yyyy')}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock size={16} />
                        {articles[0].readingTime} min read
                      </span>
                      <span className="flex items-center gap-2">
                        <Tag size={16} />
                        {articles[0].category}
                      </span>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-blue-400 group-hover:text-blue-300">
                      Read Article <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  <div className="lg:w-1/3 flex items-center justify-center">
                    <div className="w-full h-48 lg:h-64 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl border border-gray-700 flex items-center justify-center">
                      <span className="text-6xl">🤖</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Article Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-white mb-8">All Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <Link key={article.slug} href={`/articles/${article.slug}`}>
                <article className="article-card h-full flex flex-col">
                  <div className="flex-1">
                    <span className="tag">{article.category}</span>
                    <h4 className="text-xl font-semibold text-white mt-3 mb-3 group-hover:text-blue-400">
                      {article.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-700">
                    <span>{format(new Date(article.date), 'MMM d, yyyy')}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {article.readingTime} min
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-10 border-t border-gray-800 text-center text-gray-500">
          <p>© 2026 AI Research Blog. All rights reserved.</p>
          <p className="mt-2 text-sm">Automated daily AI research analysis.</p>
        </footer>
      </section>
    </main>
  )
}
