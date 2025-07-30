import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    rows?: number
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, rows = 3, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    'flex min-h-[80px] w-full rounded-xl bg-white px-4 py-3 text-sm/[18px] font-medium text-primary shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)] placeholder:text-gray/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
                    className,
                )}
                rows={rows}
                ref={ref}
                {...props}
            />
        )
    },
)
Textarea.displayName = 'Textarea'

export { Textarea }
