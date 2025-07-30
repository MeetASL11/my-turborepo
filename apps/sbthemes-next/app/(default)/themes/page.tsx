import React from 'react'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import TemplateCard from '@/components/custom/template-card'
import helper from '@/lib/helper'
import { IProduct } from '@/types/product'
import { ITemplates } from '@/types/templates'

interface Props {
    params: { slug: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    return {
        title: `Templates | sbthemes`,
        description:
            'Explore our collection of free Templates, featuring high-quality designs at no cost. Enhance your website effortlessly and launch your online presence today!',
        openGraph: {
            ...helper.openGraphData,
            title: `Templates | sbthemes`,
            description:
                'Explore our collection of free Templates, featuring high-quality designs at no cost. Enhance your website effortlessly and launch your online presence today!',
            url: `${process.env.NEXT_PUBLIC_APP_URL}/themes`,
            type: 'website',
        },
        twitter: {
            title: `Templates | sbthemes`,
            description:
                'Explore our collection of free Templates, featuring high-quality designs at no cost. Enhance your website effortlessly and launch your online presence today!',
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_APP_URL}/themes`,
            languages: {
                'x-default': `${process.env.NEXT_PUBLIC_APP_URL}/themes`,
            },
        },
    }
}

export default function Page({ params }: Props) {
    const templates: IProduct[] = helper.getProducts()

    return (
        <>
            <div>
                <div className="relative bg-gradient-to-r from-[#CACEFF]/10 to-gray-300/10 px-4 pb-10 pt-28 text-center sm:pt-32 lg:pb-[50px] lg:pt-40">
                    <div className="mx-auto w-full max-w-[812px] px-4">
                        <h1 className="mb-2.5 text-[26px]/[30px] font-bold -tracking-wide text-primary md:text-[40px]/[50px]">
                            Templates
                        </h1>
                        <p className="font-medium lg:leading-7">
                            Explore our collection of Templates, quality designs
                            at no cost. Elevate your website without breaking
                            the bank. Download and launch your online presence
                            today!
                        </p>
                    </div>
                </div>
                <div className="container grid gap-5 py-12 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:py-20 xl:grid-cols-4">
                    {templates.map((template) => (
                        <TemplateCard key={template.id} template={template} />
                    ))}
                </div>
            </div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `{
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Templates",
                        "url": "${process.env.NEXT_PUBLIC_APP_URL}/templates",
                        "description": "Explore our collection of free Templates, featuring high-quality designs at no cost. Enhance your website effortlessly and launch your online presence today!",
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
                                "name": "Templates",
                                "item": "${process.env.NEXT_PUBLIC_APP_URL}/themes"
                            }]
                        }
                    }`,
                }}
                key="product-jsonld7"
            />
        </>
    )
}
