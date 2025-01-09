'use client'

import * as React from 'react'
import { Search } from 'lucide-react'

import { BookmarkList } from './bookmark-list'

interface BookmarkSearchProps {
  bookmarks: any
}

export function BookmarkSearch({ bookmarks: allBookmarks }: BookmarkSearchProps) {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [tags, setTags] = React.useState<string[]>([])
  const [bookmarks, setBookmarks] = React.useState(allBookmarks)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.startsWith('@')) {
      e.preventDefault()
      const newTag = searchTerm.slice(1).trim()
      if (newTag && !tags.includes(newTag)) {
        const updatedTags = [...tags, newTag]
        setTags(updatedTags)
        setSearchTerm('')
        const filteredBookmarks = bookmarks.filter((b: any) => {
          return b.tags.some((tag: any) => updatedTags.includes(tag))
        })

        setBookmarks(filteredBookmarks)
      }
    }
  }

  // TODO: clean this filtering logic up.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    if (!value) {
      const filteredBookmarks = tags.length
        ? allBookmarks.filter((b: any) => {
            return b.tags.some((tag: any) => tags.includes(tag))
          })
        : allBookmarks
      setBookmarks(filteredBookmarks)
    } else if (!value.startsWith('@')) {
      const filteredBookmarks = bookmarks.filter((b: any) => {
        if (tags.length) {
          return (
            b.title.toLowerCase().includes(value.toLowerCase()) ||
            b.url.toLowerCase().includes(value.toLowerCase()) ||
            (b.tags.some((tag: any) => tag.toLowerCase().includes(value.toLowerCase())) &&
              b.tags.some((tag: any) => tags.includes(tag)))
          )
        } else {
          return (
            b.title.toLowerCase().includes(value.toLowerCase()) ||
            b.url.toLowerCase().includes(value.toLowerCase()) ||
            b.tags.some((tag: any) => tag.toLowerCase().includes(value.toLowerCase()))
          )
        }
      })

      setBookmarks(filteredBookmarks)
    }
  }

  const noSearchResults = !bookmarks.length

  return (
    <div>
      <div className="flex items-center relative mb-6">
        <Search className="absolute left-4 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search bookmarks... (Use @ for tags)"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full p-4 pl-12 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <BookmarkList bookmarks={bookmarks} />
      {noSearchResults && (
        <div className="text-base text-gray-500">
          There are no search results. Press enter to add a new bookmark.
        </div>
      )}
    </div>
  )
}
