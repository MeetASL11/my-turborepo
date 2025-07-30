'use client'

import React, { useEffect, useState } from 'react'
import { CopyIcon } from 'lucide-react'

import CopyToClipboard from '@/components/custom/copy-to-clipboard'
import { Input } from '@/components/ui/input'

const IPV6UlaGeneratorForm = () => {
    const [value, setValue] = useState('20:37:06:12:34:56')
    const [error, setError] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const generateIPv6ULA = async (macAddress: string) => {
        setLoading(true)
        const timestamp = Date.now()

        const input = `${timestamp}-${macAddress}`

        const encoder = new TextEncoder()
        const data = encoder.encode(input)
        const hashBuffer = await crypto.subtle.digest('SHA-1', data)

        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashHex = hashArray
            .map((byte) => byte.toString(16).padStart(2, '0'))
            .join('')

        const lower40Bits = hashHex.slice(-10)

        const prefixBase = `fd${lower40Bits.slice(0, 2)}:${lower40Bits.slice(2, 6)}:${lower40Bits.slice(6)}::/48`

        const firstRoutableBlock = `${prefixBase.slice(0, -4)}0::/64`
        const lastRoutableBlock = `${prefixBase.slice(0, -4)}ffff::/64`
        return {
            ulaPrefix: prefixBase,
            firstRoutableBlock,
            lastRoutableBlock,
        }
    }

    const validateMacAddressStrict = (macAddress: string) => {
        const macRegex =
            /^([0-9A-Fa-f]{2}(:[0-9A-Fa-f]{2}){5}|[0-9A-Fa-f]{2}(-[0-9A-Fa-f]{2}){5})$/
        return macRegex.test(macAddress)
    }

    useEffect(() => {
        const fetchIPv6ULA = async () => {
            if (!validateMacAddressStrict(value)) {
                setError(true)
                setResult(null)
                return
            }

            setError(false)
            const data = await generateIPv6ULA(value)
            setResult(data)
            setLoading(false)
        }

        fetchIPv6ULA()
    }, [value])

    return (
        <div className="container my-5 gap-5 lg:my-14 xl:max-w-7xl">
            <div className="space-y-3.5 rounded-2xl border border-border bg-gray-100 p-4 md:space-y-4 lg:p-8">
                <Input
                    name="mac_address"
                    placeholder="Enter MAC address"
                    value={value}
                    onChange={(e) => setValue(e.target.value.trim())}
                    disabled={loading}
                />
                {error && (
                    <div className="!mt-1 text-xs text-danger">
                        Invalid mac address
                    </div>
                )}
                {!!result && !loading && (
                    <div className="space-y-3 pt-5">
                        <div className="flex gap-3">
                            <div className="min-w-40 whitespace-nowrap font-normal text-black">
                                IPv6 ULA:
                            </div>
                            <div className="w-full rounded-lg bg-white px-4 py-2 shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]">
                                {result?.ulaPrefix}
                            </div>
                            <CopyToClipboard text={result?.ulaPrefix}>
                                <CopyIcon />
                            </CopyToClipboard>
                        </div>
                        <div className="flex gap-3">
                            <div className="min-w-40 whitespace-nowrap font-normal text-black">
                                First routable block:
                            </div>
                            <div className="w-full rounded-lg bg-white px-4 py-2 shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]">
                                {result?.firstRoutableBlock}
                            </div>
                            <CopyToClipboard text={result?.firstRoutableBlock}>
                                <CopyIcon />
                            </CopyToClipboard>
                        </div>
                        <div className="flex gap-3">
                            <div className="min-w-40 whitespace-nowrap font-normal text-black">
                                Last routable block:
                            </div>
                            <div className="w-full rounded-lg bg-white px-4 py-2 shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]">
                                {result?.lastRoutableBlock}
                            </div>
                            <CopyToClipboard text={result?.lastRoutableBlock}>
                                <CopyIcon />
                            </CopyToClipboard>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default IPV6UlaGeneratorForm
