import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
    ArrowDown,
    ArrowUpRight,
    Check,
    ChevronDown,
    CloudDownload,
    Eye,
    ShoppingBag,
    Star,
} from 'lucide-react'

import GAItemViewEvent from '@/app/(default)/themes/[slug]/_ga-item-view-event'
import CheckoutButton from '@/components/custom/checkout-button'
import ProductSwiper from '@/components/custom/product-swiper'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import helper from '@/lib/helper'
import { cn } from '@/lib/utils'
import { IProduct } from '@/types/product'

export async function generateMetadata({ params }: any) {
    const productDetails: IProduct | null = helper.getProductDetails(
        params.slug,
    )

    if (!productDetails) return {}

    return {
        title: `${productDetails?.name} | sbthemes`,
        description: productDetails?.meta_description?.replace(/<[^>]+>/g, ''),
        openGraph: {
            ...helper.openGraphData,
            title: `${productDetails?.name} | sbthemes`,
            description: productDetails?.meta_description?.replace(
                /<[^>]+>/g,
                '',
            ),
            url:
                process.env.NEXT_PUBLIC_APP_URL +
                '/themes/' +
                productDetails?.slug,
            type: 'website',
            images: [
                {
                    url: productDetails?.thumb_url
                        ? productDetails?.thumb_url.src
                        : `${process.env.NEXT_PUBLIC_APP_URL}/assets/images/logo.png`,
                },
            ],
        },
        twitter: {
            title: `${productDetails?.name} | sbthemes`,
            description: productDetails?.meta_description?.replace(
                /<[^>]+>/g,
                '',
            ),
            images: [
                {
                    url: productDetails?.thumb_url
                        ? productDetails?.thumb_url?.src
                        : `${process.env.NEXT_PUBLIC_APP_URL}/assets/images/logo.png`,
                },
            ],
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_APP_URL}/themes/${productDetails?.slug}`,
            languages: {
                'x-default': `${process.env.NEXT_PUBLIC_APP_URL}/themes/${productDetails?.slug}`,
            },
        },
    }
}

export default function ProductDetails({
    params,
}: {
    params: { slug: string }
}) {
    const productDetails: IProduct | null = helper.getProductDetails(
        params.slug,
    )

    if (!productDetails) notFound()

    return (
        <>
            <GAItemViewEvent item={productDetails} />
            <div className="bg-gray-100 pb-[30px] pt-24 sm:pt-28 lg:pt-36">
                <div className="container flex flex-col lg:flex-row lg:gap-10 xl:gap-14">
                    <div className="grow lg:max-w-[calc(100%-520px)] xl:max-w-[calc(100%-640px)]">
                        <ProductSwiper
                            swiperData={productDetails?.large_thumb_url}
                        />
                        <div
                            className="prose hidden lg:prose-lg lg:block"
                            dangerouslySetInnerHTML={{
                                __html: productDetails?.description || '',
                            }}
                        ></div>
                    </div>
                    <div className="shrink-0 space-y-4 lg:w-[480px] lg:space-y-5 xl:w-[584px]">
                        <h1 className="text-xl font-bold tracking-tight text-primary md:text-2xl xl:text-3xl/9">
                            {productDetails?.name}
                        </h1>
                        <div className="inline-flex gap-2 rounded-xl bg-secondary p-0.5 px-2 text-xs/[15px] font-semibold text-white md:px-3 md:py-1.5">
                            <div className="flex items-center gap-1">
                                <Star className="size-3.5 fill-white text-white" />
                                <span>{productDetails?.reviews?.rating}</span>
                            </div>
                            <span className="relative mt-px block h-auto w-px shrink-0 rounded-full bg-white/30"></span>
                            <p>
                                {helper.getReviewCount(
                                    productDetails?.reviews?.count || 0,
                                )}{' '}
                                Reviews
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-y-1.5 text-primary sm:gap-1.5 sm:gap-y-2.5">
                            {productDetails?.tech_stack_array.map(
                                (tech: string, index: number) => (
                                    <Link
                                        href={helper.getTechLink(tech)}
                                        key={index}
                                        className="relative mx-2.5 block rounded-xl border border-border md:mx-3"
                                    >
                                        <span className="absolute -left-2 top-1/2 block size-[30px] -translate-y-1/2 rotate-[50deg] skew-x-[14deg] rounded-xl border-b border-l border-border bg-white md:-left-[9px] md:size-8 md:skew-x-[10deg]"></span>
                                        <span className="absolute -right-2 top-1/2 block size-[30px] -translate-y-1/2 rotate-[50deg] skew-x-[14deg] rounded-xl border-r border-t border-border bg-white md:-right-[9px] md:size-8 md:skew-x-[10deg]"></span>
                                        <div className="relative z-10 flex items-center gap-1.5 rounded-xl bg-white px-1 py-[11px]">
                                            <Image
                                                src={helper.getTechLogo(tech)}
                                                alt={`${tech} logo`}
                                                title={`${tech} logo`}
                                                width={18}
                                                height={18}
                                                className="size-3 shrink-0 md:size-[18px]"
                                            />
                                            <p className="text-xs font-medium md:text-sm/[18px]">
                                                {tech}
                                            </p>
                                        </div>
                                    </Link>
                                ),
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            {productDetails?.preview_links?.length === 1 ? (
                                <Button
                                    type="button"
                                    className="w-full"
                                    variant={'outline-general'}
                                    size={'large'}
                                    asChild
                                >
                                    <Link
                                        href={
                                            productDetails?.preview_links?.[0]
                                                ?.link || ''
                                        }
                                        target="_blank"
                                        className="justify-between"
                                    >
                                        <div className="flex items-center gap-1.5">
                                            <Eye className="relative size-[18px] shrink-0" />
                                            Live preview
                                        </div>
                                        <ArrowUpRight className="size-4 shrink-0" />
                                    </Link>
                                </Button>
                            ) : (
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button
                                            type="button"
                                            className="w-full"
                                            variant={'outline-general'}
                                            size={'large'}
                                            asChild
                                        >
                                            <div className="justify-between">
                                                <div className="flex items-center gap-1.5">
                                                    <Eye className="relative size-[18px] shrink-0" />
                                                    Live preview
                                                </div>
                                                <ChevronDown className="size-[18px] shrink-0" />
                                            </div>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] divide-y divide-border">
                                        {productDetails?.preview_links?.map(
                                            (link: any, index: number) => (
                                                <DropdownMenuItem
                                                    key={index}
                                                    className="p-0 font-semibold text-black"
                                                >
                                                    <Link
                                                        href={link?.link || ''}
                                                        target="_blank"
                                                        className="flex grow items-center justify-between gap-2 px-3 py-4"
                                                    >
                                                        <div className="flex items-center gap-1.5">
                                                            <Image
                                                                src={helper.getTechLogo(
                                                                    link?.label,
                                                                )}
                                                                alt="HTML"
                                                                width={18}
                                                                height={18}
                                                                className="size-3 shrink-0 md:size-[18px]"
                                                            />
                                                            {link?.label}
                                                        </div>
                                                        <ArrowUpRight className="size-4 shrink-0" />
                                                    </Link>
                                                </DropdownMenuItem>
                                            ),
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}

                            {!!productDetails?.plans?.free && (
                                <CheckoutButton
                                    item={{
                                        variantId:
                                            productDetails?.plans?.free
                                                ?.variant_id || 0,
                                        price:
                                            productDetails?.plans?.free
                                                ?.price || 0,
                                        title: productDetails?.name,
                                        slug: productDetails?.slug,
                                    }}
                                    className="w-full"
                                    variant={'outline-general'}
                                    size={'large'}
                                >
                                    <CloudDownload className="relative size-[18px] shrink-0" />
                                    Get free now
                                </CheckoutButton>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <CheckoutButton
                                item={{
                                    variantId:
                                        productDetails?.plans?.pro
                                            ?.variant_id || 0,
                                    price:
                                        productDetails?.plans?.pro?.price || 0,
                                    title: productDetails?.name,
                                    slug: productDetails?.slug,
                                }}
                                size={'large'}
                            >
                                <ShoppingBag className="relative size-[18px] shrink-0" />
                                Buy ${productDetails?.plans?.pro?.price} USD
                                {/* Line-through price */}
                                <span className="absolute right-4 rounded-lg bg-gray-200 px-1.5 text-xs text-black line-through">
                                    $
                                    {productDetails?.plans?.pro?.original_price}
                                </span>
                            </CheckoutButton>
                            <Button
                                asChild
                                type="button"
                                className="border-secondary/40 bg-secondary/80 text-white"
                                variant="outline-general"
                                size="large"
                            >
                                <Link
                                    href={`/subscription`}
                                    className="flex items-center"
                                >
                                    <span>All Templates – Just $99</span>
                                </Link>
                            </Button>
                        </div>
                        <div
                            className="prose lg:prose-lg lg:hidden"
                            dangerouslySetInnerHTML={{
                                __html: productDetails?.description || '',
                            }}
                        ></div>
                        <div
                            className={cn(
                                'grid divide-border overflow-hidden rounded-xl bg-white shadow-3xl sm:divide-x',
                                Object.keys(productDetails?.plans).length === 1
                                    ? ''
                                    : 'sm:grid-cols-2',
                            )}
                        >
                            {!!productDetails?.plans?.free && (
                                <div>
                                    <h3 className="rounded-t-xl border-b border-t border-border bg-gray-100 px-4 py-3 font-medium text-primary sm:rounded-none sm:border-t-0">
                                        Free version
                                    </h3>
                                    <div className="space-y-3 px-4 py-3">
                                        {productDetails?.plans?.free?.description.map(
                                            (
                                                description: string,
                                                index: number,
                                            ) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-1.5"
                                                >
                                                    <Check className="size-[18px] shrink-0 text-secondary" />
                                                    <p className="text-sm/[18px] font-medium">
                                                        {description}
                                                    </p>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}
                            {!!productDetails?.plans?.pro && (
                                <div>
                                    <div className="flex items-center justify-between gap-3 border-b border-border bg-gray-100 px-4 py-3">
                                        <h3 className="font-medium text-primary">
                                            Pro version
                                        </h3>
                                        <p className="inline-flex items-end gap-1 font-bold text-secondary">
                                            {/* Line-through price */}
                                            <span className="text-xs font-medium text-gray/70 line-through">
                                                ($
                                                {
                                                    productDetails?.plans?.pro
                                                        ?.original_price
                                                }
                                                )
                                            </span>
                                            {/* <small className='text-gray'><del>${productDetails?.plans?.pro?.original_price}</del></small> */}
                                            ${productDetails?.plans?.pro?.price}
                                        </p>
                                    </div>
                                    <div className="space-y-3 px-4 py-3">
                                        {productDetails?.plans?.pro?.description.map(
                                            (
                                                description: string,
                                                index: number,
                                            ) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-1.5"
                                                >
                                                    <Check className="size-[18px] shrink-0 text-secondary" />
                                                    <p className="text-sm/[18px] font-medium">
                                                        {description}
                                                    </p>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="overflow-hidden rounded-xl bg-white shadow-3xl">
                            <h3 className="border-b border-border bg-gray-100 px-4 py-3 font-medium text-primary">
                                Product details
                            </h3>
                            <ul className="space-y-2.5 px-4 py-3 font-medium marker:text-primary">
                                {/* <li>
                                    <div className="flex flex-col gap-1 sm:flex-row sm:gap-2.5">
                                        <h4 className="min-w-32 text-primary">
                                            Version
                                        </h4>
                                        <p className="text-sm/[18px] font-medium">
                                            1.1.0
                                        </p>
                                    </div>
                                </li> */}
                                <li>
                                    <div className="flex flex-col gap-1 sm:flex-row sm:gap-2.5">
                                        <h4 className="min-w-32 text-primary">
                                            Compatible with
                                        </h4>
                                        <p className="text-sm/[18px] font-medium">
                                            {productDetails?.tech_stack_array.join(
                                                ', ',
                                            )}
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/* <div className="overflow-hidden rounded-xl bg-white shadow-3xl">
                            <h3 className="border-b border-border bg-gray-100 px-4 py-3 font-medium text-primary">
                                Item Tag
                            </h3>
                            <div className="flex flex-wrap gap-2.5 px-4 py-3">
                                {productDetails?.tags_array.map(
                                    (tag: string, index: number) => (
                                        <div
                                            key={index}
                                            className="rounded-xl px-4 py-2.5 text-sm/[18px] font-medium ring-1 ring-border"
                                        >
                                            #{tag}
                                        </div>
                                    ),
                                )}
                            </div>
                        </div> */}
                        <div className="overflow-hidden rounded-xl bg-white shadow-3xl">
                            <h3 className="border-b border-border bg-gray-100 px-4 py-3 font-medium text-primary">
                                Support
                            </h3>
                            <div className="px-4 py-3">
                                <p className="text-sm/[22px]">
                                    If you have any questions about this
                                    template or need tech support&nbsp;{' '}
                                    <Link
                                        href="/contact"
                                        className="font-medium text-primary underline transition hover:no-underline"
                                    >
                                        please reach out to our team
                                    </Link>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `{
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "${productDetails?.name}",
                        "url": "${process.env.NEXT_PUBLIC_APP_URL}/themes/${params.slug}",
                        "description": "${productDetails?.meta_description}",
                        "inLanguage": "en",
                        "breadcrumb": {
                            "@type": "BreadcrumbList",
                            "itemListElement": [{
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "${process.env.NEXT_PUBLIC_APP_URL}"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Templates",
                                "item": "${process.env.NEXT_PUBLIC_APP_URL}/themes"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "${productDetails?.name}",
                                "item": "${process.env.NEXT_PUBLIC_APP_URL}/themes/${params.slug}"
                            }]
                        }
                    }`,
                }}
                key="product-jsonld8"
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `{
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": "${productDetails?.name}",
                        "image": "${process.env.NEXT_PUBLIC_APP_URL}${productDetails?.thumb_url?.src}",
                        "description": "${productDetails?.meta_description}",
                        "url": "${process.env.NEXT_PUBLIC_APP_URL}/themes/${productDetails?.slug}",
                        "brand": {
                            "@type": "Brand",
                            "name": "sbthemes"
                        },
                        "offers": {
                            "@type": "AggregateOffer",
                            "offerCount": "2",
                            "lowPrice": "${productDetails?.plans?.free?.price || 0}",
                            "highPrice": "${productDetails?.plans?.pro?.price}",
                            "priceCurrency": "USD",
                            "offers": [
                                {
                                    "@type": "Offer",
                                    "url": "${process.env.NEXT_PUBLIC_APP_URL}/themes/${productDetails?.slug}",
                                    "price": "${productDetails?.plans?.free?.price}",
                                    "priceCurrency": "USD",
                                    "availability": "https://schema.org/InStock",
                                    "itemCondition": "https://schema.org/NewCondition"
                                },
                                {
                                    "@type": "Offer",
                                    "url": "${process.env.NEXT_PUBLIC_APP_URL}/themes/${productDetails?.slug}",
                                    "price": "${productDetails?.plans?.pro?.price}",
                                    "priceCurrency": "USD",
                                    "availability": "https://schema.org/InStock",
                                    "itemCondition": "https://schema.org/NewCondition"
                                }
                            ]
                        },
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "${productDetails?.reviews?.rating}",
                            "reviewCount": "${productDetails?.reviews?.count}"
                        },
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": "${process.env.NEXT_PUBLIC_APP_URL}/themes/${productDetails?.slug}"
                        }
                    }`,
                }}
                key="product-jsonld9"
            />
        </>
    )
}
