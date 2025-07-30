'use client'
import React, { useState } from 'react'

import ToolCard from '@/components/custom/tool-card'
import ToolSearcher from '@/components/tools/tool-searcher'
import helper from '@/lib/helper'

export default function ToolsDetails() {
    const [search, setSearch] = useState('')

    const filteredTools = !!search?.trim()
        ? helper.toolData?.filter(
              (item) =>
                  item?.title.toLowerCase().includes(search) ||
                  helper.categories.find((category) =>
                      category.label.toLowerCase().includes(search),
                  )?.value === item?.category,
          )
        : helper.toolData

    return (
        <div className="">
            <div className="relative bg-gradient-to-r from-[#CACEFF]/10 to-gray-300/10 px-4 pb-10 pt-28 text-center sm:pt-32 lg:pb-[50px] lg:pt-40">
                <div className="mx-auto w-full max-w-[812px] px-4">
                    <h1 className="mb-2.5 text-[26px]/[30px] font-bold -tracking-wide text-primary md:text-[40px]/[50px]">
                        Powerful Online Tools
                    </h1>
                    <p className="font-medium leading-7 lg:leading-[30px]">
                        Discover a powerful collection of tools designed to
                        enhance your content creation, boost productivity, and
                        optimize your website&apos;s performance. From text
                        formatting to SEO, find everything you need in one place
                        to elevate your digital presence.
                    </p>
                    <ToolSearcher search={search} onSearch={setSearch} />
                </div>
            </div>
            <div className="container space-y-12 py-12 lg:space-y-20 lg:py-16">
                {helper.categories.map((category, key: number) => {
                    const categoryTools = filteredTools?.filter(
                        (item) => item?.category === category?.value,
                    )

                    if (categoryTools.length > 0) {
                        return (
                            <div key={key}>
                                <h2 className="mb-5 inline-block border-b border-black/50 text-center text-[22px]/7 font-semibold tracking-tight text-black lg:text-[28px]/9">
                                    {category.label}
                                </h2>
                                <p className="mb-16">{category.description}</p>
                                <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 md:gap-x-7 md:gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
                                    {categoryTools.map((item: any) => (
                                        <ToolCard key={item?.id} data={item} />
                                    ))}
                                </div>
                            </div>
                        )
                    }
                    return null
                })}
                {filteredTools?.length === 0 && (
                    <p className="text-gray-500 mx-auto w-full max-w-sm rounded-xl px-10 py-16 text-center text-xl font-semibold shadow-3xl">
                        No tools found
                    </p>
                )}
            </div>
        </div>
    )
}
