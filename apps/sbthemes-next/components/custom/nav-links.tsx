import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'
import NavLink from '@/components/ui/nav-link'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

export default function NavLinks({ onClick }: { onClick?: () => void }) {
    const pathName = usePathname()
    const [isOpen, setIsOpen] = useState('')
    const [isOpenTemplate, setIsOpenTemplate] = useState(false)
    const componentsOptions = [
        { link: '#', label: 'Heading' },
        { link: '#', label: 'Data Display' },
        { link: '#', label: 'Lists' },
        { link: '#', label: 'Forms' },
        { link: '#', label: 'Navigation' },
        { link: '#', label: 'Elements' },
        { link: '#', label: 'Layout' },
        { link: '#', label: 'Page Examples' },
    ]

    const onSelectTemplate = () => {
        setIsOpenTemplate(false)
    }

    return (
        <div className="flex h-screen w-80 flex-col overflow-y-auto bg-white p-4 pt-0 font-medium text-primary duration-300 lg:static lg:-mr-0.5 lg:h-auto lg:w-auto lg:flex-row lg:items-center lg:gap-7 lg:divide-y-0 lg:overflow-y-visible lg:bg-transparent lg:p-0.5">
            <div className="sticky top-0 z-10 -mx-4 flex border-b border-border bg-white px-4 py-5 shadow-sm lg:hidden">
                <Link
                    href="/"
                    className="shrink-0 transition hover:opacity-80 lg:hidden"
                    onClick={onClick}
                >
                    <Image
                        src="/images/logo.svg"
                        width={64}
                        height={64}
                        className="h-auto w-24"
                        alt="sbthemes logo"
                    />
                </Link>
            </div>
            <div className="flex grow flex-col divide-y divide-border lg:hidden">
                {/* <div className="lg:hidden">
                    <button
                        className="flex w-full items-center justify-between gap-1.5 py-3.5 text-gray outline-none transition hover:text-primary"
                        onClick={() =>
                            setIsOpen((pre) =>
                                pre === 'components' ? '' : 'components',
                            )
                        }
                    >
                        Components
                        <ChevronDown className="size-[18px] shrink-0 duration-300 lg:ml-auto" />
                    </button>
                    <div
                        className={cn(
                            'ml-3 h-0 divide-y divide-border overflow-hidden transition-all duration-300',
                            isOpen === 'components' &&
                                'h-full border-t border-border',
                        )}
                    >
                        {componentsOptions?.map((item, index) => {
                            return (
                                <NavLink
                                    key={index}
                                    href={item.link}
                                    // active={item.link === pathName?"active":""}
                                    className="block w-full py-2.5 text-sm"
                                >
                                    {item.label}
                                </NavLink>
                            )
                        })}
                    </div>
                </div> */}
                <NavLink
                    href="/free-templates"
                    className="flex items-center justify-between gap-1.5 py-3.5 text-gray outline-none transition hover:text-primary"
                    onClick={onClick}
                >
                    Free templates
                </NavLink>

                <div className="lg:hidden">
                    <button
                        className="flex w-full items-center justify-between gap-1.5 py-3.5 text-gray outline-none transition hover:text-primary"
                        onClick={() =>
                            setIsOpen((pre) =>
                                pre === 'templates' ? '' : 'templates',
                            )
                        }
                    >
                        Templates
                        <ChevronDown className="size-[18px] shrink-0 duration-300 lg:ml-auto" />
                    </button>

                    <div
                        className={cn(
                            'ml-3 h-0 divide-y divide-border overflow-hidden text-sm transition-all duration-300',
                            isOpen === 'templates' &&
                                'h-full border-t border-border',
                        )}
                    >
                        <div className="relative flex gap-3 rounded-none px-1 py-3 transition hover:bg-gray-100">
                            <Link
                                href="/templates/nextjs"
                                className="absolute inset-0"
                            />
                            <div className="grid size-10 shrink-0 place-content-center rounded-xl bg-black/5 text-primary">
                                <Image
                                    src="/images/nextjs.svg"
                                    width={24}
                                    height={24}
                                    className="size-6"
                                    alt="Next.js logo"
                                />
                            </div>
                            <div className="space-y-1.5 text-sm/[18px]">
                                <p className="font-semibold text-primary">
                                    Next.js templates
                                </p>
                                <p className="text-gray">
                                    Best Next.js templates
                                </p>
                            </div>
                        </div>
                        <div className="relative flex gap-3 rounded-none px-1 py-3 transition hover:bg-gray-100">
                            <Link
                                href="/templates/react"
                                className="absolute inset-0"
                            />
                            <div className="grid size-10 shrink-0 place-content-center rounded-xl bg-[#61dafb]/10 text-primary">
                                <Image
                                    src="/images/react.svg"
                                    width={18}
                                    height={18}
                                    className="size-6"
                                    alt="React logo"
                                />
                            </div>
                            <div className="space-y-1.5 text-sm/[18px]">
                                <p className="font-semibold text-primary">
                                    React templates
                                </p>
                                <p className="text-gray">
                                    Best React templates
                                </p>
                            </div>
                        </div>
                        <div className="relative flex gap-3 rounded-none px-1 py-3 transition hover:bg-gray-100">
                            <Link
                                href="/templates/html5"
                                className="absolute inset-0"
                            />
                            <div className="grid size-10 shrink-0 place-content-center rounded-xl bg-[#e34f26]/10 text-primary">
                                <Image
                                    src="/images/html2.svg"
                                    width={24}
                                    height={24}
                                    className="size-6"
                                    alt="HTML5 logo"
                                />
                            </div>
                            <div className="space-y-1.5 text-sm/[18px]">
                                <p className="font-semibold text-primary">
                                    HTML5 templates
                                </p>
                                <p className="text-gray">
                                    Best HTML5 templates
                                </p>
                            </div>
                        </div>
                        <div className="relative flex gap-3 rounded-none px-1 py-3 transition hover:bg-gray-100">
                            <Link
                                href="/templates/tailwind-css"
                                className="absolute inset-0"
                            />
                            <div className="grid size-10 shrink-0 place-content-center rounded-xl bg-[#06b6d4]/10 text-primary">
                                <Image
                                    src="/images/tailwind.svg"
                                    width={24}
                                    height={24}
                                    className="size-6"
                                    alt="Tailwind CSS logo"
                                />
                            </div>
                            <div className="space-y-1.5 text-sm/[18px]">
                                <p className="font-semibold text-primary">
                                    Tailwind CSS templates
                                </p>
                                <p className="text-gray">
                                    Best Tailwind CSS templates
                                </p>
                            </div>
                        </div>
                        <div className="relative flex gap-3 rounded-none px-1 py-3 transition hover:bg-gray-100">
                            <Link
                                href="/templates/vuejs"
                                className="absolute inset-0"
                            />
                            <div className="grid size-10 shrink-0 place-content-center rounded-xl bg-[#4dba87]/10 text-primary">
                                <Image
                                    src="/images/vuejs.svg"
                                    width={24}
                                    height={24}
                                    className="size-6"
                                    alt="Vue.js logo"
                                />
                            </div>

                            <div className="space-y-1.5 text-sm/[18px]">
                                <p className="font-semibold text-primary">
                                    Vue.js templates
                                </p>
                                <p className="text-gray">
                                    Best Vue.js templates
                                </p>
                            </div>
                        </div>
                        <div className="relative flex gap-3 rounded-none px-1 py-3 transition hover:bg-gray-100">
                            <Link
                                href="/templates/nuxt"
                                className="absolute inset-0"
                            />
                            <div className="grid size-10 shrink-0 place-content-center rounded-xl bg-[#00c492]/10 text-primary">
                                <Image
                                    src="/images/nuxt.svg"
                                    width={24}
                                    height={24}
                                    className="size-6"
                                    alt="Nuxt logo"
                                />
                            </div>
                            <div className="space-y-1.5 text-sm/[18px]">
                                <p className="font-semibold text-primary">
                                    Nuxt templates
                                </p>
                                <p className="text-gray">Best Nuxt templates</p>
                            </div>
                        </div>
                        <div className="relative flex gap-3 rounded-none px-1 py-3 transition hover:bg-gray-100">
                            <Link
                                href="/templates/angularjs"
                                className="absolute inset-0"
                            />
                            <div className="grid size-10 shrink-0 place-content-center rounded-xl bg-[#E23237]/10 text-primary">
                                <Image
                                    src="/images/angular2.svg"
                                    width={24}
                                    height={24}
                                    className="size-6"
                                    alt="AngularJs logo"
                                />
                            </div>
                            <div className="space-y-1.5 text-sm/[18px]">
                                <p className="font-semibold text-primary">
                                    AngularJs templates
                                </p>
                                <p className="text-gray">
                                    Best AngularJs templates
                                </p>
                            </div>
                        </div>
                        <div className="relative flex gap-3 rounded-none px-1 py-3 transition hover:bg-gray-100">
                            <Link
                                href="/templates"
                                className="absolute inset-0"
                            />
                            <div className="grid size-10 shrink-0 place-content-center rounded-xl bg-primary/10 text-primary">
                                <Image
                                    src="/images/all-templates.svg"
                                    width={24}
                                    height={24}
                                    className="size-6"
                                    alt="AngularJs logo"
                                />
                            </div>
                            <div className="space-y-1.5 text-sm/[18px]">
                                <p className="font-semibold text-primary">
                                    All templates
                                </p>
                                <p className="text-gray">Premium templates</p>
                            </div>
                        </div>
                    </div>
                </div>

                <NavLink
                    href="/tools"
                    className="flex items-center justify-between gap-1.5 py-3.5 text-gray outline-none transition hover:text-primary"
                    onClick={onClick}
                >
                    Tools
                </NavLink>

                <NavLink
                    href="/subscription"
                    className="flex items-center justify-between gap-1.5 py-3.5 text-gray outline-none transition hover:text-primary"
                    onClick={onClick}
                >
                    All Templates – Just $99
                    <span className="text-lg">🔥</span>
                </NavLink>
            </div>
            <div className="hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1.5 py-2 text-gray outline-none transition hover:text-primary data-[state=open]:text-primary [&[data-state=open]>svg]:-rotate-180">
                        Components
                        <ChevronDown className="size-[18px] shrink-0 duration-300 lg:ml-auto" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="h-[300px] w-[184px] overflow-auto lg:h-auto">
                        <DropdownMenuLabel className="sticky top-0 z-40">
                            Components
                        </DropdownMenuLabel>
                        <DropdownMenuItem className="p-0">
                            <NavLink
                                href="/templates/nextjs"
                                className="block w-full p-3"
                            >
                                Heading
                            </NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-0">
                            <NavLink
                                href="/templates/nextjs"
                                className="block w-full p-3"
                            >
                                Data Display
                            </NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-0">
                            <NavLink
                                href="/templates/nextjs"
                                className="block w-full p-3"
                            >
                                Lists
                            </NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-0">
                            <NavLink
                                href="/templates/nextjs"
                                className="block w-full p-3"
                            >
                                Forms
                            </NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-0">
                            <NavLink
                                href="/templates/nextjs"
                                className="block w-full p-3"
                            >
                                Navigation
                            </NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-0">
                            <NavLink
                                href="/templates/nextjs"
                                className="block w-full p-3"
                            >
                                Elements
                            </NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-0">
                            <NavLink
                                href="/templates/nextjs"
                                className="block w-full p-3"
                            >
                                Layout
                            </NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-0">
                            <NavLink
                                href="/templates/nextjs"
                                className="block w-full p-3"
                            >
                                Page Examples
                            </NavLink>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <NavLink
                href="/free-templates"
                className="hidden items-center justify-between gap-1.5 py-3.5 text-gray outline-none transition hover:text-primary lg:flex"
            >
                Free templates
            </NavLink>

            <div className="hidden lg:block">
                <NavigationMenu delayDuration={0}>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                Templates
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="min-w-[684px] bg-white">
                                <div className="border-b border-border p-3 text-base/5 font-medium text-primary">
                                    Templates
                                </div>
                                <div className="grid divide-border lg:grid-cols-2 lg:divide-x">
                                    <div>
                                        <div className="relative flex items-center gap-2.5 rounded-none p-2.5 hover:bg-gray-100 lg:p-4">
                                            <Link
                                                href="/templates/nextjs"
                                                className="absolute inset-0"
                                                onClick={onSelectTemplate}
                                            />
                                            <div className="grid size-11 shrink-0 place-content-center rounded-xl bg-black/5 text-primary">
                                                <Image
                                                    src="/images/nextjs.svg"
                                                    width={28}
                                                    height={28}
                                                    className="size-7"
                                                    alt="Next.js logo"
                                                />
                                            </div>
                                            <span className="hidden size-1 shrink-0 rounded-full bg-primary/20 sm:block"></span>
                                            <div className="space-y-1.5 text-sm/[18px]">
                                                <p className="font-semibold text-primary">
                                                    Next.js templates
                                                </p>
                                                <p className="text-gray">
                                                    Best Next.js templates
                                                </p>
                                            </div>
                                        </div>
                                        <div className="relative flex items-center gap-2.5 rounded-none p-2.5 hover:bg-gray-100 lg:p-4">
                                            <Link
                                                href="/templates/react"
                                                className="absolute inset-0"
                                                onClick={onSelectTemplate}
                                            />
                                            <div className="grid size-11 shrink-0 place-content-center rounded-xl bg-[#61dafb]/10 text-primary">
                                                <Image
                                                    src="/images/react.svg"
                                                    width={18}
                                                    height={18}
                                                    className="size-7"
                                                    alt="React logo"
                                                />
                                            </div>
                                            <span className="hidden size-1 shrink-0 rounded-full bg-primary/20 sm:block"></span>
                                            <div className="space-y-1.5 text-sm/[18px]">
                                                <p className="font-semibold text-primary">
                                                    React templates
                                                </p>
                                                <p className="text-gray">
                                                    Best React templates
                                                </p>
                                            </div>
                                        </div>
                                        <div className="relative flex items-center gap-2.5 rounded-none p-2.5 hover:bg-gray-100 lg:p-4">
                                            <Link
                                                href="/templates/html5"
                                                className="absolute inset-0"
                                                onClick={onSelectTemplate}
                                            />
                                            <div className="grid size-11 shrink-0 place-content-center rounded-xl bg-[#e34f26]/10 text-primary">
                                                <Image
                                                    src="/images/html2.svg"
                                                    width={28}
                                                    height={28}
                                                    className="size-7"
                                                    alt="HTML5 logo"
                                                />
                                            </div>
                                            <span className="hidden size-1 shrink-0 rounded-full bg-primary/20 sm:block"></span>
                                            <div className="space-y-1.5 text-sm/[18px]">
                                                <p className="font-semibold text-primary">
                                                    HTML5 templates
                                                </p>
                                                <p className="text-gray">
                                                    Best HTML5 templates
                                                </p>
                                            </div>
                                        </div>
                                        <div className="relative flex items-center gap-2.5 rounded-none p-2.5 hover:bg-gray-100 lg:p-4">
                                            <Link
                                                href="/templates/tailwind-css"
                                                className="absolute inset-0"
                                                onClick={onSelectTemplate}
                                            />
                                            <div className="grid size-11 shrink-0 place-content-center rounded-xl bg-[#06b6d4]/10 text-primary">
                                                <Image
                                                    src="/images/tailwind.svg"
                                                    width={28}
                                                    height={28}
                                                    className="size-7"
                                                    alt="Tailwind CSS logo"
                                                />
                                            </div>
                                            <span className="hidden size-1 shrink-0 rounded-full bg-primary/20 sm:block"></span>
                                            <div className="space-y-1.5 text-sm/[18px]">
                                                <p className="font-semibold text-primary">
                                                    Tailwind CSS templates
                                                </p>
                                                <p className="text-gray">
                                                    Best Tailwind CSS templates
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="relative flex items-center gap-2.5 rounded-none p-2.5 hover:bg-gray-100 lg:p-4">
                                            <Link
                                                href="/templates/vuejs"
                                                className="absolute inset-0"
                                                onClick={onSelectTemplate}
                                            />
                                            <div className="grid size-11 shrink-0 place-content-center rounded-xl bg-[#4dba87]/10 text-primary">
                                                <Image
                                                    src="/images/vuejs.svg"
                                                    width={28}
                                                    height={28}
                                                    className="size-7"
                                                    alt="Vue.js logo"
                                                />
                                            </div>
                                            <span className="hidden size-1 shrink-0 rounded-full bg-primary/20 sm:block"></span>
                                            <div className="space-y-1.5 text-sm/[18px]">
                                                <p className="font-semibold text-primary">
                                                    Vue.js templates
                                                </p>
                                                <p className="text-gray">
                                                    Best Vue.js templates
                                                </p>
                                            </div>
                                        </div>
                                        <div className="relative flex items-center gap-2.5 rounded-none p-2.5 hover:bg-gray-100 lg:p-4">
                                            <Link
                                                href="/templates/nuxt"
                                                className="absolute inset-0"
                                                onClick={onSelectTemplate}
                                            />
                                            <div className="grid size-11 shrink-0 place-content-center rounded-xl bg-[#00c492]/10 text-primary">
                                                <Image
                                                    src="/images/nuxt.svg"
                                                    width={28}
                                                    height={28}
                                                    className="size-7"
                                                    alt="Nuxt logo"
                                                />
                                            </div>
                                            <span className="hidden size-1 shrink-0 rounded-full bg-primary/20 sm:block"></span>
                                            <div className="space-y-1.5 text-sm/[18px]">
                                                <p className="font-semibold text-primary">
                                                    Nuxt templates
                                                </p>
                                                <p className="text-gray">
                                                    Best Nuxt templates
                                                </p>
                                            </div>
                                        </div>
                                        <div className="relative flex items-center gap-2.5 rounded-none p-2.5 hover:bg-gray-100 lg:p-4">
                                            <Link
                                                href="/templates/angularjs"
                                                className="absolute inset-0"
                                                onClick={onSelectTemplate}
                                            />
                                            <div className="grid size-11 shrink-0 place-content-center rounded-xl bg-[#E23237]/10 text-primary">
                                                <Image
                                                    src="/images/angular2.svg"
                                                    width={28}
                                                    height={28}
                                                    className="size-7"
                                                    alt="AngularJs logo"
                                                />
                                            </div>
                                            <span className="hidden size-1 shrink-0 rounded-full bg-primary/20 sm:block"></span>
                                            <div className="space-y-1.5 text-sm/[18px]">
                                                <p className="font-semibold text-primary">
                                                    AngularJs templates
                                                </p>
                                                <p className="text-gray">
                                                    Best AngularJs templates
                                                </p>
                                            </div>
                                        </div>
                                        <div className="relative flex items-center gap-2.5 rounded-none p-2.5 hover:bg-gray-100 lg:p-4">
                                            <Link
                                                href="/templates"
                                                className="absolute inset-0"
                                                onClick={onSelectTemplate}
                                            />
                                            <div className="grid size-11 shrink-0 place-content-center rounded-xl bg-primary/10 text-primary">
                                                <Image
                                                    src="/images/all-templates.svg"
                                                    width={28}
                                                    height={28}
                                                    className="size-7"
                                                    alt="AngularJs logo"
                                                />
                                            </div>
                                            <span className="hidden size-1 shrink-0 rounded-full bg-primary/20 sm:block"></span>
                                            <div className="space-y-1.5 text-sm/[18px]">
                                                <p className="font-semibold text-primary">
                                                    View all templates
                                                </p>
                                                <p className="text-gray">
                                                    Premium templates
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            <NavLink
                href="/tools"
                className="hidden items-center justify-between gap-1.5 py-3.5 text-gray outline-none transition hover:text-primary lg:flex"
                onClick={onClick}
            >
                Tools
            </NavLink>

            <NavLink href="/subscription" className="hidden lg:block">
                <Button type="button">
                    All Templates – Just $99
                    <span className="">🔥</span>
                </Button>
            </NavLink>
        </div>
    )
}
