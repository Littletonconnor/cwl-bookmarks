'use client'

import * as React from 'react'
import { Search } from 'lucide-react'

import { BookmarkList } from './bookmark-list'

interface BookmarkSearchProps {
  bookmarks: any
}

export function BookmarkSearch({ bookmarks }: BookmarkSearchProps) {
  const [searchTerm, setSearchTerm] = React.useState('')

  const filteredBookmarks = bookmarks.filter((b: any) => {
    return (
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.tags.some((tag: any) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })
  const noSearchResults = !filteredBookmarks.length

  return (
    <div>
      <div className="flex items-center relative mb-6">
        <Search className="absolute left-4 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search bookmarks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 pl-12 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <BookmarkList bookmarks={filteredBookmarks} />
      {noSearchResults && (
        <div className="text-base text-gray-500">
          There are no search results. Press enter to add a new bookmark.
        </div>
      )}
    </div>
  )
}
