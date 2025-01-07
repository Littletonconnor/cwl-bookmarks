import * as React from 'react'

export function useGlobalKeybinding() {
  React.useEffect(() => {
    const keyDownEvent = (ev: KeyboardEvent) => {
      if (ev.key === '/' && ev.target === document.activeElement) {
        ev.preventDefault()
        // In a bigger app we'd want to scope this search better
        // However this is good for our small app.
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement | null
        searchInput?.focus()
      }
    }

    window.addEventListener('keydown', keyDownEvent)

    return () => {
      window.removeEventListener('keydown', keyDownEvent)
    }
  }, [])
}
