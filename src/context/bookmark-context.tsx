'use client'

import * as React from 'react'

interface BookmarkContextType {
  manage: boolean
  setManage: React.Dispatch<React.SetStateAction<boolean>>
}

const BookmarkContext = React.createContext<BookmarkContextType | undefined>(undefined)

interface BookmarkProviderProps {
  children: React.ReactNode
}

export function BookmarkProvider({ children }: BookmarkProviderProps) {
  const [manage, setManage] = React.useState<boolean>(false)

  return (
    <BookmarkContext.Provider value={{ manage, setManage }}>{children}</BookmarkContext.Provider>
  )
}

export function useBookmarkContext() {
  const context = React.useContext(BookmarkContext)
  if (!context) {
    throw new Error(`Cannot use useBookmarkContext outside of BookmarkProvider.`)
  }

  return context
}
