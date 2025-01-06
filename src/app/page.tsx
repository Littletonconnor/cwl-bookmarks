import { ArrowRight } from 'lucide-react'

import { BookmarkSearch } from '@/components/bookmark-search'
import { fetchBookmarks } from '@/utils/actions'

export default async function Home() {
  const bookmarks = await fetchBookmarks()

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">
            <ArrowRight className="w-4 h-4" />
          </span>
          <h1 className="text-lg uppercase">Bookmarks</h1>
        </div>
        <button className="cursor-pointer uppercase text-gray-500 hover:text-gray-700">
          Manage
        </button>
      </header>
      <div className="relative mb-6">
        <BookmarkSearch bookmarks={bookmarks} />
      </div>
    </div>
  )
}
