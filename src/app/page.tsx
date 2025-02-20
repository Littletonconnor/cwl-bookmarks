'use client'

import { BookmarkSearch } from '@/components/bookmark-search'
import { Header } from '@/components/header'
import { useDb } from '@/lib/db'

// import { fetchBookmarks } from '@/lib/actions'

export default function Home() {
  useDb()

  return (
    <div className="h-full max-w-[1200px] mx-auto p-4">
      <Header />
      <BookmarkSearch bookmarks={[]} />
    </div>
  )
}
