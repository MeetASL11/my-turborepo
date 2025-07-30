import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

import { IProduct } from '@/types/product'

export default function TemplateCard({
    template: product,
    isFreeTemplate,
}: {
    template: IProduct
    isFreeTemplate?: boolean
}) {
    return (
        <>
            <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-3xl">
                <Link
                    href={`/themes/${product.slug}`}
                    className="group relative block aspect-video shrink-0 overflow-hidden rounded-t-xl border-b border-border"
                >
                    {product.isPopular && (
                        <span className="absolute -right-9 top-3.5 z-10 rotate-45 bg-danger px-10 py-1 text-center text-xs font-semibold text-white">
                            Popular
                        </span>
                    )}
                    {product.isNew && (
                        <span className="absolute -right-[30px] top-3 z-10 rotate-45 bg-success px-10 py-1 text-center text-xs font-semibold text-white">
                            New
                        </span>
                    )}
                    <Image
                        src={
                            product.large_thumb_url
                                ? product.thumb_url.src
                                : '/images/finance-page-design.jpg'
                        }
                        alt={product.name}
                        title={product.name}
                        width={342}
                        height={250}
                        className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-105"
                    />
                </Link>
                <div className="flex grow flex-col p-3 xl:p-4">
                    <div className="mb-5 grow space-y-2">
                        <Link
                            href={`/themes/${product.slug}`}
                            className="line-clamp-2 text-base/6 font-semibold text-primary transition hover:text-secondary"
                        >
                            {product.name}
                        </Link>
                        <p className="line-clamp-3 text-sm/[22px]">
                            {product.short_description}
                        </p>
                    </div>
                    <div className="flex items-center justify-between gap-3 sm:gap-5">
                        <div>
                            <span className="text-lg/[22px] font-bold text-primary">
                                {isFreeTemplate
                                    ? 'Free'
                                    : product.from_price === product.to_price
                                      ? `$${product.to_price}`
                                      : `$${product.from_price} - $${product.to_price}`}
                            </span>
                            {!isFreeTemplate &&
                                product.to_price <
                                    product.to_original_price && (
                                    <span className="ml-1 text-xs/tight font-semibold text-gray/60 line-through">
                                        {product.from_price === product.to_price
                                            ? `$${product.to_original_price}`
                                            : `$${product.from_price} - $${product.to_original_price}`}
                                    </span>
                                )}
                        </div>
                        <Link
                            href={`/themes/${product.slug}`}
                            className="group flex items-center gap-2 text-sm font-semibold text-secondary transition hover:opacity-80"
                        >
                            <span>More details</span>
                            <ArrowRight className="size-4 shrink-0 duration-300 group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
