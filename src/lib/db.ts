import * as React from 'react'

import bookmarks from './bookmarks.json'

const DB_NAME = 'CWL-Bookmarks'

export const db = {
  open(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1)

      request.onerror = (event) => {
        console.log('[Index DB]: Error opening DB')
        reject(event)
      }

      request.onsuccess = (event: Event) => {
        console.log('[Index DB]: Successfully opened connection to DB')
        const openRequest = event.target as IDBOpenDBRequest
        const db = openRequest.result
        resolve(db)
      }

      // Called when the database is created or upgraded
      request.onupgradeneeded = (event: Event) => {
        const openRequest = event.target as IDBOpenDBRequest
        const db = openRequest.result

        if (!db.objectStoreNames.contains('bookmarks')) {
          console.log('[Index DB]: Created new object store `bookmarks`')
          const store = db.createObjectStore('bookmarks', { keyPath: 'id', autoIncrement: true })
          store.createIndex('title', 'title', { unique: false })
          store.createIndex('createdAt', 'createdAt', { unique: false })
        }
      }
    })
  },
  async seed() {
    const db = await this.open()

    return new Promise(() => {
      const transaction = db.transaction('bookmarks', 'readwrite')
      const store = transaction.objectStore('bookmarks')
      const request = store.getAll()

      transaction.oncomplete = () => {
        if (request.result.length > 0) {
          console.log('[Index DB]: bookmarks is already seeded. Skipping.')
          return
        }

        for (const bookmark of bookmarks) {
          store.put(bookmark)
        }
        console.log('[Index DB]: Successfully seeded the `bookmarks` object store.')
      }

      transaction.onerror = () => {
        console.log('[Index DB]: Failed while seeding the `bookmarks` object store.')
      }
    })
  },
  async getAll() {
    const db = await this.open()

    return await new Promise((resolve, reject) => {
      const transaction = db.transaction('bookmarks', 'readwrite')
      const store = transaction.objectStore('bookmarks')
      const request = store.getAll()

      transaction.oncomplete = () => {
        console.log('[Index DB]: fetched all bookmarks')
        resolve(request.result)
      }

      transaction.onerror = () => {
        console.log('[Index DB]: failed fetching all bookmarks')
        reject(request.error)
      }
    })
  },

  async remove(id: string) {
    const db = await this.open()
    const transaction = db.transaction('bookmarks', 'readwrite')
    const store = transaction.objectStore('bookmarks')
    const request = store.delete(id)

    request.onsuccess = () => {
      console.log(`[Index DB]: deleted bookmarks ${id} bookmarks`)
    }

    transaction.onerror = (event) => {
      console.log(`[Index DB]: failed deleting bookmarks ${event}`)
    }
  },
}

export function useDb() {
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      db.seed()
    } else {
      db.open()
    }
  }, [])
}
