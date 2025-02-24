'use client'

import * as React from 'react'

import { useGlobalKeybinding } from '@/hooks/use-global-keybinding'
import { db } from '@/lib/db'

export interface Bookmark {
  id: string
  title: string
  url: string
  tags: string[]
  createdAt: string
}

interface BookmarkContextType {
  bookmarks: Bookmark[]
  deleteBookmark: (id: string) => Promise<void>
  manage: boolean
  setManage: React.Dispatch<React.SetStateAction<boolean>>
}

const BookmarkContext = React.createContext<BookmarkContextType | undefined>(undefined)

interface BookmarkProviderProps {
  children: React.ReactNode
}

export function BookmarkProvider({ children }: BookmarkProviderProps) {
  useGlobalKeybinding()

  const [manage, setManage] = React.useState<boolean>(false)
  const [bookmarks, setBookmarks] = React.useState<Bookmark[]>([])

  React.useEffect(() => {
    async function init() {
      // TODO: Use zod to parse this instead so we have better typings
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setBookmarks(await db.getAll())
    }

    init()
  }, [])

  async function deleteBookmark(id: string) {
    // delete from db
    // call getAll again to sync state

    await db.remove(id)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setBookmarks(await db.getAll())
  }

  const value = React.useMemo(() => {
    return {
      bookmarks,
      deleteBookmark,
      manage,
      setManage,
    }
  }, [bookmarks, manage])

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>
}

export function useBookmarkContext() {
  const context = React.useContext(BookmarkContext)
  if (!context) {
    throw new Error(`Cannot use useBookmarkContext outside of BookmarkProvider.`)
  }

  return context
}
