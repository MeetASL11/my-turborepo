import React from 'react'
import { Metadata } from 'next'

import BlogCard from '@/components/custom/blog-card'
import Newsletter from '@/components/custom/newsletter'
import Pagination from '@/components/custom/pagination'
import helper from '@/lib/helper'
import { IBlog } from '@/types/blog'

export const metadata: Metadata = {
    title: 'Blogs',
    description:
        'Explore the sbthemes blog for the latest trends, tips, and updates on web design and development. Get insights on our templates and industry news.',
    openGraph: {
        ...helper.openGraphData,
        title: 'Blogs',
        description:
            'Explore the sbthemes blog for the latest trends, tips, and updates on web design and development. Get insights on our templates and industry news.',
        url: process.env.NEXT_PUBLIC_APP_URL + '/blog',
        type: 'website',
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_APP_URL}/blog`,
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

export default async function Blog({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams?: { [key: string]: string | string[] | undefined }
}) {
    const page = Number(searchParams?.page) || 1
    const limit = Number(searchParams?.limit) || 12

    const blogs = await getBlogs({ ...searchParams, page, limit })

    const blogDummy: IBlog[] = [
        {
            id: 1,
            image: '/images/personal-portfolio.jpg',
            label: 'Next.js',
            date: 'Jan 01, 2023',
            name: 'Personal Portfolio',
            description:
                'HTML, Next.js, Tailwind CSS personal portfolio template',
        },
        {
            id: 2,
            image: '/images/personal-portfolio2.jpg',
            label: 'Next.js',
            date: 'Jan 01, 2023',
            name: 'Personal Portfolio',
            description:
                'HTML, Next.js, Tailwind CSS personal portfolio template',
        },
        {
            id: 3,
            image: '/images/personal-portfolio3.jpg',
            label: 'Next.js',
            date: 'Jan 01, 2023',
            name: 'Personal Portfolio',
            description:
                'HTML, Next.js, Tailwind CSS personal portfolio template',
        },
        {
            id: 4,
            image: '/images/nexadash.jpg',
            label: 'Next.js',
            date: 'Jan 01, 2023',
            name: 'Nexadash',
            description:
                'HTML, Next.js, Tailwind CSS personal portfolio template',
        },
    ]

    const blogItems = []
    for (const blog of blogs?.data?.page?.edges || blogDummy) {
        blogItems.push(`{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "name": "${blog?.node?.title}",
            "image": "${process.env.NEXT_PUBLIC_APP_URL}${blog?.node?.featureImage?.url}",
            "description": "${blog?.node?.metaDescription}",
            "url": "${process.env.NEXT_PUBLIC_APP_URL}/blog/${blog?.node?.slug}",
            "author": ${helper.getOrganizationJsonString()},
            "publisher": ${helper.getOrganizationJsonString()},
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "${process.env.NEXT_PUBLIC_APP_URL}/blog/${blog?.node?.slug}"
            }
        }`)
    }
    return (
        <>
            <div className="relative bg-gradient-to-r from-[#CACEFF]/10 to-gray-300/10 px-4 pb-10 pt-28 text-center sm:pt-32 lg:pb-[50px] lg:pt-40">
                <div className="mx-auto w-full max-w-3xl px-4">
                    <h1 className="mx-auto mb-2.5 max-w-lg text-[26px]/[30px] font-bold -tracking-wide text-primary md:text-[40px]/[50px]">
                        Your daily dose of inspiration and information.
                    </h1>
                    <p className="font-medium lg:leading-[30px]">
                        Welcome to the sbthemes blog, Help your self to read the
                        resource for the latest tips, tricks, and solutions in
                        web design and development. Dive into our expert
                        insights on creating stunning websites, choosing the
                        right themes, and mastering backend code strategies.
                    </p>
                </div>
            </div>
            <div className="container space-y-12 py-12 lg:space-y-20 lg:py-20">
                {/* <div className="flex flex-col gap-5 md:flex-row lg:gap-14">
                    <div className="order-2 md:order-1">
                        <p className="mb-2 flex items-center gap-2.5 text-sm/5 font-bold">
                            Jan 01, 2023
                        </p>
                        <h2 className="mb-2.5 text-xl/6 font-semibold tracking-tight text-primary lg:text-3xl/[45px]">
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Incidunt suscipit dolore, dolorem eum rerum
                            ipsum.
                        </h2>
                        <p className="mb-5 text-sm/5 lg:text-base/6">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Voluptatem, odit rerum rem totam illum nulla
                            praesentium iusto illo! Repellendus ipsam sunt
                            blanditiis ad eaque architecto eos labore magni
                            ullam quibusdam.
                        </p>
                        <div className="inline-block rounded bg-secondary/10 px-2.5 py-1 text-xs/5 font-bold text-secondary">
                            Next.js
                        </div>
                    </div>
                    <div className="order-1 w-full max-w-lg overflow-hidden rounded-xl md:order-2 md:max-w-xl">
                        <Image
                            src="/images/blockchain.jpg"
                            alt="Post 1"
                            width={600}
                            height={630}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div> */}
                <div className="grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                    {blogs?.data?.page?.edges?.map(
                        ({ node }: { node: IBlog }) => (
                            <BlogCard key={node.id} blog={node} />
                        ),
                    )}
                </div>
                {Math.ceil(blogs?.data?.page?.aggregate?.count / limit) > 1 && (
                    <div>
                        <Pagination
                            dataLength={blogs?.data?.page?.aggregate?.count}
                            currentPage={Number(page)}
                            totalPages={Math.ceil(
                                blogs?.data?.page?.aggregate?.count / limit,
                            )}
                            perPage={limit}
                            alignClass="justify-center [&_.prev-next-btn>svg]:!w-3.5 !my-0"
                            routerOptions={{ scroll: false }}
                        />
                    </div>
                )}
            </div>
            <Newsletter />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `{
                        "@context": "https://schema.org",
                        "@type": "Blog",
                        "name": "Your daily dose of inspiration and information.",
                        "url": "${process.env.NEXT_PUBLIC_APP_URL}/blog",
                        "description": "Explore the sbthemes blog for the latest trends, tips, and updates on web design and development. Get insights on our templates and industry news.",
                        "inLanguage": "en",
                        "breadcrumb": {
                            "@type": "BreadcrumbList",
                            "itemListElement": [{
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "${process.env.NEXT_PUBLIC_APP_URL}"
                            },{
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Blog",
                                "item": "${process.env.NEXT_PUBLIC_APP_URL}/blog"
                            }]
                        },
                        "blogPost": [${blogItems.join(',')}]
                    }`,
                }}
                key="product-jsonld3"
            />
        </>
    )
}
