'use client'

import { useState } from 'react'

import CopyToClipboard from '@/components/ui/copy-to-clipboard'
import { Input } from '@/components/ui/input'

const fetchURLData = (newUrl: string) => {
    if (newUrl) {
        const parsed = new URL(newUrl)
        const domainParts = parsed.hostname.split('.')

        let subdomain = ''

        if (domainParts.length > 2) {
            subdomain = domainParts.slice(0, domainParts.length - 2).join('.')
        }

        const params = parsed.search.substring(1).split('&')
        const paramsArray = params.map((param: string) => {
            const [key, value] = param.split('=')
            return { key, value }
        })

        return {
            protocol: parsed.protocol.slice(0, -1),
            tld:
                domainParts.length > 1
                    ? domainParts[domainParts.length - 1]
                    : '',
            username: parsed.username,
            password: parsed.password,
            hostname: parsed.hostname,
            port: parsed.port,
            path: parsed.pathname,
            params: {
                value: parsed.search,
                children: paramsArray,
            },
            hash: parsed.hash,
            domain: parsed.hostname,
            subdomain,
        }
    } else {
        return null
    }
}

function URLParserForm() {
    const defaultURL =
        'https://test:test2@api.sbthemes.com:3000/data?id=42&status=active#info'
    const [url, setUrl] = useState(defaultURL)
    const [parsedUrl, setParsedUrl] = useState<{
        protocol: string
        tld: string
        username: string
        password: string
        hostname: string
        port: string
        path: string
        params: { value: string; children: { key: string; value: string }[] }
        hash: string
        domain: string
        subdomain: string
    }>(
        fetchURLData(defaultURL) || {
            protocol: '',
            tld: '',
            username: '',
            password: '',
            hostname: '',
            port: '',
            path: '',
            params: {
                value: '',
                children: [],
            },
            hash: '',
            domain: '',
            subdomain: '',
        },
    )

    const handleChange = (newUrl: string) => {
        setUrl(newUrl)
        try {
            const data = fetchURLData(newUrl)
            if (data) {
                setParsedUrl(data)
            } else {
                resetParsedUrl()
            }
        } catch (error) {
            resetParsedUrl()
        }
    }

    const resetParsedUrl = () => {
        setParsedUrl({
            protocol: '',
            username: '',
            password: '',
            hostname: '',
            port: '',
            path: '',
            params: {
                value: '',
                children: [],
            },
            hash: '',
            domain: '',
            tld: '',
            subdomain: '',
        })
    }

    return (
        <div className="container my-5 gap-10 space-y-6 px-4 lg:my-14 lg:max-w-6xl lg:space-y-10 xl:grid xl:items-start xl:space-y-0">
            <div className="space-y-3 rounded-xl bg-gray-100 px-4 py-5 ring-1 ring-border">
                <h2 className="text-xl font-semibold text-black">Enter URL</h2>
                <Input
                    type="text"
                    placeholder="Enter a URL"
                    value={url}
                    onChange={(e) => handleChange(e.target.value)}
                />
            </div>
            <div className="space-y-3 rounded-xl bg-gray-100 px-4 py-5 ring-1 ring-border">
                <h3 className="mb-4 text-xl font-semibold text-black">
                    Parsed URL Parts:
                </h3>
                <div className="grid gap-3 sm:gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-sm/[18px] font-medium capitalize text-primary md:mb-2.5">
                            Protocol
                        </label>
                        <div className="flex gap-2.5">
                            <Input
                                type="text"
                                value={parsedUrl.protocol}
                                readOnly
                                className="w-full p-2 md:p-3"
                            />
                            <CopyToClipboard
                                text={parsedUrl.protocol}
                                tooltipContent="Copy parts"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm/[18px] font-medium capitalize text-primary md:mb-2.5">
                            Tld
                        </label>
                        <div className="flex gap-2.5">
                            <Input
                                type="text"
                                value={parsedUrl.tld}
                                readOnly
                                className="w-full p-2 md:p-3"
                            />
                            <CopyToClipboard text={parsedUrl.tld} />
                        </div>
                    </div>
                </div>
                <div className="grid gap-3 sm:gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-sm/[18px] font-medium capitalize text-primary md:mb-2.5">
                            Username
                        </label>
                        <div className="flex gap-2.5">
                            <Input
                                type="text"
                                value={parsedUrl.username}
                                readOnly
                                className="w-full p-2 md:p-3"
                            />
                            <CopyToClipboard text={parsedUrl.username} />
                        </div>
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm/[18px] font-medium capitalize text-primary md:mb-2.5">
                            Password
                        </label>
                        <div className="flex gap-2.5">
                            <Input
                                type="text"
                                value={parsedUrl.password}
                                readOnly
                                className="w-full p-2 md:p-3"
                            />
                            <CopyToClipboard text={parsedUrl.password} />
                        </div>
                    </div>
                </div>
                <div className="grid gap-3 sm:gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-sm/[18px] font-medium capitalize text-primary md:mb-2.5">
                            Hostname
                        </label>
                        <div className="flex gap-2.5">
                            <Input
                                type="text"
                                value={parsedUrl.hostname}
                                readOnly
                                className="w-full p-2 md:p-3"
                            />
                            <CopyToClipboard text={parsedUrl.hostname} />
                        </div>
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm/[18px] font-medium capitalize text-primary md:mb-2.5">
                            Port
                        </label>
                        <div className="flex gap-2.5">
                            <Input
                                type="text"
                                value={parsedUrl.port}
                                readOnly
                                className="w-full p-2 md:p-3"
                            />
                            <CopyToClipboard text={parsedUrl.port} />
                        </div>
                    </div>
                </div>
                <div className="grid gap-3 sm:gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-sm/[18px] font-medium capitalize text-primary md:mb-2.5">
                            Path
                        </label>
                        <div className="flex gap-2.5">
                            <Input
                                type="text"
                                value={parsedUrl.path}
                                readOnly
                                className="w-full p-2 md:p-3"
                            />
                            <CopyToClipboard text={parsedUrl.path} />
                        </div>
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm/[18px] font-medium capitalize text-primary md:mb-2.5">
                            Hash
                        </label>
                        <div className="flex gap-2.5">
                            <Input
                                type="text"
                                value={parsedUrl.hash}
                                readOnly
                                className="w-full p-2 md:p-3"
                            />
                            <CopyToClipboard text={parsedUrl.hash} />
                        </div>
                    </div>
                </div>
                <div className="grid gap-3 sm:gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-sm/[18px] font-medium capitalize text-primary md:mb-2.5">
                            Domain
                        </label>
                        <div className="flex gap-2.5">
                            <Input
                                type="text"
                                value={parsedUrl.domain}
                                readOnly
                                className="w-full p-2 md:p-3"
                            />
                            <CopyToClipboard text={parsedUrl.domain} />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm/[18px] font-medium capitalize text-primary md:mb-2.5">
                            Subdomain
                        </label>
                        <div className="flex gap-2.5">
                            <Input
                                type="text"
                                value={parsedUrl.subdomain}
                                readOnly
                                className="w-full p-2 md:p-3"
                            />
                            <CopyToClipboard text={parsedUrl.subdomain} />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="mb-1.5 block text-sm/[18px] font-medium capitalize text-primary md:mb-2.5">
                        Params:
                    </label>{' '}
                    <div className="flex gap-2.5">
                        <Input
                            type="text"
                            value={parsedUrl.params.value}
                            readOnly
                            className="w-full p-2 md:p-3"
                        />
                        <CopyToClipboard text={parsedUrl.params.value} />
                    </div>
                    {!!parsedUrl.params.children.length && (
                        <div className="ml-4 space-y-3 sm:space-y-2.5">
                            <label className="mt-3.5 block min-w-28 text-sm/[18px] font-medium capitalize text-black sm:my-2.5">
                                Params string:
                            </label>
                            {parsedUrl.params.children.map((param, idx) => (
                                <div
                                    className="grid items-center gap-1.5 sm:grid-cols-2 sm:gap-5"
                                    key={`${param.key}-${idx}`}
                                >
                                    <div className="flex gap-2.5">
                                        <Input
                                            type="text"
                                            value={param.key}
                                            readOnly
                                            className="w-full p-2 md:p-3"
                                        />
                                        <CopyToClipboard text={param.key} />
                                    </div>
                                    <div className="flex gap-2.5">
                                        <Input
                                            type="text"
                                            value={param.value}
                                            readOnly
                                            className="w-full p-2 md:p-3"
                                        />
                                        <CopyToClipboard text={param.value} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default URLParserForm
