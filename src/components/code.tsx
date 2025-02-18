import { cn } from '@/lib/utils'

export function Code({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span {...props} className={cn(className, 'bg-gray-200 text-red-700 rounded-md p-1')}>
      {children}
    </span>
  )
}
