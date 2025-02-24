'use client'

import * as React from 'react'
import { Search, X } from 'lucide-react'

import { Bookmark, useBookmarkContext } from '@/context/bookmark-context'
import { Badge } from './badge'
import { BookmarkList } from './bookmark-list'

export function BookmarkSearch() {
  const { bookmarks: allBookmarks } = useBookmarkContext()
  const [bookmarks, setBookmarks] = React.useState<Bookmark[]>([])

  React.useEffect(() => {
    setBookmarks(allBookmarks)
  }, [allBookmarks])

  const [searchTerm, setSearchTerm] = React.useState('')
  const [tags, setTags] = React.useState<string[]>([])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.startsWith('@')) {
      e.preventDefault()
      const newTag = searchTerm.slice(1).trim()
      if (newTag && !tags.includes(newTag)) {
        const updatedTags = [...tags, newTag]
        setTags(updatedTags)
        setSearchTerm('')
        const filteredBookmarks = allBookmarks.filter((b: Bookmark) => {
          return b.tags.some((tag: string) => updatedTags.includes(tag))
        })

        setBookmarks(filteredBookmarks)
      }
    } else if (e.key === 'Enter' && e.metaKey) {
      const bookmarkList = document.getElementById('bookmark-list')
      bookmarkList?.querySelector('li')?.querySelector('a')?.click()
    } else if (e.key === 'Backspace' && e.metaKey) {
      // TODO REMOVE bookmark
    }
  }

  console.log({ bookmarks, allBookmarks })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    if (!value) {
      const filteredBookmarks = tags.length
        ? allBookmarks.filter((b: Bookmark) => {
            return b.tags.some((tag: string) => tags.includes(tag))
          })
        : allBookmarks
      setBookmarks(filteredBookmarks)
    } else if (!value.startsWith('@')) {
      if (tags.length) {
        const filteredBookmarks = allBookmarks.filter((b: Bookmark) => {
          // TODO: This is currently filtering on the entire URL.
          // This is sort of confusing so it would probably be better to filter on just domain.
          // e.g., leerob.com insstead of https://leerob.com
          const hasBookmark =
            b.title.toLowerCase().startsWith(value.toLowerCase()) ||
            b.url.toLowerCase().startsWith(value.toLowerCase())
          const hasTag = b.tags.some((t: string) => tags.includes(t.toLowerCase()))

          return hasBookmark && hasTag
        })
        setBookmarks(filteredBookmarks)
      } else {
        const filteredBookmarks = allBookmarks.filter((b: Bookmark) => {
          const hasBookmark =
            b.title.toLowerCase().startsWith(value.toLowerCase()) ||
            b.url.toLowerCase().startsWith(value.toLowerCase()) ||
            b.tags.some((t: string) => t.toLowerCase().includes(value.toLowerCase()))
          return hasBookmark
        })
        setBookmarks(filteredBookmarks)
      }
    }
  }

  const handleRemoveTag = (tag: string) => {
    const updatedTags = tags.filter((t) => {
      return t !== tag
    })
    setTags(updatedTags)

    if (!searchTerm) {
      const filteredBookmarks = updatedTags.length
        ? allBookmarks.filter((b: Bookmark) => {
            return b.tags.some((tag: string) => tags.includes(tag))
          })
        : allBookmarks
      setBookmarks(filteredBookmarks)
    } else if (!searchTerm.startsWith('@')) {
      const filteredBookmarks = bookmarks.filter((b: Bookmark) => {
        if (updatedTags.length) {
          return (
            b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (b.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())) &&
              b.tags.some((tag: string) => updatedTags.includes(tag)))
          )
        } else {
          return (
            b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
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
