'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import * as SliderPrimitive from '@radix-ui/react-slider'

const Slider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
    <SliderPrimitive.Root
        ref={ref}
        className={cn(
            'relative flex w-full touch-none select-none items-center',
            className,
            props.disabled && ' opacity-50',
        )}
        {...props}
    >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-border">
            <SliderPrimitive.Range className="absolute h-full bg-secondary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="bg-background block size-5 cursor-pointer rounded-full border-2 border-primary bg-primary transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
