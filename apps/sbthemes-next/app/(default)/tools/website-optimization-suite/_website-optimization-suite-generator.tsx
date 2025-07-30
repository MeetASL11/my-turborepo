'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { parse } from 'node-html-parser'

import WebsiteOptimizationSuiteContent from '@/app/(default)/tools/website-optimization-suite/_website-optimization-suite-content'
import WebsiteOptimizationSuiteImages from '@/app/(default)/tools/website-optimization-suite/_website-optimization-suite-images'
import WebsiteOptimizationSuiteIndexability from '@/app/(default)/tools/website-optimization-suite/_website-optimization-suite-indexability'
import WebsiteOptimizationSuiteSocial from '@/app/(default)/tools/website-optimization-suite/_website-optimization-suite-social'
import WebsiteOptimizationSuiteStructureData from '@/app/(default)/tools/website-optimization-suite/_website-optimization-suite-structured-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from '@/components/ui/use-toast'

export type IPreviewContent = {
    meta: {
        title: string
        description: string
    }
    dates: {
        publishedDate: string
        modifiedDate: string
    }
    content: {
        wordCount: number
        headings: {
            level: number
            text: string
        }[]
    }
}

export type IPreviewIndexability = {
    canonicalUrl: string
    robotsMetaTag: string
    robotsTxt: string
    robotsURL: string
    xRobotsTag: string
    sitemaps: (string | undefined)[]
    hrefLangs: { lang: string | undefined; url: string | undefined }[]
}

export type IPreviewSocial = {
    openGraph: {
        title: string
        type: string
        image: string
        url: string
        description: string
        siteName: string
    }
    twitter: {
        card: string
        site: string
        description: string
        title: string
        image: string
    }
}

export type IPreviewImages = {
    src: string | undefined
    dataSrc: string | undefined
    title: string
    alt: string
}[]

type StructuredData = {
    '@context'?: string
    '@type': string
}

// FAQPage specific type
type FAQPage = StructuredData & {
    '@type': 'FAQPage'
    mainEntity: Question[]
}

type Question = {
    '@type': 'Question'
    name: string
    acceptedAnswer: Answer
}

type Answer = {
    '@type': 'Answer'
    text: string
}

// Organization specific type
type Organization = StructuredData & {
    '@type': 'Organization'
    name: string
    url: string
    logo?: string
}

// WebSite specific type
type WebSite = StructuredData & {
    '@type': 'WebSite'
    name: string
    url: string
}

// Article specific type
type Article = StructuredData & {
    '@type': 'Article'
    headline: string
    datePublished: string
    author: {
        '@type': 'Person'
        name: string
    }
}

export type IPreviewStructuredData = {
    faqPage?: FAQPage[]
    organization?: Organization[]
    webSite?: WebSite[]
    article?: Article[]
}

type IPreview = {
    url: string
    origin: string
    title: string
    description: string
    image: string
    html: string
    content: IPreviewContent
    indexability: IPreviewIndexability
    social: IPreviewSocial
    images: IPreviewImages
    structuredData: IPreviewStructuredData
}

const analyticsTabs = [
    'Content',
    'Indexability',
    'Structured data',
    'Social',
    'Images',
]

