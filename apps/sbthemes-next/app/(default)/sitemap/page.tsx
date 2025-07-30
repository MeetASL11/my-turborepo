import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import helper from '@/lib/helper'
import { IBlog } from '@/types/blog'

export const metadata: Metadata = {
    title: 'Sitemap | sbthemes',
    description:
        "Quickly navigate sbthemes's complete collection of Tailwind CSS, Next.js components, and shadcn/ui designs. Use this sitemap to find everything in one place. ",
    openGraph: {
        ...helper.openGraphData,
        title: 'Sitemap | sbthemes',
        description:
            "Quickly navigate sbthemes's complete collection of Tailwind CSS, Next.js components, and shadcn/ui designs. Use this sitemap to find everything in one place.",
        url: process.env.NEXT_PUBLIC_APP_URL + '/sitemap',
        type: 'website',
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap`,
    },
}

async function getBlogs() {
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
                first: Number(100000),
                stage: 'PUBLISHED',
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

export default async function Sitemap() {
    const blogs = await getBlogs()
    return (
        <div>
            <div className="relative bg-gradient-to-r from-[#CACEFF]/10 to-gray-300/10 px-4 pb-10 pt-28 text-center sm:pt-32 lg:pb-[50px] lg:pt-40">
                <div className="container">
                    <h1 className="mb-2.5 text-[26px]/[30px] font-bold -tracking-wide text-primary md:text-[40px]/[50px]">
                        SITEMAP
                    </h1>
                    <p className="font-medium lg:leading-[30px]">
                        Find Your Way Around Our Site
                    </p>
                </div>
            </div>
            <div className="container">
                <div className="prose py-12 hover:prose-a:no-underline lg:py-20">
                    <ul>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/subscription">
                                Unlock Every Template for Just $99
                            </Link>
                        </li>
                        <li>
                            <Link href="/themes">Templates</Link>
                        </li>
                        <li>
                            <Link href="/free-templates">Free templates</Link>
                        </li>
                        <li>
                            <Link href="/themes">Templates</Link>
                            <ul>
                                {helper.getProducts()?.map((theme) => (
                                    <li key={theme.id}>
                                        <Link href={`/themes/${theme.slug}`}>
                                            {theme.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <Link href="/templates">Templates</Link>
                            <ul>
                                <li>
                                    <Link href="/templates/nextjs">
                                        Next.js templates
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/templates/react">
                                        React templates
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/templates/html5">
                                        HTML5 templates
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/templates/tailwind-css">
                                        Tailwind CSS templates
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/templates/vuejs">
                                        Vue.js templates
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/templates/nuxt">
                                        Nuxt templates
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/templates/angularjs">
                                        AngularJS templates
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link href="/tools">Tools</Link>
                            <ul>
                                {helper.toolData.map((tool) => (
                                    <li key={tool.id}>
                                        <Link
                                            href={`/tools/${tool.slug}`}
                                            key={tool.id}
                                        >
                                            {tool.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <Link href="/contact">Contact us</Link>
                        </li>
                        <li>
                            <Link href="/blog">Blog</Link>

                            <ul>
                                {blogs?.data?.page?.edges?.map(
                                    ({ node }: { node: IBlog }) => (
                                        <li key={node.id}>
                                            <Link href={`/blog/${node.slug}`}>
                                                {node.title}
                                            </Link>
                                        </li>
                                    ),
                                )}
                            </ul>
                        </li>
                        <li>
                            <Link href="/terms-of-service">
                                Terms of Service
                            </Link>
                        </li>
                        <li>
                            <Link href="/privacy-policy">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link href="/refund-policy">Refund policy</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
