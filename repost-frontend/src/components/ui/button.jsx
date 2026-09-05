import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-button text-sm font-heading font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-repost-blue text-white hover:bg-repost-blue/90',
        destructive: 'bg-repost-red text-white hover:bg-repost-red/90',
        outline: 'border border-gray-200 bg-white hover:bg-gray-50 text-repost-text',
        secondary: 'bg-repost-button-inactive text-repost-text hover:bg-gray-200',
        ghost: 'hover:bg-repost-button-inactive text-repost-text',
        link: 'text-repost-blue underline-offset-4 hover:underline',
        green: 'bg-repost-green text-white hover:bg-repost-green/90',
      },
      size: {
        default: 'h-12 px-6 py-2',
        sm: 'h-9 rounded-button px-4',
        lg: 'h-14 rounded-button px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
