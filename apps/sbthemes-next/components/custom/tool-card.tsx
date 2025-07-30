import React from 'react'
import Link from 'next/link'

import { ITool } from '@/types/product'

export default function ToolCard({ data }: { data: ITool }) {
    const Icon = data?.icon
    return (
        <div className="group relative flex flex-col rounded-xl bg-white px-5 pb-6 pt-[54px] shadow-3xl ring-1 ring-transparent duration-300 hover:ring-secondary/50">
            <div className="absolute inset-0 rounded-xl bg-[url(/images/tool-card-bg.jpg)] bg-cover bg-center bg-no-repeat opacity-[0.07]"></div>
            <div className="absolute -top-8 z-10 rounded-full bg-white p-2 shadow-3xl ring-1 ring-transparent transition duration-300 before:absolute before:-left-0.5 before:-top-0.5 before:h-[33px] before:w-20 before:bg-white group-hover:ring-secondary/50">
                <Link
                    href={`/tools/${data?.slug}`}
                    className="relative grid size-12 place-content-center rounded-full bg-secondary/10"
                >
                    <Icon className="size-6 text-secondary" />
                </Link>
            </div>

            <Link
                href={`/tools/${data?.slug}`}
                className="absolute inset-0 z-20 rounded-xl"
            ></Link>
            <div className="relative z-10">
                <h2 className="relative mb-2.5 inline-block text-lg/[22px] font-semibold text-primary transition group-hover:text-secondary">
                    {data?.title}
                </h2>
                <p className="line-clamp-2 text-sm/[22px]">
                    {data?.description}
                </p>
            </div>
        </div>
    )
}
