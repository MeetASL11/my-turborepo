import React from 'react'
import { Metadata } from 'next'

import EncryptText from '@/components/tools/encryption/encrypt-text'
import SimilarToolBlock from '@/components/tools/similar-tool-block'
import helper from '@/lib/helper'

export async function generateMetadata(): Promise<Metadata> {
    const metadata = helper.getToolObjectFromSlug('encryption')

    return {
        title: `${metadata?.metaTitle || ''} | sbthemes`,
        description: metadata?.metaDescription || '',
        openGraph: {
            ...helper.openGraphData,
            title: `${metadata?.metaTitle || ''} | sbthemes`,
            description: metadata?.metaDescription || '',
            url: `${process.env.NEXT_PUBLIC_APP_URL}/tools/${metadata?.slug || ''}`,
            type: 'website',
        },
        twitter: {
            title: `${metadata?.metaTitle || ''} | sbthemes`,
            description: metadata?.metaDescription || '',
            site: `${process.env.NEXT_PUBLIC_APP_URL}/tools/${metadata?.slug || ''}`,
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_APP_URL}/tools/${metadata?.slug || ''}`,
            languages: {
                'x-default': `${process.env.NEXT_PUBLIC_APP_URL}/tools/${metadata?.slug || ''}`,
            },
        },
    }
}

export default function Encryption() {
    const toolDetail = helper.getToolObjectFromSlug('encryption')

    return (
        <>
            <div>
                <div className="relative bg-gradient-to-r from-[#CACEFF]/10 to-gray-300/10 px-4 pb-10 pt-28 text-center sm:pt-32 lg:pb-[50px] lg:pt-40">
                    <h1 className="mb-2.5 text-[26px]/[30px] font-bold text-primary md:text-[40px]/[50px]">
                        {toolDetail?.title}
                    </h1>
                    <p className="mx-auto w-full max-w-[812px] px-4 font-medium leading-7 lg:leading-[30px]">
                        {toolDetail?.description}
                    </p>
                </div>
                <div className="container my-5 grid grid-cols-1 gap-10 lg:my-14 xl:grid-cols-2">
                    <EncryptText />
                </div>

                <div className="container">
                    <div
                        className="prose max-w-full"
                        dangerouslySetInnerHTML={{
                            __html: toolDetail?.long_description || '',
                        }}
                    />
                </div>

                <SimilarToolBlock category={toolDetail?.slug} />
            </div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: helper.getToolJSONLD(toolDetail),
                }}
                key="product-jsonld4"
            />
        </>
    )
}
