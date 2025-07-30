import React from 'react'
import { Metadata, ResolvingMetadata } from 'next'

import FilteredTemplateList from '@/components/custom/filtered-template-list'
import helper from '@/lib/helper'
import { IProduct } from '@/types/product'

interface Props {
    params: { slug: string }
    searchParams: {
        technologies?: string
        category: string
    }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    return {
        title: `Free templates | sbthemes`,
        description:
            'Explore our collection of free templates, quality designs at no cost. Elevate your website without breaking the bank. Download and launch your online presence today!',
        openGraph: {
            ...helper.openGraphData,
            title: `Free templates | sbthemes`,
            description:
                'Explore our collection of free templates, quality designs at no cost. Elevate your website without breaking the bank. Download and launch your online presence today!',
            url: `${process.env.NEXT_PUBLIC_APP_URL}/free-templates`,
            type: 'website',
        },
        twitter: {
            title: `Free templates | sbthemes`,
            description:
                'Explore our collection of free templates, quality designs at no cost. Elevate your website without breaking the bank. Download and launch your online presence today!',
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_APP_URL}/free-templates`,
            languages: {
                'x-default': `${process.env.NEXT_PUBLIC_APP_URL}/free-templates`,
            },
        },
    }
}

export default function Page({ searchParams }: Props) {
    const technology = searchParams?.technologies?.split(',') || []
    const categories = searchParams?.category?.split(',') || []

    const techLabels = technology
        .map(
            (value) =>
                helper.technologies.find((tech) => tech.value === value)
                    ?.label || '',
        )
        .filter(Boolean)

    const templates: IProduct[] = helper
        .getProducts({
            tech: techLabels || [],
            categories: categories || [],
        })
        .filter((prod: IProduct) => prod.from_price === 0)

    return (
        <div>
            <div className="relative bg-gradient-to-r from-[#CACEFF]/10 to-gray-300/10 px-4 pb-10 pt-28 text-center sm:pt-32 lg:pb-[50px] lg:pt-40">
                <div className="mx-auto w-full max-w-[812px] px-4">
                    <h1 className="mb-2.5 text-[26px]/[30px] font-bold -tracking-wide text-primary md:text-[40px]/[50px]">
                        Free templates
                    </h1>
                    <p className="font-medium lg:leading-7">
                        Explore our collection of free templates, quality
                        designs at no cost. Elevate your website without
                        breaking the bank. Download and launch your online
                        presence today!
                    </p>
                </div>
            </div>

            <FilteredTemplateList templates={templates} isFreeTemplate={true} />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `{
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Free templates",
                        "url": "${process.env.NEXT_PUBLIC_APP_URL}/free-templates",
                        "description": "Explore our collection of free templates, quality designs at no cost. Elevate your website without breaking the bank. Download and launch your online presence today!",
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
                                "name": "Free templates",
                                "item": "${process.env.NEXT_PUBLIC_APP_URL}/free-templates"
                            }]
                        }
                    }`,
                }}
                key="product-jsonld4"
            />
        </div>
    )
}
