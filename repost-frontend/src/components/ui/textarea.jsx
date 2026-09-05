import * as React from 'react'
import { cn } from '@/lib/utils'

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[100px] w-full rounded-input border border-gray-200 bg-white px-4 py-3 text-sm font-sans text-repost-text ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-repost-blue/30 focus-visible:border-repost-blue disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none',
        className
      )}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }
