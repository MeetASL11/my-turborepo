import React from 'react'
import { Metadata } from 'next'

import ToolsDetails from '@/components/tools/tools-details'
import helper from '@/lib/helper'

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Tools | sbthemes`,
        description: 'Discover a powerful set of tools designed to enhance content creation, boost productivity, and optimize website performance, all in one place to elevate your digital presence.',
        openGraph: {
            ...helper.openGraphData,
            title: `Tools | sbthemes`,
            description:
                'Discover a powerful set of tools designed to enhance content creation, boost productivity, and optimize website performance, all in one place to elevate your digital presence.',
            url: `${process.env.NEXT_PUBLIC_APP_URL}/tools`,
            type: 'website',
        },
        twitter: {
            title: `Tools | sbthemes`,
            description:
                'Discover a powerful set of tools designed to enhance content creation, boost productivity, and optimize website performance, all in one place to elevate your digital presence.',
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_APP_URL}/tools`,
            languages: {
                'x-default': `${process.env.NEXT_PUBLIC_APP_URL}/tools`,
            },
        },
    }
}

export default function Tools() {
    return (
        <>
            <div>
                <ToolsDetails />
            </div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `{
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Tools",
                "url": "${process.env.NEXT_PUBLIC_APP_URL}/tools",
                "description": "Discover a powerful set of tools designed to enhance content creation, boost productivity, and optimize website performance, all in one place to elevate your digital presence.",
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
                        "name": "Tools",
                        "item": "${process.env.NEXT_PUBLIC_APP_URL}/tools"
                    }]
                }
            }`,
                }}
                key="product-jsonld4"
            />
        </>
    )
}
