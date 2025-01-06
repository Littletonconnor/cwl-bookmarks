import { BookmarkSearch } from '@/components/bookmark-search'
import { Header } from '@/components/header'
import { fetchBookmarks } from '@/lib/actions'

export default async function Home() {
  const bookmarks = await fetchBookmarks()

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <Header />
      <BookmarkSearch bookmarks={bookmarks} />
    </div>
  )
}
