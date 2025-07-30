'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { Copy, LoaderCircle, SquareX } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

const CNAMECheckerForm = () => {
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const cnameCheck = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`/api/cname-checker?url=${value}`)
            setResult(data)
        } catch (err) {
            setResult(null)
        }
        setLoading(false)
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return `${minutes}m  ${seconds ? seconds + 's' : ''}`
    }

    const copyToClipboard = (text: string) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                toast({
                    title: 'Copied to clipboard!',
                    variant: 'success',
                })
            })
        }
    }

    return (
        <div className="container my-5 gap-5 lg:my-14 xl:max-w-7xl">
            <div className="space-y-3.5 rounded-2xl border border-border bg-gray-100 p-4 md:space-y-4 lg:p-8 xl:grid-cols-2">
                <form
                    className="space-y-5"
                    onSubmit={(e) => {
                        e.preventDefault()
                        cnameCheck()
                    }}
                >
                    <div>
                        <label className="mb-1.5 block text-sm/[18px] font-medium text-primary md:mb-2.5">
                            Enter URL or domain
                        </label>
                        <div className="flex gap-2.5">
                            <Input
                                type="text"
                                value={value}
                                onChange={(e) => {
                                    setValue(e.target.value)
                                    setResult(null)
                                }}
                                placeholder="Enter url or domain"
                                className="w-full p-2 md:p-3"
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <Button
                            type="submit"
                            loading={loading}
                            disabled={!value}
                        >
                            Check
                        </Button>
                    </div>
                </form>
                {loading ? (
                    <div className="flex h-10 justify-center">
                        <LoaderCircle className="mt-4 size-4 animate-spin" />
                    </div>
                ) : (
                    !!result &&
                    !loading && (
                        <div className="rounded-lg bg-white">
                            <div className="flex border-b border-border px-3 py-4">
                                <div className="w-[30%]">Domain name</div>
                                <div className="w-[70%]">
                                    {result?.domain || '-'}
                                </div>
                            </div>
                            <div className="flex border-b border-border px-3 py-4">
                                <div className="w-[30%]">Points to</div>
                                <div className="flex w-[70%] items-center gap-2">
                                    <span>{result?.canonicalName || '-'}</span>
                                    {!!result?.canonicalName && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                copyToClipboard(
                                                    result?.canonicalName,
                                                )
                                            }
                                        >
                                            <Copy className={cn('size-4')} />
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="flex border-b border-border px-3 py-4">
                                <div className="w-[30%]">Time to live(TTL)</div>
                                <div className="w-[70%]">
                                    {!!result?.ttl?.ttl
                                        ? formatTime(result?.ttl?.ttl)
                                        : '-'}
                                </div>
                            </div>
                            <div className="flex border-b border-border px-3 py-4">
                                <div className="w-[30%]">Test</div>
                                <div className="flex w-[70%] items-center gap-2">
                                    <span>
                                        <SquareX
                                            className={cn(
                                                {
                                                    'fill-danger text-white':
                                                        !result?.result?.result,
                                                },
                                                {
                                                    'fill-success text-white':
                                                        result?.result?.result,
                                                },
                                            )}
                                        />
                                    </span>
                                    <span>{result?.result?.key || '-'}</span>
                                </div>
                            </div>
                            <div className="flex px-3 py-4">
                                <div className="w-[30%]">Result</div>
                                <div className="w-[70%]">
                                    {result?.result?.description || '-'}
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default CNAMECheckerForm
