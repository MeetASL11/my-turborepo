'use client'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

const AMPValidatorForm = () => {
    const [urls, setUrls] = useState('')
    const [results, setResults] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [visibleErrors, setVisibleErrors] = useState<any>({})

    const toggleErrors = (index: number) => {
        setVisibleErrors((prev: any) => ({
            ...prev,
            [index]: !prev[index],
        }))
    }

    const checkAMPValidation = async () => {
        setLoading(true)
        setResults(null)

        const urlList = urls
            .split('\n')
            .map((url) => url.trim())
            .filter(Boolean)

        try {
            const response = await fetch(`/api/amp-validator`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ urls: urlList }),
            })

            const data = await response.json()

            setResults(data)
        } catch (err) {
            console.error(err)
        }
        setLoading(false)
    }

    const handleChange = (e: any) => {
        const input = e.target.value
        const urlArray = input.split(/\s+/).filter((url: any) => url.length > 0)

        setUrls(input)

        if (urlArray.length > 10) {
            return toast({
                description: 'You can only enter up to 10 URLs',
                variant: 'error',
            })
        }
    }

    return (
        <div className="container my-5 gap-5 lg:my-14 xl:max-w-7xl">
            <div className="space-y-3.5 rounded-2xl border border-border bg-gray-100 p-4 md:space-y-4 lg:p-8 xl:grid-cols-2">
                <Textarea
                    placeholder="Enter you URLs here..."
                    value={urls}
                    onChange={(e) => handleChange(e)}
                />
                <div className="text-center">
                    {!results && (
                        <Button
                            type="button"
                            loading={loading}
                            onClick={(e) => {
                                e.preventDefault()
                                checkAMPValidation()
                            }}
                            disabled={
                                !urls ||
                                urls
                                    ?.split(/\s+/)
                                    ?.filter((url: any) => url.length > 0)
                                    .length > 10
                            }
                        >
                            Check
                        </Button>
                    )}
                    {!!results && (
                        <Button
                            type="button"
                            disabled={loading}
                            onClick={(e) => {
                                e.preventDefault()
                                setResults(null)
                                setVisibleErrors({})
                            }}
                        >
                            Check again
                        </Button>
                    )}
                </div>
                <div className="space-y-3.5 md:space-y-4">
                    {!!results?.length &&
                        results.map((error: any, i: number) => (
                            <div key={i}>
                                <div className="mb-3 flex items-center justify-between gap-4">
                                    <div className="mb-3 text-wrap text-base font-bold text-black md:text-lg">
                                        {error?.url}
                                    </div>
                                    {error?.status === 'ERROR' && (
                                        <div className="font-bold text-danger">
                                            Page not found
                                        </div>
                                    )}
                                    {!!error?.errors?.length &&
                                        error?.status !== 'ERROR' && (
                                            <Button
                                                type="button"
                                                variant="outline-general"
                                                onClick={() => toggleErrors(i)}
                                            >
                                                Show errors
                                            </Button>
                                        )}
                                </div>
                                {error?.status !== 'ERROR' &&
                                    !!error?.errors?.length &&
                                    visibleErrors[i] &&
                                    error?.errors?.map((e: any, i: number) => (
                                        <div
                                            key={i}
                                            className="mb-3 flex gap-3"
                                        >
                                            <div>{i + 1}.</div>
                                            <div className="space-y-2">
                                                {!!e?.code && (
                                                    <div className="text-wrap text-black">
                                                        {e?.code}
                                                    </div>
                                                )}
                                                {!!e?.message && (
                                                    <div className="text-wrap text-black">
                                                        {e?.message}
                                                    </div>
                                                )}
                                                {!!e?.specUrl && (
                                                    <div className="text-wrap">
                                                        {e?.specUrl}
                                                    </div>
                                                )}
                                                {(!!e?.line || !!e?.col) && (
                                                    <div className="space-x-3">
                                                        {!!e?.line && (
                                                            <span>
                                                                Line: {e?.line}
                                                            </span>
                                                        )}
                                                        {!!e?.col && (
                                                            <span>
                                                                Column: {e?.col}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default AMPValidatorForm
