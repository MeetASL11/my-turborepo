import React from 'react'
import { notFound } from 'next/navigation'

import BlogCard from '@/components/custom/blog-card'
import Newsletter from '@/components/custom/newsletter'
import Pagination from '@/components/custom/pagination'
import helper from '@/lib/helper'
import { IBlog } from '@/types/blog'

export async function generateMetadata({
    params,
    searchParams,
}: {
    params: { category: string }
    searchParams?: { [key: string]: string | string[] | undefined }
}) {
    const page = 1
    const limit = 12

    const blogs = await getBlogs(params?.category, {
        ...searchParams,
        page,
        limit,
    })

    const rawDescription = blogs?.data?.category?.content?.html || ''
    const plainTextDescription = rawDescription.replace(/<[^>]*>/g, '')

    if (!blogs?.data?.category) notFound()

    return {
        title: blogs?.data?.category?.title,
        description: plainTextDescription || '',
        openGraph: {
            ...helper.openGraphData,
            title: blogs?.data?.category?.title,
            description: plainTextDescription || '',
            url: `${process.env.NEXT_PUBLIC_APP_URL}/blog/category/${blogs?.data?.category?.slug}`,
            type: 'website',
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_APP_URL}/blog/category/${blogs?.data?.category?.slug}`,
        },
    }
}

async function getBlogs(param: string, filter: any) {
    const orderBy = filter?.orderBy || 'createdAt_DESC'

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
             category(where: {slug: "${param}"}) {
                      id
                      title
                      stage
                      slug
                      content {
                        html
                       }
                    }
                page: blogsConnection(skip: $skip, first: $first, stage: $stage, orderBy: $orderBy where: {category_some: {slug: "${param}"}}) {
                    edges {
                          node {
                            id
                            slug
                            stage
                            title
                            featureImage
                            createdAt
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

export default async function Category({
    params,
    searchParams,
}: {
    params: { category: string }
    searchParams?: { [key: string]: string | string[] | undefined }
}) {
    const page = Number(searchParams?.page) || 1
    const limit = Number(searchParams?.limit) || 12

    const blogs = await getBlogs(params?.category, {
        ...searchParams,
        page,
        limit,
    })

    if (!blogs?.data?.category) notFound()

    return (
        <>
            <div className="mx-auto w-full max-w-6xl bg-gradient-to-r from-[#CACEFF]/10 to-gray-300/10 px-4 pb-12 lg:pb-20 pt-24 sm:pt-28 lg:pt-44">
                <h1 className="relative mx-auto max-w-3xl text-center text-2xl font-bold -tracking-wide text-primary md:text-5xl/[50px] 2xl:text-6xl/[75px]">
                    {blogs?.data?.category?.title}
                </h1>
                <div
                    className="mt-8 text-center"
                    dangerouslySetInnerHTML={{
                        __html: blogs?.data?.category?.content?.html || '',
                    }}
                ></div>
            </div>
            <div className="container space-y-12 py-12 lg:space-y-20 lg:py-20">
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
        </>
    )
}
