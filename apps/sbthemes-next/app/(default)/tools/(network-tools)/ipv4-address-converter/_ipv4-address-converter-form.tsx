'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Copy } from 'lucide-react'
import net from 'net'

import CopyToClipboard from '@/components/ui/copy-to-clipboard'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

const IPv4AddressConverterForm = () => {
    const [ip, setIp] = useState('49.36.91.255')
    const [result, setResult] = useState<any>(null)

    const convertToIPv4Address = (ipv4: string) => {
        const decimal = ipv4
            .split('.')
            .reduce((acc, octet) => (acc << 8) + parseInt(octet), 0)

        const hex = decimal.toString(16).toUpperCase().padStart(8, '0')

        const binary = decimal.toString(2).padStart(32, '0')

        // const ipv6 = `::ffff:${(parseInt(ipv4.split('.')[0]) << 8) | parseInt(ipv4.split('.')[1])}:${(parseInt(ipv4.split('.')[2]) << 8) | parseInt(ipv4.split('.')[3])}`

        const toShorthandIPv6 = (fullIPv6: any) => {
            let blocks = fullIPv6
                .split(':')
                .map((block: any) => block.replace(/^0+/, '') || '0')

            const zeroSeqLength = blocks
                .join(':')
                .split(':')
                .filter((block: any) => block === '0').length
            let shorthand = blocks.join(':')

            if (zeroSeqLength > 1) {
                shorthand = shorthand.replace(/(^|:)0(:0)+(:|$)/, '::')
            }

            return shorthand
        }

        const ipv6 = `0000:0000:0000:0000:0000:ffff:${hex.slice(0, 4)}:${hex.slice(4)}`

        const shorthandIPv6 = toShorthandIPv6(ipv6)

        setResult({
            decimal,
            hex,
            binary,
            ipv6,
            shorthandIPv6,
        })
    }

    useEffect(() => {
        const checkAndConvert = async () => {
            try {
                const { data } = await axios.get(`/api/is-ipv4?ip=${ip}`)
                if (!!data?.isIPv4) return convertToIPv4Address('49.36.91.255')
                setResult(null)
            } catch (error) {
                toast({
                    title: 'Invalid IP address',
                    variant: 'error',
                })
                setResult(null)
            }
        }

        checkAndConvert()
    }, [ip])

    return (
        <div className="container my-5 gap-5 lg:my-14 xl:max-w-7xl">
            <div className="space-y-3.5 rounded-2xl border border-border bg-gray-100 p-4 md:space-y-4 lg:p-8 xl:grid-cols-2">
                <div>
                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                        IPv4 address
                    </label>
                    <Input
                        placeholder="IPv4 address"
                        value={ip}
                        onChange={(e) => setIp(e.target.value)}
                    />
                </div>

                <div className="border-b border-black/30"></div>

                <div className="flex flex-wrap items-center gap-0 md:flex-nowrap md:gap-5">
                    <label className="mb-2.5 block min-w-24 text-sm/[18px] font-medium text-primary">
                        Decimal
                    </label>
                    <div className="flex w-full items-center gap-2.5 lg:gap-5">
                        <Input
                            placeholder="Enter valid IPv4 address"
                            value={result?.decimal || ''}
                            onChange={(e) => setIp(e.target.value)}
                            className="flex-1"
                        />
                        <CopyToClipboard text={result?.decimal || ''} />
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-0 md:flex-nowrap md:gap-5">
                    <label className="mb-2.5 block min-w-24 text-sm/[18px] font-medium text-primary">
                        Hexadecimal
                    </label>
                    <div className="flex w-full items-center gap-2.5 lg:gap-5">
                        <Input
                            placeholder="Enter valid IPv4 address"
                            value={result?.hex || ''}
                            onChange={(e) => setIp(e.target.value)}
                            className="flex-1"
                        />
                        <CopyToClipboard text={result?.hex || ''} />
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-0 md:flex-nowrap md:gap-5">
                    <label className="mb-2.5 block min-w-24 text-sm/[18px] font-medium text-primary">
                        Binary
                    </label>
                    <div className="flex w-full items-center gap-2.5 lg:gap-5">
                        <Input
                            placeholder="Enter valid IPv4 address"
                            value={result?.binary || ''}
                            onChange={(e) => setIp(e.target.value)}
                            className="flex-1"
                        />
                        <CopyToClipboard text={result?.binary || ''} />
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-0 md:flex-nowrap md:gap-5">
                    <label className="mb-2.5 block min-w-24 text-sm/[18px] font-medium text-primary">
                        IPv6
                    </label>
                    <div className="flex w-full items-center gap-2.5 lg:gap-5">
                        <Input
                            placeholder="Enter valid IPv4 address"
                            value={result?.ipv6 || ''}
                            onChange={(e) => setIp(e.target.value)}
                            className="flex-1"
                        />
                        <CopyToClipboard text={result?.ipv6 || ''} />
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-0 md:flex-nowrap md:gap-5">
                    <label className="mb-2.5 block min-w-24 text-sm/[18px] font-medium text-primary">
                        Ipv6 (short)
                    </label>
                    <div className="flex w-full items-center gap-2.5 lg:gap-5">
                        <Input
                            placeholder="Enter valid IPv4 address"
                            value={result?.shorthandIPv6 || ''}
                            onChange={(e) => setIp(e.target.value)}
                            className="flex-1"
                        />
                        <CopyToClipboard text={result?.shorthandIPv6 || ''} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IPv4AddressConverterForm
