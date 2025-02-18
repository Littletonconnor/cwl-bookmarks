'use client'

import * as React from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { Code } from './code'

export function Footer() {
  return (
    <footer className="fixed bottom-0 px-2 py-4 w-full bg-white flex justify-end items-center">
      <KeymapButton />
    </footer>
  )
}

function KeymapButton() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const keyDownEvent = (ev: KeyboardEvent) => {
      if (ev.key === 'k' && ev.metaKey) {
        setOpen(true)
      }
    }

    window.addEventListener('keydown', keyDownEvent)

    return () => {
      window.removeEventListener('keydown', keyDownEvent)
    }
  }, [])

  return (
    <>
      <Dialog.Root open={open} onOpenChange={() => setOpen(!open)}>
        <Dialog.Trigger asChild>
          <button className="text-xs font-medium">Click to see keymaps...</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
            <Dialog.Title className="m-0 text-[17px] font-medium">Keymaps</Dialog.Title>
            <Dialog.Description className="mb-4 mt-2 text-[15px] leading-normal">
              This is a list of all the keymaps used in this app.
            </Dialog.Description>
            <ul className="px-4 text-sm space-y-4 list-disc">
              <li>
                <Code>/</Code> to focus the input.
              </li>
              <li>
                <Code>CMD+k</Code> to focus this dialog.
              </li>
              <li>
                <Code>CMD+enter</Code> when you&apos;re focused on the input and it will
                automatically open the first item in the list.
              </li>
              <li>
                <Code>CMD+backspace</Code> when you&apos;re focused on the input and it will
                automatically delete the first item in the list.
              </li>
            </ul>
            <div className="mt-[25px] flex justify-end">
              <Dialog.Close asChild>
                <button className="inline-flex bg-black text-white items-center justify-center rounded py-2 px-3 font-medium leading-none">
                  Close
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
