'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import * as TabsPrimitive from '@radix-ui/react-tabs'

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(
            'bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1',
            className,
        )}
        {...props}
    />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
            'ring-2 ring-transparent data-[state=active]:bg-gray-100 data-[state=active]:text-black flex justify-center whitespace-nowrap rounded-xl px-3 py-2.5 text-base/6 font-medium transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:ring-border hover:bg-gray-100',
            className,
        )}
        {...props}
    />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            'ring-1 ring-border rounded-xl mt-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 p-4',
            className,
        )}
        {...props}
    />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent,TabsList, TabsTrigger }
