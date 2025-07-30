'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { parse } from 'node-html-parser'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type IPreview = {
    title: string
    description: string
    image: string
    html: string
}

const SocialMediaSharePreviewGenerator = () => {
    const [URL, setURL] = useState('')
    const [preview, setPreview] = useState<IPreview | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const generatePreview = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.get(
                `/api/social-media-share-preview?url=${URL}`,
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

            setPreview({
                title,
                description,
                image,
                html: htmlContent,
            })
        } catch (error) {
            setPreview(null)
        }
        setIsLoading(false)
    }

    return (
        <div className="container my-5 grid items-start gap-6 lg:my-14 lg:grid-cols-2 xl:grid-cols-3 xl:gap-10">
            <div className="rounded-2xl border border-border bg-gray-100 p-4 lg:p-8 xl:col-span-2">
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
                            value={URL}
                            onChange={(e) => setURL(e.target.value)}
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
            </div>
            {/* Preview */}
            <div className="flex min-h-[80px] w-full rounded-xl bg-white px-4 py-3 font-medium text-primary shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)] disabled:cursor-not-allowed disabled:opacity-50">
                {preview ? (
                    <div className="w-full space-y-2">
                        <div className="w-full overflow-hidden rounded-t-xl border-b-2 pb-4">
                            {preview?.image ? (
                                <Image
                                    src={preview.image}
                                    alt="Preview Image"
                                    className="h-full w-full object-contain"
                                    width={1200}
                                    height={630}
                                />
                            ) : (
                                <div className="flex h-[130px] w-full items-center justify-center bg-gray-100">
                                    No image found
                                </div>
                            )}
                        </div>
                        <h3 className="text-lg font-semibold">
                            {preview?.title}
                        </h3>
                        <p className="text-sm">{preview.description}</p>
                    </div>
                ) : (
                    <div className="flex grow items-center justify-center py-10 text-lg text-gray">
                        No preview found
                    </div>
                )}
            </div>
        </div>
    )
}

export default SocialMediaSharePreviewGenerator
