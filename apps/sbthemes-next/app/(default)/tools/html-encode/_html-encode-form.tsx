'use client'

import { useState } from 'react'
import he from 'he'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

const HTMLEncoderForm = () => {
    const [data, setData] = useState({
        inputText: '',
        encodedText: '',
    })

    // Function to encode all HTML entities
    const encodeHtml = (text: any) => {
        return he.encode(text, {
            useNamedReferences: true,
        })
    }

    const handleInputChange = (e: any) => {
        const input = e.target.value
        setData({
            inputText: input,
            encodedText: encodeHtml(input),
        })
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(data.encodedText)
        toast({ title: 'Copied to clipboard!', variant: 'success' })
    }

    return (
        <div className="container my-5 grid xl:grid-cols-2 gap-8 xl:gap-10 lg:my-14">
            <div className="rounded-xl bg-gray-100 px-4 py-5 ring-1 ring-border">
                <h2 className="mb-5 text-xl font-semibold text-black">
                    String to Encode
                </h2>
                <Textarea
                    placeholder="Enter your HTML Encoded string"
                    rows={10}
                    value={data.inputText}
                    onChange={handleInputChange}
                />
            </div>
            <div className="rounded-xl bg-gray-100 px-4 py-5 ring-1 ring-border">
                <div>
                    <div className="relative mb-5 flex flex-wrap items-start justify-between gap-2 md:items-center pr-20">
                        <h2 className="text-xl font-semibold text-black">
                            Encoded (HTML)
                        </h2>
                        <Button
                            type="button"
                            onClick={handleCopy}
                            disabled={!data.encodedText}
                            className="absolute -top-2 right-0"
                        >
                            Copy
                        </Button>
                    </div>
                    <Textarea
                        placeholder="Encoded output"
                        className="focus-visible:ring-0"
                        rows={10}
                        value={data.encodedText}
                        readOnly
                    />
                </div>
            </div>
        </div>
    )
}

export default HTMLEncoderForm
