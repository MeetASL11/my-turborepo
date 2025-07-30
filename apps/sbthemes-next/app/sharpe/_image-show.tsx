'use client'
import Image from 'next/image'
import { DownloadIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function ImageShow({
    imgData,
    hideDownload = false,
    className = '',
    searchQueryValue,
}: any) {
    const slugify = (str: string) => {
        str = str.replace(/^\s+|\s+$/g, '')
        str = str.toLowerCase()
        str = str
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
        return str
    }
    const downloadImage = () => {
        const link = document.createElement('a')
        link.href = 'data:image;base64,' + imgData.src
        link.download = `${slugify(searchQueryValue.text || 'download')}-image.jpg`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
    return (
        <div className={className}>
            <div className="relative">
                {!hideDownload && (
                    <Button
                        className="absolute right-2 top-2 hover:bg-black hover:text-white hover:opacity-70"
                        onClick={downloadImage}
                    >
                        <DownloadIcon />
                    </Button>
                )}
                <Image
                    src={'data:image;base64,' + imgData.src}
                    alt="test"
                    width={700}
                    height={400}
                    className="h-full w-full object-cover"
                />
                <p className="mt-2 w-full text-center text-sm">
                    {imgData.fileName}
                </p>
            </div>
        </div>
    )
}
