'use client'
import React from 'react'

import IconArrowDown from '@/components/icons/icon-arrow-down'
import useSearchParamsQuery from '@/hooks/useSearchParamsQuery'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'

interface PaginationProps {
    totalPages: number
    currentPage: number
    dataLength: number
    alignClass?: string
    perPage?: number
    isShowLimit?: boolean
    routerOptions?: any
}

const Pagination: React.FC<PaginationProps> = ({
    totalPages,
    currentPage,
    dataLength,
    alignClass,
    perPage,
    isShowLimit = false,
    routerOptions,
}) => {
    const { applyFilters, searchParams } = useSearchParamsQuery()

    const renderPageButtons = () => {
        const pageButtons = []

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageButtons.push(
                    <li key={i}>
                        <Button
                            variant={'outline-shadow'}
                            type="button"
                            className={`  grid size-9 place-content-center bg-transparent  transition hover:font-medium  lg:size-11 ${
                                currentPage === i
                                    ? '!bg-primary font-semibold !text-white'
                                    : 'bg-transparent'
                            }`}
                            onClick={() =>
                                applyFilters({ page: i }, routerOptions)
                            }
                        >
                            {i}
                        </Button>
                    </li>,
                )
            }
        } else {
            let startPage
            if (currentPage <= 3) {
                startPage = 1
            } else if (currentPage >= totalPages - 2) {
                startPage = totalPages - 4
            } else {
                startPage = currentPage - 2
            }

            for (let i = startPage; i <= startPage + 4; i++) {
                pageButtons.push(
                    <li key={i}>
                        <Button
                            variant={'outline-shadow'}
                            type="button"
                            className={`grid size-9 place-content-center bg-transparent  transition hover:font-medium  lg:size-11 ${
                                currentPage === i
                                    ? '!bg-primary font-semibold !text-white'
                                    : 'bg-transparent'
                            }`}
                            onClick={() =>
                                applyFilters({ page: i }, routerOptions)
                            }
                        >
                            {i}
                        </Button>
                    </li>,
                )
            }

            if (startPage !== 1) {
                pageButtons.unshift(
                    <li key="ellipsis-first">
                        <Button
                            variant={'outline-shadow'}
                            type="button"
                            className={`pointer-events-none grid size-9 place-content-center lg:size-11`}
                        >
                            {`...`}
                        </Button>
                    </li>,
                )
            }

            if (startPage + 4 !== totalPages) {
                pageButtons.push(
                    <li key="ellipsis-last">
                        <Button
                            variant={'outline-shadow'}
                            type="button"
                            className={`pointer-events-none grid size-9 place-content-center lg:size-11`}
                        >
                            {`...`}
                        </Button>
                    </li>,
                )
            }
        }

        return pageButtons
    }

    return (
        <div
            className={cn(
                'my-12 flex flex-wrap items-center gap-4 sm:my-20',
                alignClass || 'justify-end',
            )}
        >
            {isShowLimit && !!dataLength && (
                <div>
                    <select
                        className="form-select ring-grey-300 hover:ring-grey-500 h-12 rounded-full bg-transparent pr-7 text-sm !ring-1 focus:!ring-2 focus:ring-black"
                        value={perPage || 10}
                        onChange={(e) =>
                            applyFilters(
                                { limit: e.target.value, page: 1 },
                                routerOptions,
                            )
                        }
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                    </select>
                </div>
            )}
            {!!dataLength && (
                <div className="flex items-center gap-7 text-black">
                    <ul className="flex items-center justify-between gap-2 sm:gap-3">
                        <li>
                            <Button
                                variant={'outline-shadow'}
                                type="button"
                                className={`${
                                    currentPage === 1
                                        ? 'pointer-events-none opacity-50'
                                        : ''
                                } grid size-9 place-content-center text-black transition hover:bg-primary  lg:size-11`}
                                onClick={() =>
                                    applyFilters(
                                        {
                                            page:
                                                Number(
                                                    searchParams.get('page') ||
                                                        1,
                                                ) - 1,
                                        },
                                        routerOptions,
                                    )
                                }
                                aria-label="previous page"
                            >
                                {/* {t('previous')} */}
                                <IconArrowDown className="w-[11px] rotate-90" />
                            </Button>
                        </li>
                        {renderPageButtons()}
                        <li>
                            <Button
                                variant={'outline-shadow'}
                                type="button"
                                className={`${
                                    currentPage === totalPages
                                        ? 'pointer-events-none opacity-50'
                                        : ''
                                } grid size-9 place-content-center text-black transition hover:bg-primary  lg:size-11`}
                                onClick={() =>
                                    applyFilters(
                                        {
                                            page:
                                                Number(
                                                    searchParams.get('page') ||
                                                        1,
                                                ) + 1,
                                        },
                                        routerOptions,
                                    )
                                }
                                aria-label="next page"
                            >
                                {/* {t('next')} */}
                                <IconArrowDown className="w-[11px] -rotate-90" />
                            </Button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Pagination
