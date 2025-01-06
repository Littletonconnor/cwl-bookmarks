'use server'

import { readFile } from 'node:fs/promises'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// TODO: Add some schema validation here so the return type is better
export async function fetchBookmarks() {
  const jsonFilePath = path.join(__dirname, 'bookmarks.json')
  const data = await readFile(jsonFilePath, 'utf-8')

  return JSON.parse(data)
}
