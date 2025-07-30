"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border border-border rounded-xl", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex w-full justify-between outline-none gap-2.5 rounded-t-lg px-4 py-3 text-left text-sm/[18px] font-medium text-primary [&[data-state=open]>svg.arrow]:rotate-180 [&[data-state=open]>svg.arrow]:text-black [&[data-state=open]>svg.minus]:block [&[data-state=open]>svg.plus]:hidden [&[data-state=open]]:border-b [&[data-state=open]]:border-border [&[data-state=open]]:bg-gray-100 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg]:text-primary",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="size-[18px] shrink-0 transition-transform duration-200 text-gray" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName



const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & { parentClassName?: string }
>(({ className, children, parentClassName, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn("overflow-hidden text-sm lg:text-sm font-medium transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down", parentClassName)}
    {...props}
  >
    <div className={cn("px-4 py-3 ", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionContent,AccordionItem, AccordionTrigger }
