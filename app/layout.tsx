import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Research Blog | Daily AI Model Analysis',
  description: 'Daily insights on the latest AI model releases, benchmarks, and industry trends.',
  keywords: ['AI', 'LLM', 'Machine Learning', 'Gemini', 'GPT', 'OpenAI', 'Research'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-gray-100 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
