import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    CodeXml,
    Headset,
    Infinity,
    SearchCheck,
} from 'lucide-react'

import BlogCard from '@/components/custom/blog-card'
import ClientReviews from '@/components/custom/client-reviews'
import Newsletter from '@/components/custom/newsletter'
import ProductCardSwiper from '@/components/custom/product-card-swiper'
import { ExploreTemplatesButton } from '@/components/custom/scrooll-button'
import TemplateCard from '@/components/custom/template-card'
import IconCheck from '@/components/icons/icon-check'
import IconCheckPlan from '@/components/icons/icon-check-plan'
import IconShape from '@/components/icons/icon-shape'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Button, buttonVariants } from '@/components/ui/button'
import helper from '@/lib/helper'
import { IBlog } from '@/types/blog'
import { IProduct } from '@/types/product'

export const metadata: Metadata = {
    title: 'Build your website with SEO optimized free templates | sbthemes',
    description:
        'Build professional websites faster with our HTML5, React, Next.js, Vue.js, Nuxt, AngularJS and Tailwind CSS templates.',
    openGraph: {
        ...helper.openGraphData,
        title: 'Build your website with SEO optimized free templates | sbthemes',
        description:
            'Build professional websites faster with our HTML5, React, Next.js, Vue.js, Nuxt, AngularJS and Tailwind CSS templates.',
        url: process.env.NEXT_PUBLIC_APP_URL + '/',
        type: 'website',
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_APP_URL}/`,
    },
}

async function getBlogs(filter: any) {
    const orderBy = filter?.orderBy || 'frontShowDate_DESC'

    const page = filter?.page
    const limit = filter?.limit
    const skip = (page - 1) * limit
    const first = limit

    try {
        const headers = {
            'content-type': 'application/json',
        }
        const requestBody = {
            query: `query ($skip: Int, $first: Int, $stage: Stage!, $orderBy: BlogOrderByInput) {
                page: blogsConnection(skip: $skip, first: $first, stage: $stage, orderBy: $orderBy) {
                    edges {
                          node {
                            id
                            slug
                            stage
                            title
                            featureImage
                            createdAt
                            frontShowDate
                            updatedAt
                            metaDescription
                            category {
                              id
                              title
                              slug
                            }
                          }
                        }
                        pageInfo {
                          pageSize
                        }
                        aggregate {
                          count
                        }
                    }
                }
              `,
            variables: {
                skip: Number(skip),
                first: Number(first),
                stage: 'PUBLISHED',
                orderBy: orderBy,
            },
        }
        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(requestBody),
        }
        const res = await fetch(process.env.HYGRAPH_URL as string, {
            ...options,
            cache: 'no-store',
        })
        const response = await res.json()
        return response
    } catch (error) {}
}

export default async function Home() {
    const templates: IProduct[] = helper.getProducts()
    const blogs = await getBlogs({ page: 1, limit: 4 })
    const selectedIds: string[] = ['113', '115', '123', '135']

    return (
        <>
            <div className="relative overflow-hidden">
                <div className="relative flex items-center overflow-hidden border-b border-border bg-gray-100 pb-16 pt-32 sm:pt-44 md:min-h-screen">
                    <div className="absolute right-0 top-0 hidden size-[600px] rounded-full bg-gray opacity-20 blur-[200px] lg:block"></div>
                    <div className="absolute right-1/3 top-0 hidden size-[600px] rounded-full bg-primary opacity-10 blur-[200px] lg:block"></div>
                    <div className="absolute bottom-0 left-0 size-[500px] rounded-full bg-gray-300 opacity-40 blur-[200px]"></div>
                    <div className="absolute bottom-0 left-1/3 size-[500px] rounded-full bg-secondary opacity-15 blur-[200px]"></div>
                    <Image
                        src="/images/hero-section-line.png"
                        width={724}
                        height={400}
                        className="absolute inset-y-0 left-0 z-[1] max-w-[1020px]"
                        alt="Hero Image"
                    />
                    <Image
                        src="/images/hero-section-line2.png"
                        width={724}
                        height={400}
                        className="absolute inset-y-0 bottom-0 right-0 z-[1] mt-auto max-w-[1020px]"
                        alt="Hero Image"
                    />
                    <div className="container relative z-10 flex flex-col lg:flex-row lg:gap-8 xl:gap-20">
                        <div className="relative z-10 mx-auto w-full max-w-5xl space-y-5 text-center sm:space-y-8 lg:space-y-10">
                            <div className="inline-flex flex-col gap-1.5 rounded-2xl opacity-70 sm:flex-row sm:items-center sm:rounded-full sm:bg-white sm:p-1.5 sm:shadow-3xl xl:px-2.5 xl:py-1.5">
                                <div className="flex justify-center sm:justify-start">
                                    <div className="size-7 shrink-0 overflow-hidden rounded-full border-2 border-white bg-border sm:size-8">
                                        <Image
                                            src="/images/profile1.png"
                                            width={34}
                                            height={34}
                                            className="h-full w-full object-cover"
                                            alt="Profile"
                                        />
                                    </div>
                                    <div className="-ml-3 size-7 shrink-0 overflow-hidden rounded-full border-2 border-white bg-border sm:-ml-3.5 sm:size-8">
                                        <Image
                                            src="/images/profile2.png"
                                            width={34}
                                            height={34}
                                            className="h-full w-full object-cover"
                                            alt="Profile"
                                        />
                                    </div>
                                    <div className="-ml-3 size-7 shrink-0 overflow-hidden rounded-full border-2 border-white bg-border sm:-ml-3.5 sm:size-8">
                                        <Image
                                            src="/images/profile3.png"
                                            width={34}
                                            height={34}
                                            className="h-full w-full object-cover"
                                            alt="Profile"
                                        />
                                    </div>
                                    <div className="-ml-3 size-7 shrink-0 overflow-hidden rounded-full border-2 border-white bg-border sm:-ml-3.5 sm:size-8">
                                        <Image
                                            src="/images/profile4.png"
                                            width={34}
                                            height={34}
                                            className="h-full w-full object-cover"
                                            alt="Profile"
                                        />
                                    </div>
                                    <div className="-ml-3.5 grid min-w-[34px] place-content-center overflow-hidden rounded-full border-2 border-white bg-border px-2 py-1 text-xs font-medium text-gray sm:px-3.5 sm:text-sm">
                                        2,000+
                                    </div>
                                </div>
                                <p className="text-xs/5 text-primary/80 lg:pr-2.5 xl:text-sm">
                                    Thousands of developers trust sbthemes.
                                </p>
                            </div>
                            <h1 className="mb-2.5 text-2xl/snug font-bold tracking-tight text-primary sm:text-4xl/snug md:text-5xl/snug xl:text-6xl/snug">
                                Build your website with <br />
                                SEO optimized free templates
                            </h1>
                            <div className="text-sm/[22px] font-medium md:text-base/relaxed lg:text-lg/[35px]">
                                <p>
                                    Build high-quality websites faster with our
                                    premium templates. Crafted using modern
                                    technologies like HTML5, React, Next.js,
                                    Vue.js, Nuxt, AngularJS, and Tailwind CSS.
                                    Perfect for developers, startups, and
                                    businesses seeking performance and style.
                                </p>
                            </div>
                            <ExploreTemplatesButton />
                            <div className="flex flex-wrap justify-center gap-1 sm:gap-2.5">
                                <Link
                                    href="/templates/html5"
                                    className="group relative shrink-0 text-white duration-300 hover:-translate-y-1"
                                >
                                    <IconShape className="size-10 transition-all sm:size-[54px] xl:size-20 [&_path]:stroke-border group-hover:[&_path]:fill-primary/5" />
                                    <Image
                                        src="/images/html.svg"
                                        alt="HTML"
                                        width={48}
                                        height={48}
                                        className="absolute left-1/2 top-1/2 h-auto w-5 shrink-0 -translate-x-1/2 -translate-y-1/2 text-gray sm:w-6 xl:w-8"
                                    />
                                </Link>
                                <Link
                                    href="/templates/nextjs"
                                    className="group relative shrink-0 text-white duration-300 hover:-translate-y-1"
                                >
                                    <IconShape className="size-10 transition-all sm:size-[54px] xl:size-20 [&_path]:stroke-border group-hover:[&_path]:fill-primary/5" />
                                    <Image
                                        src="/images/nextjs.svg"
                                        alt="next"
                                        width={48}
                                        height={48}
                                        className="absolute left-1/2 top-1/2 h-auto w-5 shrink-0 -translate-x-1/2 -translate-y-1/2 text-gray sm:w-6 xl:w-8"
                                    />
                                </Link>
                                <Link
                                    href="/templates/react"
                                    className="group relative shrink-0 text-white duration-300 hover:-translate-y-1"
                                >
                                    <IconShape className="size-10 transition-all sm:size-[54px] xl:size-20 [&_path]:stroke-border group-hover:[&_path]:fill-primary/5" />
                                    <Image
                                        src="/images/react.svg"
                                        alt="react"
                                        width={48}
                                        height={48}
                                        className="absolute left-1/2 top-1/2 h-auto w-5 shrink-0 -translate-x-1/2 -translate-y-1/2 text-gray sm:w-6 xl:w-8"
                                    />
                                </Link>
                                <Link
                                    href="/templates/vuejs"
                                    className="group relative shrink-0 text-white duration-300 hover:-translate-y-1"
                                >
                                    <IconShape className="size-10 transition-all sm:size-[54px] xl:size-20 [&_path]:stroke-border group-hover:[&_path]:fill-primary/5" />
                                    <Image
                                        src="/images/vuejs.svg"
                                        alt="vuejs"
                                        width={48}
                                        height={48}
                                        className="absolute left-1/2 top-1/2 h-auto w-5 shrink-0 -translate-x-1/2 -translate-y-1/2 text-gray sm:w-6 xl:w-8"
                                    />
                                </Link>
                                <Link
                                    href="/templates/nuxt"
                                    className="group relative shrink-0 text-white duration-300 hover:-translate-y-1"
                                >
                                    <IconShape className="size-10 transition-all sm:size-[54px] xl:size-20 [&_path]:stroke-border group-hover:[&_path]:fill-primary/5" />
                                    <Image
                                        src="/images/nuxt.svg"
                                        alt="nuxtjs"
                                        width={48}
                                        height={48}
                                        className="absolute left-1/2 top-1/2 h-auto w-5 shrink-0 -translate-x-1/2 -translate-y-1/2 text-gray sm:w-6 xl:w-8"
                                    />
                                </Link>
                                <Link
                                    href="/templates/angularjs"
                                    className="group relative shrink-0 text-white duration-300 hover:-translate-y-1"
                                >
                                    <IconShape className="size-10 transition-all sm:size-[54px] xl:size-20 [&_path]:stroke-border group-hover:[&_path]:fill-primary/5" />
                                    <Image
                                        src="/images/angular2.svg"
                                        alt="angular"
                                        width={48}
                                        height={48}
                                        className="absolute left-1/2 top-1/2 h-auto w-5 shrink-0 -translate-x-1/2 -translate-y-1/2 text-gray sm:w-6 xl:w-8"
                                    />
                                </Link>
                                <Link
                                    href="/templates/tailwind-css"
                                    className="group relative shrink-0 text-white duration-300 hover:-translate-y-1"
                                >
                                    <IconShape className="size-10 transition-all sm:size-[54px] xl:size-20 [&_path]:stroke-border group-hover:[&_path]:fill-primary/5" />
                                    <Image
                                        src="/images/tailwind.svg"
                                        alt="tailwind"
                                        width={48}
                                        height={48}
                                        className="absolute left-1/2 top-1/2 h-auto w-5 shrink-0 -translate-x-1/2 -translate-y-1/2 text-gray sm:w-6 xl:w-8"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-20 md:px-0">
                    <div className="container">
                        <div className="mb-4 flex flex-wrap items-end gap-5 md:mb-8 lg:flex-nowrap">
                            <div className="space-y-1.5 lg:space-y-2.5">
                                <h2 className="inline-block bg-gradient-to-r from-primary to-gray bg-clip-text text-xl font-semibold tracking-tight text-transparent lg:text-[28px]/9">
                                    Best-Selling Templates
                                </h2>
                                <p className="w-full max-w-xl text-sm font-medium lg:text-base">
                                    Explore our most downloaded templates, known
                                    for their clean design and easy
                                    customization.
                                </p>
                            </div>
                            <div className="ml-auto flex items-center gap-4">
                                <Button
                                    type="button"
                                    asChild
                                    variant={'outline-shadow'}
                                >
                                    <Link href="/templates" className="ml-auto">
                                        View more
                                        <ArrowUpRight className="size-4 shrink-0" />
                                    </Link>
                                </Button>
                                <div className="inset-x-4 z-10 flex justify-center gap-2 sm:justify-end lg:inset-x-12">
                                    <Button
                                        aria-label="Arrow Left"
                                        variant={'outline-shadow'}
                                        type="button"
                                        className="product-detail-prev size-9 !rounded-md !p-0 text-primary transition hover:opacity-80"
                                    >
                                        <ArrowLeft className="size-4 shrink-0" />
                                    </Button>
                                    <Button
                                        aria-label="Arrow Right"
                                        variant={'outline-shadow'}
                                        className="product-detail-next size-9 !rounded-md !p-0 text-primary transition hover:opacity-80"
                                    >
                                        <ArrowRight className="size-4 shrink-0" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <ProductCardSwiper />
                    </div>
                </div>
            </div>

            <div className="relative bg-[url(/images/pricing-bg.jpg)] bg-cover bg-center bg-no-repeat">
                <div className="container">
                    <div className="relative mx-auto w-full max-w-[540px] bg-gradient-to-b from-[#00D1D1]/40 to-transparent px-4 py-14 sm:px-10 sm:py-20">
                        <div className="absolute left-0 right-0 top-0 px-7 pt-5">
                            <Image
                                src="/images/premium-templates-text.svg"
                                alt="Premium Templates"
                                width={540}
                                height={100}
                                className="w-full"
                            />
                        </div>
                        <div className="text-center text-white">
                            <h2 className="text-xl font-semibold tracking-tight lg:text-[28px]/9">
                                Unlock Unlimited Creativity
                            </h2>
                            <p className="mt-2.5 text-sm font-medium lg:text-base">
                                Get full access to all premium website
                                templates, regular updates, priority support,
                                and zero limits — no hidden fees, just pure
                                design freedom.
                            </p>
                        </div>
                        <div className="mt-10 rounded-[20px] bg-white px-4 py-6 sm:p-10">
                            <h3 className="text-4xl font-bold text-primary sm:text-5xl lg:text-6xl">
                                $99
                                <span className="text-sm font-semibold text-gray">
                                    /year
                                </span>
                            </h3>
                            <p className="mt-5 text-sm font-semibold italic sm:text-base/5">
                                Code Fast. Launch Faster. Zero Limits.
                            </p>
                            <div className="my-7 border-t-2 border-dashed border-border pt-7">
                                <div className="text-sm font-bold uppercase">
                                    Features
                                </div>
                                <div className="mt-4 space-y-5 text-sm font-medium text-primary sm:text-base/5">
                                    {helper
                                        .getSubscriptionFeatures()
                                        .map((feature, index) => (
                                            <div
                                                className="flex items-start gap-2"
                                                key={index}
                                            >
                                                <IconCheckPlan className="h-4 w-4 shrink-0 text-secondary" />
                                                <p>{feature}</p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <Button asChild type="button" className="w-full">
                                <Link href="/subscription">
                                    Get Full Access
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative bg-[url(/images/pink-bg.png)] bg-cover bg-center bg-no-repeat py-8 sm:py-12 lg:py-20">
                <Image
                    src="/images/shape.png"
                    width={1920}
                    height={361}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    alt="Hero Image"
                />
                <div className="container">
                    <div className="relative mx-auto mb-8 w-full space-y-1.5 text-center sm:max-w-[485px] lg:space-y-2.5">
                        <h2 className="inline-block bg-gradient-to-r from-primary to-gray bg-clip-text text-xl font-semibold tracking-tight text-transparent lg:text-[28px]/9">
                            Key features of our website templates
                        </h2>
                        <p className="text-sm font-medium lg:px-8 lg:text-base">
                            Discover the key features that make sbthemes website
                            templates stand out from the rest.
                        </p>
                    </div>
                    <div className="relative grid items-start gap-3 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
                        <div className="space-y-5 rounded-xl bg-white p-4">
                            <div className="grid size-[50px] shrink-0 place-content-center rounded-xl bg-gray-100 text-primary">
                                <CodeXml className="size-6 shrink-0" />
                            </div>
                            <div className="space-y-2.5">
                                <h2 className="text-lg/[22px] font-semibold text-primary">
                                    High Quality Code
                                </h2>
                                <p className="text-sm/[22px] font-medium">
                                    Our templates are built with clean,
                                    efficient code to ensure optimal performance
                                    and easy customization.
                                </p>
                            </div>
                        </div>
                        <div className="mt-12 space-y-5 rounded-xl bg-white p-4">
                            <div className="grid size-[50px] shrink-0 place-content-center rounded-xl bg-gray-100 text-primary">
                                <SearchCheck className="size-6 shrink-0" />
                            </div>
                            <div className="space-y-2.5">
                                <h2 className="text-lg/[22px] font-semibold text-primary">
                                    SEO Optimized
                                </h2>
                                <p className="text-sm/[22px] font-medium">
                                    Each template is crafted with SEO best
                                    practices in mind, helping your website rank
                                    higher in search engine results.
                                </p>
                            </div>
                        </div>
                        <div className="space-y-5 rounded-xl bg-white p-4">
                            <div className="grid size-[50px] shrink-0 place-content-center rounded-xl bg-gray-100 text-primary">
                                <Infinity className="size-6 shrink-0" />
                            </div>
                            <div className="space-y-2.5">
                                <h2 className="text-lg/[22px] font-semibold text-primary">
                                    Unlimited Usage
                                </h2>
                                <p className="text-sm/[22px] font-medium">
                                    Purchase once and use the template across
                                    multiple projects with no additional fees or
                                    usage restrictions.
                                </p>
                            </div>
                        </div>
                        <div className="mt-12 space-y-5 rounded-xl bg-white p-4">
                            <div className="grid size-[50px] shrink-0 place-content-center rounded-xl bg-gray-100 text-primary">
                                <Headset className="size-6 shrink-0" />
                            </div>
                            <div className="space-y-2.5">
                                <h2 className="text-lg/[22px] font-semibold text-primary">
                                    Friendly Support
                                </h2>
                                <p className="text-sm/[22px] font-medium">
                                    Whether you need assistance with setup or
                                    customization, we&apos;re here to ensure a
                                    smooth experience with our templates.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-8 sm:py-12 lg:py-20">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-5 lg:flex-nowrap">
                    <div className="space-y-1.5 lg:space-y-2.5">
                        <h2 className="inline-block bg-gradient-to-r from-primary to-gray bg-clip-text text-xl font-semibold tracking-tight text-transparent lg:text-[28px]/9">
                            Most popular templates
                        </h2>
                        <p className="w-full max-w-xl text-sm font-medium lg:text-base">
                            Discover our most popular templates, trusted by
                            thousands for their quality, design, and ease of
                            use.
                        </p>
                    </div>
                    <Button type="button" asChild variant={'outline-shadow'}>
                        <Link href="/templates" className="ml-auto">
                            View more
                            <ArrowUpRight className="size-4 shrink-0" />
                        </Link>
                    </Button>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                    {/* {templates.map((template: IProduct) => (
                        <TemplateCard key={template.id} template={template} />
                    ))} */}
                    {templates
                        .filter((template: IProduct) =>
                            selectedIds.includes(String(template.id)),
                        )
                        .map((template: IProduct) => (
                            <TemplateCard
                                key={template.id}
                                template={template}
                            />
                        ))}
                </div>
            </div>

            <ClientReviews />

            <div className="container py-12 sm:py-16 lg:py-20">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-5 lg:flex-nowrap">
                    <div className="space-y-1.5 lg:space-y-2.5">
                        <h2 className="inline-block bg-gradient-to-r from-primary to-gray bg-clip-text text-xl font-semibold tracking-tight text-transparent lg:text-[28px]/9">
                            Latest blog posts
                        </h2>
                        <p className="w-full max-w-2xl text-sm font-medium lg:text-base">
                            The sbthemes blog, Help your self to read the
                            resource for the latest tips, tricks, and solutions
                            in web design and development.
                        </p>
                    </div>
                    <Button type="button" asChild variant={'outline-shadow'}>
                        <Link href="/blog" className="ml-auto">
                            View more
                            <ArrowUpRight className="size-4 shrink-0" />
                        </Link>
                    </Button>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                    {blogs?.data?.page?.edges?.map(
                        ({ node }: { node: IBlog }) => (
                            <BlogCard key={node.id} blog={node} />
                        ),
                    )}
                </div>
            </div>

            <Newsletter />
            <div className="mx-auto w-full max-w-3xl px-4 pb-10 pt-12 lg:pt-20">
                <div className="mx-auto mb-10 w-full max-w-lg space-y-1.5 text-center lg:space-y-2.5">
                    <h2 className="inline-block bg-gradient-to-r from-primary to-gray bg-clip-text text-xl font-semibold tracking-tight text-transparent lg:text-[26px]/9">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-sm font-medium lg:px-9 lg:text-base">
                        Find all essential information about our products and
                        services here.
                    </p>
                </div>
                <Accordion type="single" collapsible className="space-y-4">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            How will I receive my free or purchased product?
                        </AccordionTrigger>
                        <AccordionContent parentClassName="-top-1 relative">
                            Once you complete the download or purchase process,
                            we’ll send the product directly to your email. No
                            need to sign up or create an account—just check your
                            inbox for the download link.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>
                            What is the difference between the free and paid
                            versions?
                        </AccordionTrigger>
                        <AccordionContent parentClassName="-top-1 relative">
                            The free version includes only basic features and
                            does not come with any support. The paid version,
                            however, offers additional features and includes{' '}
                            <strong>1 year of premium support</strong> to help
                            you with any issues or questions.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>
                            What does support include?
                        </AccordionTrigger>
                        <AccordionContent parentClassName="-top-1 relative">
                            Support includes assistance with product
                            functionalities, usage guidance, and bug fixes.
                            However, please note that premium support does not
                            cover any customizations or feature modifications.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>
                            What is included in the purchased package?
                        </AccordionTrigger>
                        <AccordionContent parentClassName="-top-1 relative">
                            The purchased package includes the full source code,
                            which contains media files, compiled assets, and
                            build configuration files, depending on the
                            technology or framework used. This gives you
                            everything you need to get started with your project
                            immediately.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>
                            What is sbthemes&apos; refund policy?
                        </AccordionTrigger>
                        <AccordionContent parentClassName="-top-1 relative">
                            sbthemes does not offer refunds for digital
                            products. All sales of digital templates and themes
                            are final. Please ensure your selection is accurate
                            before completing your purchase. if you can any
                            pre-sale questions then don&apos;t hesitate to{' '}
                            <Link
                                href="/contact"
                                className="inline-block underline hover:no-underline"
                            >
                                contact us
                            </Link>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                        <AccordionTrigger>
                            How can I cancel my subscription?
                        </AccordionTrigger>
                        <AccordionContent parentClassName="-top-1 relative">
                            You can cancel your subscription at any time. Just
                            head over to our{' '}
                            <Link
                                href="/contact"
                                className="inline-block underline hover:no-underline"
                            >
                                contact
                            </Link>{' '}
                            page to get in touch with us.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                        <AccordionTrigger>
                            I have a question that’s not listed on this page.
                        </AccordionTrigger>
                        <AccordionContent parentClassName="-top-1 relative">
                            Please feel free to contact us, and we will do our
                            best to assist you. Just head over to our{' '}
                            <Link
                                href="/contact"
                                className="inline-block underline hover:no-underline"
                            >
                                contact
                            </Link>{' '}
                            page to get in touch with us.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `{
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "sbthemes",
                        "url": "${process.env.NEXT_PUBLIC_APP_URL}",
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": "  ",
                            "query-input": "required name=search_term_string"
                        },
                        "description": "sbthemes offers a wide range of website templates and themes for various technologies like HTML5, React, Next.js, Vue.js, Nuxt, AngularJS, and Tailwind CSS.",
                        "inLanguage": "en",
                        "publisher":${helper.getOrganizationJsonString()},
                        "mainEntityOfPage": "${process.env.NEXT_PUBLIC_APP_URL}",
                        "image": "${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png"
                    }`,
                }}
                key="product-jsonld1"
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `${helper.getOrganizationJsonString()}`,
                }}
                key="product-jsonld2"
            />
        </>
    )
}
