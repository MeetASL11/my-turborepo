import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'

import { IBlog } from '@/types/blog'

export default function BlogCard({ blog }: { blog: IBlog }) {
    return (
        <div className="flex flex-col rounded-xl bg-white shadow-3xl">
            <Link
                href={`/blog/${blog?.slug}`}
                className="group block shrink-0 overflow-hidden rounded-t-xl border-b border-border"
            >
                {blog?.featureImage && (
                    <Image
                        src={blog?.featureImage}
                        alt="House"
                        width={342}
                        height={250}
                        className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-105"
                    />
                )}
            </Link>

            <div className="flex h-full flex-col justify-between p-4">
                <div>
                    {/* {blog?.frontShowDate && (
                        <p className="mb-2 text-xs/5 font-bold">
                            {format(blog?.frontShowDate, 'LLL dd, yyyy')}
                        </p>
                    )} */}
                    <Link
                        href={`/blog/${blog?.slug}`}
                        className="mb-2.5 inline-block text-lg/[22px] font-semibold text-primary transition hover:text-secondary"
                    >
                        {blog?.title}
                    </Link>
                    <p className="mb-5 line-clamp-2 text-sm/[22px]">
                        {blog?.metaDescription}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {blog?.category?.map((category) => {
                        return (
                            <Link
                                href={`/blog/category/${category?.slug}`}
                                key={category?.id}
                                className="inline-block rounded bg-secondary/10 px-2.5 py-1 text-xs/5 font-bold text-secondary hover:opacity-80"
                            >
                                {category?.title}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
