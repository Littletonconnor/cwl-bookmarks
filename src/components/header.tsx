'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { useBookmarkContext } from '@/context/bookmark-context'

export function Header() {
  const { manage, setManage } = useBookmarkContext()

  return (
    <header className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <span className="text-gray-400">
          <ArrowRight className="w-4 h-4" />
        </span>
        <h1 className="text-lg uppercase">
          <Link href="/">Bookmarks</Link>
        </h1>
      </div>
      <button
        className="cursor-pointer uppercase text-gray-500 hover:text-gray-700"
        onClick={() => setManage(!manage)}
      >
        Manage
      </button>
    </header>
  )
}
