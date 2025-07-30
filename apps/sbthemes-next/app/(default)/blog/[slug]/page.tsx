import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { Copy } from 'lucide-react'

import BlogCard from '@/components/custom/blog-card'
import CopyToClipboard from '@/components/custom/copy-to-clipboard'
import Newsletter from '@/components/custom/newsletter'
import IconFacebook from '@/components/icons/icon-facebook'
import IconLinkedin from '@/components/icons/icon-linkedin'
import IconWhatsapp from '@/components/icons/icon-whatsapp'
import IconXSocial from '@/components/icons/icon-x-social'
import helper from '@/lib/helper'
import { IBlog } from '@/types/blog'

async function getBlog(param: string) {
    try {
        const headers = {
            'content-type': 'application/json',
        }
        const requestBody = {
            query: `query {
                         blog(where: {slug: "${param}"}) {
                            id
                            slug
                            stage
                            title
                            featureImage
                            frontShowDate
                            updatedAt
                            metaDescription
                            content {
                              html
                            }
                            category {
                              id
                              title
                              slug
                            }
                    }
                }
              `,
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

        return response?.data?.blog
    } catch (error) {}
}

async function getRelatedBlog(param: string, categories: string[]) {
    try {
        const headers = {
            'content-type': 'application/json',
        }
        const requestBody = {
            query: `query($categories: [String!]!) {
                     page: blogsConnection(
                          stage: PUBLISHED
                          first: 4
                          orderBy: frontShowDate_DESC
                          where: {category_some: {slug_in: $categories}, AND: {slug_not: "${param}"}}
                        ) {
                          edges {
                            node {
                              id
                              slug
                              stage
                              title
                              featureImage
                              frontShowDate
                              metaDescription
                              content {
                                html
                              }
                              category {
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
                categories: categories,
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

export async function generateMetadata({
    params,
}: {
    params: { slug: string }
}) {
    const blogData = await getBlog(params.slug)

    return {
        title: blogData?.title,
        description: blogData?.metaDescription,
        openGraph: {
            title: blogData?.title,
            description: blogData?.metaDescription,
            url: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${blogData?.slug}`,
            type: 'article',
            images: [
                {
                    url: blogData?.featureImage,
                    width: 1200,
                    height: 630,
                },
            ],
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${blogData?.slug}`,
        },
    }
}

export default async function BlogDetails({
    params,
}: {
    params: { slug: string }
}) {
    const blogData: IBlog = await getBlog(params?.slug)
    const relatedBlogs = await getRelatedBlog(
        params?.slug,
        blogData?.category?.map((category) => category?.slug) || [],
    )

    const blog: IBlog[] = [
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
    ]
    return (
        <>
            <div className="mx-auto w-full max-w-5xl space-y-10 px-4 pt-24 sm:pt-28 lg:pt-44">
                <div className="space-y-4 lg:space-y-8">
                    <div>
                        {/* {blogData?.frontShowDate && (
                            <p className="mb-1 flex items-center gap-2.5 text-xs/5 font-bold lg:text-sm/5">
                                {format(
                                    blogData?.frontShowDate,
                                    'LLL dd, yyyy',
                                )}
                            </p>
                        )} */}

                        <h1 className="mb-3 text-xl font-bold tracking-tight text-primary lg:mb-5 lg:text-3xl/[40px]">
                            {blogData?.title}
                        </h1>
                        <div className="flex flex-wrap gap-2">
                            {blogData?.category?.map((category) => {
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

                    {/* social share links */}
                    <div className="flex items-center gap-3">
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_APP_URL}/blog/${blogData?.slug}`}
                            target="_blank"
                            className="flex items-center justify-center rounded-full bg-gray/20 p-1.5 hover:bg-gray/30 lg:p-2"
                        >
                            <IconFacebook className="size-3 lg:size-4" />
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?url=${process.env.NEXT_PUBLIC_APP_URL}/blog/${blogData?.slug}&text=${blogData?.title}`}
                            target="_blank"
                            className="flex items-center justify-center rounded-full bg-gray/20 p-1.5 hover:bg-gray/30 lg:p-2"
                        >
                            <IconXSocial className="size-3 lg:size-4" />
                        </a>
                        <a
                            href={`https://www.linkedin.com/shareArticle?url=${process.env.NEXT_PUBLIC_APP_URL}/blog/${blogData?.slug}&title=${blogData?.title}`}
                            target="_blank"
                            className="flex items-center justify-center rounded-full bg-gray/20 p-1.5 hover:bg-gray/30 lg:p-2"
                        >
                            <IconLinkedin className="size-3 lg:size-4" />
                        </a>
                        <a
                            href={`https://api.whatsapp.com/send?text=${blogData?.title} - ${process.env.NEXT_PUBLIC_APP_URL}/blog/${blogData?.slug}`}
                            target="_blank"
                            className="flex items-center justify-center rounded-full bg-gray/20 p-1.5 hover:bg-gray/30 lg:p-2"
                        >
                            <IconWhatsapp className="size-3 lg:size-4" />
                        </a>
                        <CopyToClipboard
                            text={`${process.env.NEXT_PUBLIC_APP_URL}/blog/${blogData?.slug}`}
                            className="flex items-center justify-center rounded-full bg-gray/20 p-1.5 hover:bg-gray/30 lg:p-2"
                        >
                            <Copy className="size-3 lg:size-4" />
                        </CopyToClipboard>
                    </div>

                    <div className="w-full max-w-lg shrink-0 overflow-hidden rounded-xl">
                        {blogData?.featureImage && (
                            <Image
                                src={blogData?.featureImage}
                                alt="Blockchain"
                                width={600}
                                height={630}
                                className="h-full w-full object-cover"
                            />
                        )}
                    </div>
                </div>
                <div
                    className="prose w-full max-w-none pb-10 lg:prose-lg"
                    dangerouslySetInnerHTML={{
                        __html: blogData?.content?.html || '',
                    }}
                ></div>
            </div>

            {!!relatedBlogs?.data?.page?.edges?.length && (
                <div className="container py-12 lg:py-20">
                    <h2 className="mb-5 inline-block bg-gradient-to-r from-primary to-gray bg-clip-text text-xl font-semibold tracking-tight text-transparent lg:mb-10 lg:text-[28px]/9">
                        Recent blog
                    </h2>
                    <div className="grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                        {relatedBlogs?.data?.page?.edges?.map(
                            ({ node }: { node: IBlog }) => (
                                <BlogCard key={node.id} blog={node} />
                            ),
                        )}
                    </div>
                </div>
            )}
            <Newsletter />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `{
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": "${process.env.NEXT_PUBLIC_APP_URL}/blog/${params?.slug}"
                        },
                        "headline": "${blogData?.title}",
                        "image": "${process.env.NEXT_PUBLIC_APP_URL}${blogData?.featureImage}",
                        "author": ${helper.getOrganizationJsonString()},
                        "publisher": ${helper.getOrganizationJsonString()},
                        "description": "${blogData?.metaDescription}",
                        "articleBody": "${blogData?.content?.html
                            .replace(/<[^>]+>/g, '')
                            .replace(/\n/g, '')
                            .slice(0, 200)}..."
                        }`,
                }}
            />
        </>
    )
}
