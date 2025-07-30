'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import useSearchParamsQuery from '@/hooks/useSearchParamsQuery'
import helper from '@/lib/helper'
import { cn } from '@/lib/utils'

export default function Filter({
    className,
    hideTechFilter,
}: {
    className?: string
    hideTechFilter?: boolean
}) {
    const searchParams = useSearchParams()
    const { applyFilters } = useSearchParamsQuery()

    const [selectedTechnologies, setSelectedTechnologies] = useState(
        searchParams.get('technologies')?.split(',') || [],
    )

    const [selectedCategories, setSelectedCategories] = useState(
        (searchParams.get('category')?.split(',') || []).map((d: any) =>
            Number(d),
        ),
    )

    return (
        <div
            className={cn(
                'relative w-[300px] shrink-0 px-4 py-10 lg:bg-transparent lg:p-0',
                className,
            )}
        >
            <div className="mb-4 flex items-end justify-between gap-2">
                <h2 className="sticky top-0 rounded-t-xl text-xl font-semibold text-black lg:static">
                    Filter
                </h2>
                {(selectedTechnologies.length > 0 ||
                    selectedCategories.length > 0) && (
                    <button
                        type="button"
                        className="text-sm font-medium text-danger transition hover:text-black"
                        onClick={() => {
                            applyFilters({ technologies: '', category: '' })
                            setSelectedTechnologies([])
                            setSelectedCategories([])
                        }}
                    >
                        Clear
                    </button>
                )}
            </div>
            <Accordion
                defaultValue={['item-1', 'item-2']}
                type="multiple"
                className="space-y-5"
            >
                {!hideTechFilter && (
                    <AccordionItem defaultChecked={true} value="item-1">
                        <AccordionTrigger>Compatible with</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-3">
                            {helper.technologies.map((t, i: number) => (
                                <label
                                    key={i}
                                    className="flex items-center gap-2"
                                >
                                    <Checkbox
                                        value={t.value}
                                        checked={selectedTechnologies.includes(
                                            t.value,
                                        )}
                                        onCheckedChange={() => {
                                            if (
                                                selectedTechnologies.includes(
                                                    t.value,
                                                )
                                            ) {
                                                applyFilters({
                                                    technologies:
                                                        selectedTechnologies
                                                            .filter(
                                                                (d: any) =>
                                                                    d !==
                                                                    t.value,
                                                            )
                                                            .join(','),
                                                })
                                                setSelectedTechnologies(
                                                    (old: any) =>
                                                        old.filter(
                                                            (d: any) =>
                                                                d !== t.value,
                                                        ),
                                                )
                                            } else {
                                                applyFilters({
                                                    technologies: [
                                                        ...selectedTechnologies,
                                                        t.value,
                                                    ].join(','),
                                                })
                                                setSelectedTechnologies(
                                                    (old: any) => [
                                                        ...old,
                                                        t.value,
                                                    ],
                                                )
                                            }
                                        }}
                                    />
                                    <div className="text-sm font-medium text-black">
                                        {t.label}
                                    </div>
                                </label>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                )}

                <AccordionItem value="item-2">
                    <AccordionTrigger>Categories</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3">
                        {helper.category
                            .sort((a, b) => (a.label < b.label ? -1 : 1))
                            .map((c, i: number) => (
                                <label
                                    key={i}
                                    className="flex items-center gap-2"
                                >
                                    <Checkbox
                                        value={c.value}
                                        checked={selectedCategories.includes(
                                            c.value,
                                        )}
                                        onCheckedChange={() => {
                                            if (
                                                selectedCategories.includes(
                                                    c.value,
                                                )
                                            ) {
                                                applyFilters({
                                                    category: selectedCategories
                                                        .filter(
                                                            (d: any) =>
                                                                d !== c.value,
                                                        )
                                                        .join(','),
                                                })
                                                setSelectedCategories(
                                                    (old: any) =>
                                                        old.filter(
                                                            (d: any) =>
                                                                d !== c.value,
                                                        ),
                                                )
                                            } else {
                                                applyFilters({
                                                    category: [
                                                        ...selectedCategories,
                                                        c.value,
                                                    ].join(','),
                                                })
                                                setSelectedCategories(
                                                    (old: any) => [
                                                        ...old,
                                                        c.value,
                                                    ],
                                                )
                                            }
                                        }}
                                    />
                                    <div className="text-sm font-medium text-black">
                                        {c.label}
                                    </div>
                                </label>
                            ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