const WebsiteOptimizationSuiteGenerator = () => {
    const [url, setUrl] = useState('')
    const [preview, setPreview] = useState<IPreview | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const getRobotsTxt = async () => {
        try {
            const domain = new URL(url)
            const robotsTxtResponse = await axios.get(
                `${domain?.origin}/robots.txt`,
            )
            return robotsTxtResponse.data || ''
        } catch (error) {
            return ''
        }
    }

    const generatePreview = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.get(
                `/api/social-media-share-preview?url=${url}`,
            )
            const root = parse(data?.data)
            // Get the HTML representation of the parsed document
            const htmlContent = root.outerHTML

            // Extract metadata
            const title = root.querySelector('title')?.textContent || ''
            const description =
                root
                    .querySelector('meta[name="description"]')
                    ?.getAttribute('content') || ''
            const image =
                root
                    .querySelector('meta[property="og:image"]')
                    ?.getAttribute('content') || ''

            const publishedDate =
                root
                    .querySelector('meta[property="article:published_time"]')
                    ?.getAttribute('content') || ''
            const modifiedDate =
                root
                    .querySelector('meta[property="article:modified_time"]')
                    ?.getAttribute('content') || ''

            const wordCount = root.textContent.split(' ').length
            const headings = Array.from(
                root.querySelectorAll('h1, h2, h3, h4, h5, h6'),
            ).map((heading) => ({
                level: parseInt(heading.tagName.substring(1)),
                text: heading.textContent,
            }))

            // Extract canonical URL
            const canonicalUrl =
                root
                    .querySelector('link[rel="canonical"]')
                    ?.getAttribute('href') || ''

            // Extract robots meta tag
            const robotsMetaTag =
                root
                    .querySelector('meta[name="robots"]')
                    ?.getAttribute('content') || ''

            const domain = new URL(url)

            // Extract robots.txt
            let robotsTxt: string = await getRobotsTxt()
            const robotsURL = !!robotsTxt ? `${domain?.origin}/robots.txt` : ''

            // Extract X-Robots-Tag HTTP header
            const robotsHttpResponse = await axios.head(domain?.origin)
            const xRobotsTag = robotsHttpResponse.headers['x-robots-tag'] || ''

            // Extract sitemaps
            let sitemaps = []
            if (!!robotsTxt) {
                const sitemapsRegex = /Sitemap:\s*(\S+)/gi
                const sitemapsMatches = robotsTxt.matchAll(sitemapsRegex)
                sitemaps =
                    Array.from(sitemapsMatches, (match: any) => match[1]) || ''
            }

            // Extract hrefLangs
            const hreflangElements = root.querySelectorAll(
                'link[rel="alternate"]',
            )
            const hrefLangs = Array.from(hreflangElements).map((element) => ({
                lang: element.getAttribute('hreflang'),
                url: element.getAttribute('href'),
            }))

            // Extracting Open Graph tags
            const ogTitle =
                root
                    .querySelector('meta[property="og:title"]')
                    ?.getAttribute('content') || ''
            const ogType =
                root
                    .querySelector('meta[property="og:type"]')
                    ?.getAttribute('content') || ''
            const ogImage =
                root
                    .querySelector('meta[property="og:image"]')
                    ?.getAttribute('content') || ''
            const ogUrl =
                root
                    .querySelector('meta[property="og:url"]')
                    ?.getAttribute('content') || ''
            const ogDescription =
                root
                    .querySelector('meta[property="og:description"]')
                    ?.getAttribute('content') || ''
            const ogSiteName =
                root
                    .querySelector('meta[property="og:site_name"]')
                    ?.getAttribute('content') || ''

            // Extracting Twitter Card tags
            const twitterCard =
                root
                    .querySelector('meta[name="twitter:card"]')
                    ?.getAttribute('content') || ''
            const twitterSite =
                root
                    .querySelector('meta[name="twitter:site"]')
                    ?.getAttribute('content') || ''
            const twitterDescription =
                root
                    .querySelector('meta[name="twitter:description"]')
                    ?.getAttribute('content') || ''
            const twitterTitle =
                root
                    .querySelector('meta[name="twitter:title"]')
                    ?.getAttribute('content') || ''
            const twitterImage =
                root
                    .querySelector('meta[name="twitter:image"]')
                    ?.getAttribute('content') || ''

            // Extract images

            const images = Array.from(root.querySelectorAll('img')).map(
                (img) => ({
                    src: img.getAttribute('src'),
                    dataSrc: img.getAttribute('data-src'),
                    title: img.getAttribute('title') || '',
                    alt: img.getAttribute('alt') || '',
                }),
            )

            // Extract structured data (JSON-LD)
            const structuredDataScripts = Array.from(
                root.querySelectorAll('script[type="application/ld+json"]'),
            )
                .map((script) => {
                    try {
                        return JSON.parse(script.textContent)
                    } catch (e) {
                        return null
                    }
                })
                .filter((script) => script !== null)

            const filterStructuredDataScripts = Array.isArray(
                structuredDataScripts?.[0],
            )
                ? structuredDataScripts?.[0]
                : structuredDataScripts

            const faqPageData =
                filterStructuredDataScripts?.find(
                    (acc: FAQPage) => acc['@type'] === 'FAQPage',
                ) || null
            const organizationData =
                filterStructuredDataScripts?.find(
                    (acc: Organization) => acc['@type'] === 'Organization',
                ) || null
            const webSiteData =
                filterStructuredDataScripts?.find(
                    (acc: WebSite) => acc['@type'] === 'WebSite',
                ) || null
            const articleData =
                filterStructuredDataScripts?.find(
                    (acc: Article) => acc['@type'] === 'Article',
                ) || null

            setPreview({
                url,
                origin: domain?.origin,
                title,
                description,
                image,
                html: htmlContent,
                content: {
                    meta: {
                        title,
                        description,
                    },
                    dates: {
                        publishedDate,
                        modifiedDate,
                    },
                    content: {
                        wordCount,
                        headings,
                    },
                },
                indexability: {
                    canonicalUrl,
                    robotsMetaTag,
                    robotsTxt,
                    robotsURL,
                    xRobotsTag,
                    sitemaps,
                    hrefLangs,
                },
                social: {
                    openGraph: {
                        title: ogTitle,
                        type: ogType,
                        image: ogImage,
                        url: ogUrl,
                        description: ogDescription,
                        siteName: ogSiteName,
                    },
                    twitter: {
                        card: twitterCard,
                        site: twitterSite,
                        description: twitterDescription,
                        title: twitterTitle,
                        image: twitterImage,
                    },
                },
                images: images,
                structuredData: {
                    faqPage: faqPageData,
                    organization: organizationData,
                    webSite: webSiteData,
                    article: articleData,
                },
            })
        } catch (error) {
            toast({
                title: 'Unable to generate preview in given URL.',
                variant: 'error',
            })
            setPreview(null)
        }
        setIsLoading(false)
    }

    return (
        <div className="container">
            <div className="mx-auto my-5 w-full max-w-7xl space-y-8 rounded-2xl border border-border bg-gray-100 p-4 sm:px-5 sm:py-8 lg:mt-14 lg:px-10 lg:py-12">
                <form
                    className="space-y-8"
                    onSubmit={(e) => {
                        e.preventDefault()
                        generatePreview()
                    }}
                >
                    <div className="space-y-1">
                        <Input
                            type="url"
                            placeholder="URL (Paste here the url)"
                            className="w-full"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                        <label className="inline-block text-xs text-gray sm:px-3 sm:text-sm">
                            Example: https://sbthemes.com
                        </label>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                        <Button type="submit" loading={isLoading}>
                            Generate preview
                        </Button>
                    </div>
                </form>

                {/* Preview */}
                {preview && (
                    <div className="flex w-full rounded-xl bg-white font-medium text-primary shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)] disabled:cursor-not-allowed disabled:opacity-50">
                        <Tabs defaultValue="Content" className="w-full">
                            <div className="flex flex-col divide-y-2 md:divide-y-0 md:flex-row md:divide-x-2">
                                <div className="p-2 md:p-4 lg:min-w-60">
                                    <TabsList className="flex h-full w-full items-start justify-start gap-2 overflow-x-auto pb-2 md:flex-col md:pb-0">
                                        {analyticsTabs.map((tab, index) => (
                                            <TabsTrigger
                                                key={index}
                                                value={tab}
                                                className="flex w-full justify-start"
                                            >
                                                {tab}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>
                                </div>
                                <div className="col-span-4 grow p-4">
                                    <TabsContent
                                        value="Content"
                                        className="mt-0 p-0 ring-0"
                                    >
                                        <WebsiteOptimizationSuiteContent
                                            content={preview?.content}
                                        />
                                    </TabsContent>
                                    <TabsContent
                                        value="Structured data"
                                        className="mt-0 p-0 ring-0"
                                    >
                                        <WebsiteOptimizationSuiteStructureData
                                            structuredData={
                                                preview?.structuredData
                                            }
                                        />
                                    </TabsContent>
                                    <TabsContent
                                        value="Indexability"
                                        className="mt-0 p-0 ring-0"
                                    >
                                        <WebsiteOptimizationSuiteIndexability
                                            indexability={preview?.indexability}
                                            url={preview?.url}
                                        />
                                    </TabsContent>
                                    <TabsContent
                                        value="Social"
                                        className="mt-0 p-0 ring-0"
                                    >
                                        <WebsiteOptimizationSuiteSocial
                                            social={preview?.social}
                                        />
                                    </TabsContent>
                                    <TabsContent
                                        value="Images"
                                        className="mt-0 p-0 ring-0"
                                    >
                                        <WebsiteOptimizationSuiteImages
                                            images={preview?.images}
                                            url={preview?.url}
                                        />
                                    </TabsContent>
                                </div>
                            </div>
                        </Tabs>
                    </div>
                )}
            </div>
        </div>
    )
}

export const MissingContent = () => {
    return (
        <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger/80 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-danger"></span>
        </span>
    )
}

export default WebsiteOptimizationSuiteGenerator
