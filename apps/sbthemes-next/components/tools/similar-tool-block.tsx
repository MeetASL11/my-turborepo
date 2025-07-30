import React from 'react'

import ToolCard from '@/components/custom/tool-card'
import helper from '@/lib/helper'
import { ITool } from '@/types/product'

const SimilarToolBlock = ({
    category = null,
}: {
    category?: null | string
}) => {
    let similarToolData: ITool[] = []

    if (!!category) {
        const categoryId = helper.getToolObjectFromSlug(category)?.category
        if (!categoryId) {
            similarToolData = []
        }

        similarToolData =
            helper.toolData
                ?.filter(
                    (tool) =>
                        tool.category === categoryId &&
                        tool.slug.toLowerCase() !== category.toLowerCase(),
                )
                ?.slice(0, 8) || []
    }

    return (
        !!similarToolData.length && (
            <div className="container mt-10">
                <h2 className="mb-12 inline-block border-b border-black/50 text-center text-[22px]/7 font-semibold tracking-tight text-black md:mb-16 lg:text-[28px]/9">
                    Similar Tools
                </h2>
                <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 md:gap-x-7 md:gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
                    {similarToolData?.map((tool: ITool) => (
                        <ToolCard data={tool} key={tool.id} />
                    ))}
                </div>
            </div>
        )
    )
}

export default SimilarToolBlock
