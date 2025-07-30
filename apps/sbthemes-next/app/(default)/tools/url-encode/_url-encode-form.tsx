'use client'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

export default function URLEncodeForm() {
    const [urlData, setUrlData] = useState({ input: '', output: '' })

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        const encodedValue = encodeURIComponent(value)

        setUrlData({
            input: value,
            output: encodedValue,
        })
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(urlData.output)
        toast({ title: 'Copied to clipboard!', variant: 'success' })
    }

    return (
        <div className="container my-5 w-full lg:my-14 lg:max-w-5xl">
            <div className="space-y-4 rounded-xl bg-gray-100 px-4 py-5 ring-1 ring-border">
                <div>
                    <label className="mb-2.5 block text-sm/[18px] font-medium">
                        String to encode
                    </label>
                    <Textarea
                        placeholder="Enter your URL to encode"
                        rows={2}
                        value={urlData.input}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label className="mb-2.5 block text-sm/[18px] font-medium">
                        Encoded (URL)
                    </label>
                    <Textarea
                        placeholder="Encoded output"
                        className="focus-visible:ring-0"
                        rows={4}
                        value={urlData.output}
                        readOnly
                    />
                </div>
                <div className="text-center">
                    <Button type="button" onClick={handleCopy} disabled={!urlData.output}>
                        Copy
                    </Button>
                </div>
            </div>
        </div>
    )
}
