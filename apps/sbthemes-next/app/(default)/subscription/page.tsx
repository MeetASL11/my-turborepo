import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Check, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import CheckoutButton from '@/components/custom/checkout-button'
import ProductSwiper from '@/components/custom/product-swiper'
import { Button } from '@/components/ui/button'
import helper from '@/lib/helper'
import { cn } from '@/lib/utils'
import { productsData } from '@/products-json/products'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
const SubscriptionDescription = ({ className }: { className?: string }) => {
    return (
        <div className={cn('prose lg:prose-lg', className)}>
            <h2>Unlock the Power of Premium Templates</h2>
            <p>
                All our themes are meticulously crafted with clean,
                well-structured code that’s ready to use and easy to customize.
                Built with the latest technologies like Next.js, Tailwind CSS,
                and Shadcn/ui, our themes empower developers and agencies to
                build modern, high-performing websites effortlessly.
            </p>
            <p>
                We prioritize keeping our themes up to date — regularly
                upgrading frameworks and dependencies so you always have access
                to the latest features, security patches, and performance
                improvements. This commitment ensures your projects stay
                future-proof and maintain cutting-edge standards.
            </p>
            <p>
                Below is the full list of premium themes included in your
                subscription, each designed to cater to different styles and
                needs — all available to you with one simple $99/year plan.
            </p>
            <h2>Premium Templates Included:</h2>
            <ul>
                {productsData.map((product) => (
                    <li key={product.id}>
                        <Link href={`/themes/${product.slug}`} target="_blank">
                            {product.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <p>
                All our themes are built with Tailwind CSS — a modern
                utility-first framework that makes development fast, clean, and
                efficient. Tailwind helps you build responsive, customizable
                websites without writing bulky CSS, keeping your codebase
                consistent, scalable, and performance-optimized.
            </p>
            <p>
                Our themes are optimized for speed, performance, and SEO out of
                the box. With clean code, fast load times, and built-in tools
                like sitemaps, robots.txt, meta tags, and schema markup, your
                website is ready to rank, share, and scale from day one.
            </p>
            <p>
                With one simple subscription, you gain full access to our
                complete theme library — plus all future releases and updates.
                Experience hassle-free development with clean code, expert
                support, and cutting-edge technology. Subscribe now and
                transform your workflow today.
            </p>
        </div>
    )
}

export async function generateMetadata({ params }: any) {
    return {
        title: `Unlock Every Template for Just $99 | sbthemes`,
        description: `Unlock every professional template for one low yearly price. Fast, SEO-ready, dev-friendly templates built with Tailwind CSS, Next.js & more.`,
        openGraph: {
            ...helper.openGraphData,
            title: `Unlock Every Template for Just $99 | sbthemes`,
            description: `Unlock every professional template for one low yearly price. Fast, SEO-ready, dev-friendly templates built with Tailwind CSS, Next.js & more.`,
            url: process.env.NEXT_PUBLIC_APP_URL + '/subscription',
            type: 'website',
            images: [
                {
                    url: `${process.env.NEXT_PUBLIC_APP_URL}/images/subscription-thumbnail.jpg`,
                },
            ],
        },
        twitter: {
            title: `Unlock Every Template for Just $99 | sbthemes`,
            description: `Unlock every professional template for one low yearly price. Fast, SEO-ready, dev-friendly templates built with Tailwind CSS, Next.js & more.`,
            images: [
                {
                    url: `${process.env.NEXT_PUBLIC_APP_URL}/images/subscription-thumbnail.jpg`,
                },
            ],
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_APP_URL}/subscription`,
            languages: {
                'x-default': `${process.env.NEXT_PUBLIC_APP_URL}/subscription`,
            },
        },
    }
}

const Subscription = () => {
    const galleryImages: { src: string; alt: string; href?: string }[] = [
        {
            src: '/images/subscription-thumbnail.jpg',
            alt: 'Subscription thumbnail',
        },
    ]

    for (const product of productsData) {
        galleryImages.push({
            ...product.large_thumb_url[0],
            href: `/themes/${product.slug}`,
        })
    }

    const technologies = [
        'Next.js',
        'Tailwind CSS',
        'React',
        'Figma',
        'HTML5',
        'Vue.js',
        'AngularJS',
        'Nuxt',
    ]
    return (
        <>
            <div className="bg-gray-100 pb-[30px] pt-24 sm:pt-28 lg:pt-36">
                <div className="container flex flex-col lg:flex-row lg:gap-10 xl:gap-14">
                    <div className="grow lg:max-w-[calc(100%-520px)] xl:max-w-[calc(100%-640px)]">
                        <ProductSwiper swiperData={galleryImages} />
                        <SubscriptionDescription className="hidden lg:block" />
                    </div>
                    <div className="shrink-0 space-y-4 lg:w-[480px] lg:space-y-5 xl:w-[584px]">
                        <h1 className="text-xl font-bold tracking-tight text-primary md:text-2xl xl:text-3xl/9">
                            Unlock Every Template for Just $99
                        </h1>
                        <div className="inline-flex gap-2 rounded-xl bg-secondary p-0.5 px-2 text-xs/[15px] font-semibold text-white md:px-3 md:py-1.5">
                            <div className="flex items-center gap-1">
                                <Star className="size-3.5 fill-white text-white" />
                                <span>4.8</span>
                            </div>
                            <span className="relative mt-px block h-auto w-px shrink-0 rounded-full bg-white/30"></span>
                            <p>2536 Reviews</p>
                        </div>
                        <div className="flex flex-wrap gap-y-1.5 text-primary sm:gap-1.5 sm:gap-y-2.5">
                            {technologies.map((tech: string, index: number) => (
                                <Link
                                    key={index}
                                    href={helper.getTechLink(tech)}
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
                            ))}
                        </div>
                        <CheckoutButton
                            item={{
                                variantId: 820529,
                                price: 99,
                                title: 'Unlock Every Template for Just',
                                slug: 'subscription',
                            }}
                            size={'large'}
                        >
                            Get All Templates Now — Only $99<sub>/ year</sub>
                        </CheckoutButton>
                        <div className="divide-border overflow-hidden rounded-xl bg-white shadow-3xl sm:divide-x">
                            <div>
                                <h3 className="rounded-t-xl border-b border-t border-border bg-gray-100 px-4 py-3 font-medium text-primary sm:rounded-none sm:border-t-0">
                                    Features
                                </h3>
                                <div className="space-y-3 px-4 py-3">
                                    {helper
                                        .getSubscriptionFeatures()
                                        .map((feature, index) => (
                                            <div
                                                className="flex items-center gap-1.5"
                                                key={index}
                                            >
                                                <Check className="size-[18px] shrink-0 text-secondary" />
                                                <p className="text-sm/[18px] font-medium">
                                                    {feature}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <SubscriptionDescription className="block lg:hidden" />
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
        </>
    )
}

export default Subscription
