import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import ButtonLoader from '@/components/ui/button-loader'
import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'

const buttonVariants = cva(
    'inline-flex relative items-center shrink-0 justify-center border text-sm font-semibold gap-1.5 text-white duration-300 rounded-xl whitespace-nowrap focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-primary',
    {
        variants: {
            variant: {
                default:
                    'bg-primary border-primary hover:bg-white hover:bg-transparent hover:text-primary',
                'outline-general':
                    'bg-transparent border-primary hover:bg-primary hover:text-white text-primary',
                'outline-shadow':
                    'bg-transparent border-transparent hover:bg-primary hover:text-white text-primary shadow-3xl',
            },
            size: {
                default: 'px-4 py-2.5',
                large: 'p-3.5',
                small: 'px-2.5 py-[7px]',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    children?: React.ReactNode
    loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            loading,
            asChild = false,
            children,
            ...props
        },
        ref,
    ) => {
        const Comp = asChild ? Slot : 'button'
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={loading}
                {...props}
            >
                {loading ? (
                    <>
                        <ButtonLoader message="" />
                        <div className={cn(loading && 'invisible')}>
                            {children}
                        </div>
                    </>
                ) : (
                    children
                )}
            </Comp>
        )
    },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
