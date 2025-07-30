'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

interface IProp {
    className?: string
    href: string
    active?: string
    target?: string
    targetPath?: string
    rel?: string
    children: React.ReactNode
    onClick?: () => void
    isAccordion?: boolean
    isSubAccordion?: boolean
}
export default function NavLink({
    className,
    href,
    active,
    target,
    rel,
    children,
    onClick,
    targetPath,
}: IProp) {
    const pathName = usePathname()

    return (
        <Link
            href={href}
            target={target}
            rel={rel}
            className={cn(
                {
                    active:
                        (active ||
                            (!active && pathName === href) ||
                            (targetPath && pathName.startsWith(targetPath)))

                   
                },
                'nav-links',
                className,
            )}
            onClick={onClick && onClick}
        >
            {children}
           
        </Link>
    )
}
