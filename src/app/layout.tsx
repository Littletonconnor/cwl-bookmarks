import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'

import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'CWL Bookmarks',
  description: 'A simple bookmarking app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
