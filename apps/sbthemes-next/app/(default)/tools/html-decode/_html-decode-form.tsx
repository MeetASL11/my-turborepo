'use client'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function HTMLDecodeForm() {
    const [data, setData] = useState({
        input: '',
        decodedOutput: '',
    })

    const handleInputChange = (e: any) => {
        const inputValue = e.target.value
        setData((prevState) => ({
            ...prevState,
            input: inputValue,
            decodedOutput: decodeHtml(inputValue),
        }))
    }

    const decodeHtml = (html: any) => {
        const parser = new DOMParser()
        const decodedString = parser.parseFromString(html, 'text/html').body
            .innerText
        return decodedString
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(data.decodedOutput)
    }

    return (
        <div className="container my-5 grid xl:grid-cols-2 gap-8 xl:gap-10 lg:my-14">
            <div className="rounded-xl bg-gray-100 px-4 py-5 ring-1 ring-border">
                <h2 className="mb-5 text-xl font-semibold text-black">
                    String to decode
                </h2>
                <Textarea
                    placeholder="Enter your HTML encoded string"
                    rows={10}
                    value={data.input}
                    onChange={handleInputChange}
                />
            </div>
            <div className="rounded-xl bg-gray-100 px-4 py-5 ring-1 ring-border">
                <div>
                    <div className="relative mb-5 flex flex-wrap items-start justify-between gap-2 md:items-center pr-20">
                        <h2 className="text-xl font-semibold text-black">
                           Decoded (HTML)
                        </h2>
                        <Button
                            type="button"
                            onClick={handleCopy}
                            disabled={!data.decodedOutput}
                            className="absolute -top-2 right-0"
                        >
                            Copy
                        </Button>
                    </div>
                    <Textarea
                        placeholder="Decoded output"
                        className="focus-visible:ring-0"
                        rows={10}
                        value={data.decodedOutput}
                        readOnly
                    />
                </div>
            </div>
        </div>
    )
}
