import React from 'react'
import { ListFilter } from 'lucide-react'

import Filter from '@/components/custom/filter'
import TemplateCard from '@/components/custom/template-card'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { IProduct } from '@/types/product'

interface FilteredTemplateListProps {
    templates: IProduct[]
    isFreeTemplate?: boolean
    hideTechFilter?: boolean
}

export default function FilteredTemplateList({
    templates,
    isFreeTemplate = false,
    hideTechFilter = false,
}: FilteredTemplateListProps) {
    return (
        <div className="container flex flex-col items-start gap-5 py-12 lg:flex-row lg:gap-8 lg:py-14">
            <Filter
                className="hidden lg:block"
                hideTechFilter={hideTechFilter}
            />
            <div className="block w-full text-right lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button type="button" variant={'outline-shadow'}>
                            <ListFilter className="size-4" />
                            Filter
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="[&_.close>svg]:size-4">
                        <Filter hideTechFilter={hideTechFilter} />
                    </SheetContent>
                </Sheet>
            </div>
            <div className="grid w-full gap-5 sm:grid-cols-2 md:gap-6 lg:mt-[38px] xl:grid-cols-3">
                {templates.length > 0 ? (
                    templates.map((template) => (
                        <TemplateCard
                            key={template.id}
                            template={template}
                            isFreeTemplate={isFreeTemplate}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center lg:text-left">
                        <p className="text-gray-500 text-lg font-semibold">
                            No templates found for the selected filters.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
