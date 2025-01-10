import { Pencil, X } from 'lucide-react'

import { useBookmarkContext } from '@/context/bookmark-context'

interface BookmarkListProps {
  bookmarks: any
}

export function BookmarkList({ bookmarks }: BookmarkListProps) {
  const { manage } = useBookmarkContext()

  return (
    <>
      <ul id="bookmark-list" className="space-y-4">
        {bookmarks.map((b: any) => {
          return (
            <li
              className="cursor-pointer rounded-md flex items-center py-2 hover:bg-gray-50"
              key={b.id}
            >
              <a
                key={b.id}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 flex flex-1 items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${b.url}&sz=32`}
                    alt=""
                    className="w-3 h-3"
                  />
                  <span>{b.title}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="space-x-4">
                    <span>[{new URL(b.url).hostname}]</span>
                    <span>Jan 02, 2025</span>
                  </div>
                </div>
              </a>
              {manage && (
                <div className="flex items-center gap-2 pr-4">
                  <button className="rounded-sm border border-gray-500 p-0.5 text-gray-500">
                    <Pencil className="w-3 h-3" />
                  </button>
                  <button className="rounded-sm border border-gray-500 p-0.5 text-gray-500">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </>
  )
}
