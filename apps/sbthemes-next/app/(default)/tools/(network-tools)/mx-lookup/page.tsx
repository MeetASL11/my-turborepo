import { Metadata } from 'next'

import MXLookupForm from '@/app/(default)/tools/(network-tools)/mx-lookup/_mx-lookup-form'
import SimilarToolBlock from '@/components/tools/similar-tool-block'
import helper from '@/lib/helper'

export async function generateMetadata(): Promise<Metadata> {
    const metadata = helper.getToolObjectFromSlug('mx-lookup')

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

function MXLookup() {
    const toolDetail = helper.getToolObjectFromSlug('mx-lookup')

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
                <MXLookupForm />

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

export default MXLookup
