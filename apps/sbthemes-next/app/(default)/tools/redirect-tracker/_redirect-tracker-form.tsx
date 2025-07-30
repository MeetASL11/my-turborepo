'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import CopyToClipboard from '@/components/ui/copy-to-clipboard'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export type IForm = {
    url: string
}

const defaultValue: IForm = {
    url: '',
}

const RedirectTrackerForm = () => {
    const [response, setResponse] = useState<any>(null)
    const [urlError, setUrlError] = useState('')

    const {
        register,
        watch,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<IForm>({
        defaultValues: defaultValue,
    })

    const getUrl = async (data: IForm) => {
        setUrlError('')
        setResponse(null)
        try {
            const response = await fetch(
                `/api/get-redirect?url=${encodeURIComponent(data.url)}`,
            )

            const r = await response.json()

            setResponse(r)
        } catch (err: any) {
            setUrlError('Error while fetching URL')
        }
    }

    const getFormattedUrl = (response: any) => {
        if (!response || !response.location || response.status === 200) {
            return watch('url')
        }

        const { location, redirectHostName } = response

        return location.startsWith('https://') || location.startsWith('http://')
            ? location
            : `https://${redirectHostName}${location}`
    }

    const getColor = (status: number) => {
        switch (status) {
            case 200:
                return 'text-green-500'
            case 301:
                return 'text-black'
            case 302:
                return 'text-warning'
            case 307:
                return 'text-warning'
            case 308:
                return 'text-black'
            default:
                return 'text-black'
        }
    }

    return (
        <div className="container my-5 lg:my-14 xl:max-w-7xl">
            <div className="rounded-2xl border border-border bg-gray-100 p-4 lg:p-8 xl:col-span-2">
                <form onSubmit={handleSubmit(getUrl)}>
                    <div className="mb-4">
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            URL
                        </label>
                        <Input
                            {...register('url')}
                            placeholder="Enter the URL here..."
                        />
                    </div>

                    <div className="text-center">
                        <Button
                            type="submit"
                            disabled={!watch('url')}
                            loading={isSubmitting}
                        >
                            Track URL
                        </Button>
                    </div>
                </form>
                {!!response && !!watch('url') && (
                    <>
                        <div
                            className={cn(
                                'font-md mt-3 flex items-center justify-between space-x-2 text-black',
                                getColor(response?.status),
                            )}
                        >
                            <span className="font-bold">
                                HTTP status code: {response?.status}
                            </span>
                            <span>{response?.statusText || ''}</span>
                        </div>
                        <div className="mt-4 flex items-center gap-4">
                            <div
                                className={cn(
                                    'w-full rounded-xl bg-white px-4 py-3 text-sm/[18px] font-medium text-primary shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]',
                                )}
                            >
                                <Link
                                    href={getFormattedUrl(response)}
                                    className="break-words hover:text-secondary"
                                    target="_blank"
                                >
                                    {getFormattedUrl(response)}
                                </Link>
                            </div>
                            <CopyToClipboard
                                text={getFormattedUrl(response)}
                                tooltipContent="Copy URL"
                            />
                        </div>
                    </>
                )}

                {!!urlError && !!watch('url') && (
                    <div className="my-3 text-danger">
                        Invalid URL ({urlError})
                    </div>
                )}
            </div>
        </div>
    )
}

export default RedirectTrackerForm
