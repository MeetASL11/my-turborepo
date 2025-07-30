'use client'
import React, { useState } from 'react'
import { Copy } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

function UTMBuilder() {
    const [url, setUrl] = useState('')
    const [source, setSource] = useState('')
    const [medium, setMedium] = useState('')
    const [campaign, setCampaign] = useState('')
    const [content, setContent] = useState('')
    const [term, setTerm] = useState('')
    const [utmUrl, setUtmUrl] = useState('')

    const generateUTMUrl = () => {
        const utmSource = source ? `utm_source=${encodeURIComponent(source)}` : ''
        const utmMedium = medium ? `utm_medium=${encodeURIComponent(medium)}` : ''
        const utmCampaign = campaign ? `utm_campaign=${encodeURIComponent(campaign)}` : ''
        const utmContent = content ? `utm_content=${encodeURIComponent(content)}` : ''
        const utmTerm = term ? `utm_term=${encodeURIComponent(term)}` : ''
    
        const utmParams = [
            utmSource,
            utmMedium,
            utmCampaign,
            utmTerm,
            utmContent,
        ]
            .filter((param) => param) // filter out empty strings
            .join('&')
    
        setUtmUrl(`${url}?${utmParams}`)
    }

    const handleSample = () => {
        setUrl('https://example.com')
        setSource('google')
        setMedium('social')
        setCampaign('summer_sale')
        setContent('themes')
        setTerm('Hello')
        setUtmUrl(
            `https://example.com?utm_source=google&utm_medium=cpc&utm_campaign=summer_sale&utm_term=running+shoes&utm_content=banner_ad`,
        )
    }

    const handleReset = () => {
        setUrl('')
        setSource('')
        setMedium('')
        setCampaign('')
        setContent('')
        setTerm('')
        setUtmUrl('')
    }

    const copyToClipboard = () => {
        toast({
            title: 'Copied to clipboard!',
            variant: 'success',
        })

        navigator.clipboard.writeText(utmUrl).then(() => { })
    }

    return (
        <div className="container my-5 grid items-start gap-6 lg:my-14 xl:grid-cols-2 xl:gap-10">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    generateUTMUrl()
                }}
                className="rounded-2xl border border-border bg-gray-100 px-4 py-5 lg:p-8"
            >
                <div className="space-y-5">
                    <div className="flex flex-col md:flex-row md:items-center md:gap-5">
                        <label className="mb-2.5 block min-w-28 text-sm/[18px] font-medium text-primary md:mb-0">
                            Website URL :
                        </label>
                        <Input
                            type="url"
                            name="url"
                            placeholder="Enter URL"
                            value={url}
                            required
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-5">
                        <label className="mb-2.5 block min-w-28 text-sm/[18px] font-medium text-primary md:mb-0">
                            UTM Source :
                        </label>
                        <Input
                            type="text"
                            name="source"
                            placeholder="Source"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-5">
                        <label className="mb-2.5 block min-w-28 text-sm/[18px] font-medium text-primary md:mb-0">
                            UTM Medium :
                        </label>
                        <Input
                            type="text"
                            name="medium"
                            placeholder="Medium"
                            value={medium}
                            onChange={(e) => setMedium(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-5">
                        <label className="mb-2.5 block min-w-28 text-sm/[18px] font-medium text-primary md:mb-0">
                            UTM Campaign :
                        </label>
                        <Input
                            type="text"
                            name="campaign"
                            placeholder="Campaign"
                            value={campaign}
                            onChange={(e) => setCampaign(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-5">
                        <label className="mb-2.5 block min-w-28 text-sm/[18px] font-medium text-primary md:mb-0">
                            UTM Content :
                        </label>
                        <Input
                            type="text"
                            name="content"
                            placeholder="Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-5">
                        <label className="mb-2.5 block min-w-28 text-sm/[18px] font-medium text-primary md:mb-0">
                            UTM Term :
                        </label>
                        <Input
                            type="text"
                            name="term"
                            placeholder="Term"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-black sm:gap-5">
                    <Button type="submit">Generate UTM URL</Button>
                    <Button
                        type="button"
                        variant={'outline-general'}
                        onClick={handleSample}
                    >
                        Sample
                    </Button>
                    <Button
                        type="button"
                        variant={'outline-shadow'}
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </div>
            </form>
            <div className="rounded-2xl border border-border bg-gray-100 p-4">
                <div className="mb-3 flex flex-wrap items-start justify-between gap-2 md:items-center">
                    <h2 className="text-xl font-semibold text-black">
                        Generate UTM URL:
                    </h2>
                    <Button onClick={copyToClipboard} disabled={!utmUrl}>
                        Copy URL
                    </Button>
                </div>
                <Textarea
                    className="pr-10 text-base/5 focus-visible:ring-0 md:pr-12"
                    value={utmUrl}
                    readOnly
                    rows={6}
                />
                <Button
                    onClick={copyToClipboard}
                    disabled={!utmUrl}
                    variant={'outline-shadow'}
                    className="absolute right-1.5 top-1.5 z-10 px-1.5 py-2 md:p-2.5"
                >
                    <Copy className="size-5 shrink-0" />
                </Button>
            </div>
        </div>
    )
}

export default UTMBuilder
