'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'

import NavLinks from '@/components/custom/nav-links'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

export default function Header() {
    const pathName = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(false)
    }, [pathName])

    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={cn(
                'sticky z-50 duration-500',
                scrolled ? 'top-0 bg-white shadow-3xl' : 'top-4 lg:top-5',
            )}
        >
            <div className="container">
                <div
                    className={cn(
                        'flex items-center justify-between gap-2 bg-white p-3 sm:px-4 lg:py-3',
                        scrolled
                            ? ''
                            : 'rounded-xl border border-border shadow-[0_1px_6px_0_rgba(0,0,0,0.05)] lg:rounded-2xl lg:py-3',
                    )}
                >
                    <div className="flex items-center gap-1.5 sm:gap-5 lg:gap-[30px]">
                        <Link href="/" className="transition hover:opacity-80">
                            <Image
                                src="/images/logo.svg"
                                width={132}
                                height={36}
                                className="h-full w-24 lg:w-[132px]"
                                alt="Logo"
                            />
                        </Link>
                        <Link
                            href="/themes/nexadash"
                            className="flex items-center gap-1 rounded-full border border-border bg-gradient-to-r from-gray-300/10 to-[#CACEFF]/10 px-2 py-1 text-sm font-medium transition hover:from-gray-300/5 hover:to-[#CACEFF]/5 sm:px-3 sm:py-2 lg:gap-2.5"
                        >
                            <Image
                                src="/images/square.svg"
                                width={12}
                                height={12}
                                className="size-2 lg:size-3"
                                alt="Square"
                            />
                            <span className="shrink-0 text-[10px] text-primary sm:text-sm">
                                Introducing NexaDash
                            </span>
                            <span className="hidden size-1 rounded-full bg-primary 2xl:inline-block"></span>
                            <span className="hidden text-gray 2xl:inline-block">
                                Next.js admin dashboard with flexible UI
                                components
                            </span>
                        </Link>
                    </div>

                    <div className="grid place-content-center lg:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <button
                                    type="button"
                                    className="text-black hover:opacity-70 lg:hidden"
                                >
                                    <Menu className="size-6" />
                                    <span className="sr-only">Open menu</span>
                                </button>
                            </SheetTrigger>
                            <SheetContent className="w-auto" side={'left'}>
                                <NavLinks onClick={() => setIsOpen(false)} />
                            </SheetContent>
                        </Sheet>
                    </div>
                    <div className="hidden lg:block">
                        <NavLinks />
                    </div>
                </div>
            </div>
        </header>
    )
}
