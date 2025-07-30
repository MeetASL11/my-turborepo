'use client'
import { useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import path from 'path'

interface Filters {
    [key: string]:
        | string
        | string[]
        | number
        | number[]
        | number[][]
        | undefined
}

const useSearchParamsQuery = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const applyFilters = useCallback(
        (
            filters: Filters,
            options: { scroll: boolean; hardLoad: boolean } = {
                scroll: true,
                hardLoad: false,
            },
        ): void => {
            // const current = new URLSearchParams(Array.from(searchParams.entries()));
            const current = new URLSearchParams(window.location.search)

            // Update as necessary
            Object.entries(filters).forEach(([key, value]) => {
                if (!value) {
                    current.delete(key)
                } else {
                    if (Array.isArray(value)) {
                        // Handle array values
                        current.delete(key)
                        value.forEach((item) => {
                            current.append(key, item.toString())
                        })
                    } else {
                        current.set(key, value as string)
                    }
                }
            })

            const search = current.toString()
            const query = search ? `?${search}` : ''

            if (options.hardLoad) {
                window.location.href = `${pathname}${query}`
            } else {
                router.push(`${pathname}${query}`, options)
            }
        },
        [pathname, router],
    )

    return { applyFilters, searchParams }
}

export default useSearchParamsQuery
