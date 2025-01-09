'use client'

import * as React from 'react'
import { Search, X } from 'lucide-react'

import { Badge } from './badge'
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
    // 2) Press 'Backspace' + Shift if search input is empty -> Remove the last tag
    // TODO: https://chatgpt.com/c/677fd55e-4f9c-800d-83d2-651eddd889a8
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

  const handleRemoveTag = (tag: string) => {
    const updatedTags = tags.filter((t) => {
      return t !== tag
    })
    setTags(updatedTags)

    if (!searchTerm) {
      const filteredBookmarks = updatedTags.length
        ? allBookmarks.filter((b: any) => {
            return b.tags.some((tag: any) => tags.includes(tag))
          })
        : allBookmarks
      setBookmarks(filteredBookmarks)
    } else if (!searchTerm.startsWith('@')) {
      const filteredBookmarks = bookmarks.filter((b: any) => {
        if (updatedTags.length) {
          return (
            b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (b.tags.some((tag: any) => tag.toLowerCase().includes(searchTerm.toLowerCase())) &&
              b.tags.some((tag: any) => updatedTags.includes(tag)))
          )
        } else {
          return (
            b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.tags.some((tag: any) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
          )
        }
      })
      setBookmarks(filteredBookmarks)
    }
  }

  const noSearchResults = !bookmarks.length

  return (
    <div>
      <div className="space-y-2 mb-6">
        <div className="flex items-center relative">
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
        <div className="space-x-1">
          {tags.map((tag) => {
            return (
              <button key={tag} className="cursor-pointer" onClick={() => handleRemoveTag(tag)}>
                <Badge variant="outline">
                  {tag}
                  <X className="w-3 h-3" />
                  <span className="sr-only">Remote {tag} tag</span>
                </Badge>
              </button>
            )
          })}
        </div>
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
