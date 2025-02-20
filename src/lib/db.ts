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
  seed() {
    db.open().then((db: IDBDatabase) => {
      return new Promise(() => {
        const transaction = db.transaction('bookmarks', 'readwrite')
        const store = transaction.objectStore('bookmarks')

        for (const bookmark of bookmarks) {
          store.put(bookmark)
        }

        transaction.oncomplete = () => {
          console.log('[Index DB]: Successfully seeded the `bookmarks` object store.')
        }

        transaction.onerror = () => {
          console.log('[Index DB]: Failed while seeding the `bookmarks` object store.')
        }
      })
    })
  },
  getAll() {
    return db.open().then((db: IDBDatabase) => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction('bookmarks', 'readwrite')
        const store = transaction.objectStore('bookmarks')
        const request = store.getAll()

        transaction.oncomplete = () => {
          console.log('[Index DB]: Called getAll')
          resolve(request.result)
        }

        transaction.onerror = () => {
          console.log('[Index DB]: Failed calling getAll')
          reject(request.error)
        }
      })
    })
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
