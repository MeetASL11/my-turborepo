'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { IPreviewImages } from '@/app/(default)/tools/website-optimization-suite/_website-optimization-suite-generator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const getImageURL = (imageURL: string, domainURl: string) => {
    if (!!imageURL) {
        if (imageURL.startsWith('/')) {
            const domain = new URL(domainURl)
            return `${domain?.origin}${imageURL}`
        }
        return imageURL
    }
    return ''
}

const WebsiteOptimizationSuiteImages = ({
    images,
    url,
}: {
    images: IPreviewImages
    url: string
}) => {
    const [activeTab, setActiveTab] = useState('all_images')

    const filterImages =
        activeTab === 'all_images'
            ? images
            : activeTab === 'alt_missing'
              ? images.filter((image) => !image?.alt)
              : images.filter((image) => !image?.title)

    return (
        <div className="text-sm">
            <Tabs
                defaultValue="all_images"
                value={activeTab}
                onValueChange={setActiveTab}
            >
                    <TabsList className="gap-2 flex h-full w-full justify-start overflow-x-auto">
                        <TabsTrigger value="all_images">All</TabsTrigger>
                        <TabsTrigger value="alt_missing">
                            Alt missing
                        </TabsTrigger>
                        <TabsTrigger value="title_missing">
                            Title missing
                        </TabsTrigger>
                    </TabsList>
                <TabsContent value={activeTab}>
                    <div className="flex flex-col gap-4 divide-y-2 divide-border">
                        {!!filterImages?.length ? (
                            filterImages?.map((image, key) => (
                                <div
                                    key={key}
                                    className="flex flex-col-reverse md:flex-row justify-between gap-3 py-4"
                                >
                                    <div className="space-y-4">
                                        <div>
                                            <dt className="flex justify-between gap-3 font-semibold">
                                                <span>Alt :</span>
                                            </dt>
                                            <dd
                                                className={cn(
                                                    'mt-1 text-gray',
                                                    {
                                                        'text-danger':
                                                            !image?.alt,
                                                    },
                                                )}
                                            >
                                                {image?.alt || 'Missing'}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="flex justify-between gap-3 font-semibold">
                                                <span>Title :</span>
                                            </dt>
                                            <dd
                                                className={cn(
                                                    'mt-1 text-gray',
                                                    {
                                                        'text-danger':
                                                            !image?.title,
                                                    },
                                                )}
                                            >
                                                {image?.title || 'Missing'}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="flex justify-between gap-3 font-semibold">
                                                <span>URL :</span>
                                            </dt>
                                            <dd
                                                className={cn(
                                                    'mt-1 text-gray',
                                                    {
                                                        'text-danger':
                                                            !image?.src &&
                                                            !image?.dataSrc,
                                                    },
                                                )}
                                            >
                                                {image?.src ||
                                                image?.dataSrc ? (
                                                    <Link
                                                        href={getImageURL(
                                                            image?.src ||
                                                                image?.dataSrc ||
                                                                '',
                                                            url,
                                                        )}
                                                        target="_blank"
                                                        className="text-blue hover:underline"
                                                    >
                                                        {image?.src ||
                                                            image?.dataSrc}
                                                    </Link>
                                                ) : (
                                                    'Missing'
                                                )}
                                            </dd>
                                        </div>
                                    </div>
                                    <div className='size-[100px]'>
                                        {(!!image?.src || !!image?.dataSrc) && (
                                            <Image
                                                src={getImageURL(
                                                    image?.src ||
                                                        image?.dataSrc ||
                                                        '',
                                                    url,
                                                )}
                                                alt={image?.alt}
                                                title={image?.title}
                                                width={100}
                                                height={100}
                                                className="rounded w-full h-full object-contain"
                                            />
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No images found</div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default WebsiteOptimizationSuiteImages
