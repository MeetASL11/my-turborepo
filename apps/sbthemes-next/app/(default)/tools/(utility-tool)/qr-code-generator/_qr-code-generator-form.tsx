'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { LoaderCircle } from 'lucide-react'
import QRCode from 'qrcode'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const QRCodeGeneratorForm = () => {
    const [url, setUrl] = useState<string>('')
    const [qrCodeSrc, setQrCodeSrc] = useState('')
    const [loading, setLoading] = useState(false)

    const generateQRCode = useCallback(async () => {
        if (!url) setQrCodeSrc('')
        setLoading(true)
        try {
            const qrCodeDataUrl = await QRCode.toDataURL(url || 'sd')
            setQrCodeSrc(qrCodeDataUrl)
        } catch {
            setQrCodeSrc('')
        }
        setLoading(false)
    }, [url])

    useEffect(() => {
        generateQRCode()
    }, [generateQRCode])

    const downloadQRCode = () => {
        if (!qrCodeSrc || !url) return

        const link = document.createElement('a')
        link.href = qrCodeSrc
        link.download = 'qrcode.png'
        link.click()
    }

    return (
        <div className="container my-5 gap-5 lg:my-14 xl:max-w-7xl">
            <div className="space-y-3.5 rounded-2xl border border-border bg-gray-100 p-4 md:space-y-4 lg:p-8 xl:grid-cols-2">
                <div className="flex flex-wrap items-end justify-center gap-2.5 sm:flex-nowrap">
                    <div className="w-full">
                        <label className="mb-1.5 block text-sm/[18px] font-medium text-primary md:mb-2.5">
                            URL or text
                        </label>
                        <Input
                            type="text"
                            placeholder="Enter URL or text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <div>
                        <Button type="button" onClick={() => setUrl('')}>
                            Reset
                        </Button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex h-14 w-full items-center justify-center">
                        <LoaderCircle className="animate-spin" />
                    </div>
                ) : (
                    !!qrCodeSrc &&
                    !loading && (
                        <div className="flex flex-col items-center justify-center gap-5 pt-3">
                            <Image
                                src={qrCodeSrc}
                                alt="Generated QR Code"
                                width={100}
                                height={100}
                                className={cn('size-56 lg:size-80', {
                                    'opacity-65': !url,
                                })}
                            />
                            <Button
                                type="button"
                                onClick={() => downloadQRCode()}
                                disabled={!url}
                            >
                                Download QR code
                            </Button>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default QRCodeGeneratorForm
