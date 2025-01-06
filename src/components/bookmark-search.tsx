'use client'

import * as React from 'react'
import { Search } from 'lucide-react'

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

  return (
    <>
      <div className="relative mb-6">
        <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search bookmarks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 pl-12 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <ul className="space-y-4">
        {filteredBookmarks.map((b: any) => {
          return (
            <li key={b.id}>
              <a
                key={b.id}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer flex items-center justify-between py-2 hover:bg-gray-50 group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${b.url}&sz=32`}
                    alt=""
                    className="w-4 h-4"
                  />
                  <span>{b.title}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>[{new URL(b.url).hostname}]</span>
                  <span>Jan 02, 2025</span>
                </div>
              </a>
            </li>
          )
        })}
      </ul>
    </>
  )
}
