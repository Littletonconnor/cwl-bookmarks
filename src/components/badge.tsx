import * as React from 'react'

import { cn } from '@/lib/utils'

interface BadgeProps {
  children?: React.ReactNode
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  className?: string
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        className,
        'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variant === 'default' &&
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        variant === 'secondary' &&
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        variant === 'destructive' &&
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        variant === 'outline' && 'text-foreground',
      )}
      {...props}
    />
  )
}
