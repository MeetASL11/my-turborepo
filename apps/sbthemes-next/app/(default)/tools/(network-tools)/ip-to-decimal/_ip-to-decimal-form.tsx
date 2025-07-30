'use client'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import CopyToClipboard from '@/components/ui/copy-to-clipboard'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

const IPToDecimalForm = () => {
    const [value, setValue] = useState('')
    const [result, setResult] = useState<any>(null)

    const getIPAddressType = (ip: string) => {
        const ipv4Regex =
            /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
        const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/

        if (ipv4Regex.test(ip)) {
            return 'IPv4'
        } else if (ipv6Regex.test(ip)) {
            return 'IPv6'
        } else {
            return 'Invalid'
        }
    }

    const getDecimalAddress = () => {
        if (!value) {
            toast({
                title: 'Please enter IP address',
                variant: 'error',
            })
            return
        }
        const type = getIPAddressType(value)

        if (type === 'IPv4') {
            return ipv4ToDecimal(value)
        } else if (type === 'IPv6') {
            return ipv6ToDecimal(value)
        } else {
            toast({
                title: 'Please enter valid IP address',
                variant: 'error',
            })
        }
    }

    const ipv4ToDecimal = (ip: string) => {
        const octets = ip.split('.').map(Number)
        const decimal =
            (octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]
        setResult(decimal.toString())
    }

    const ipv6ToDecimal = (ip: string) => {
        const blocks = ip.split(':').map((block) => block.padStart(4, '0'))
        let decimal = BigInt(0)

        blocks.forEach((block) => {
            decimal = (decimal << BigInt(16)) + BigInt(parseInt(block, 16))
        })

        setResult(decimal.toString())
    }

    return (
        <div className="container my-5 max-w-5xl gap-5 lg:my-14">
            <div className="space-y-3.5 rounded-2xl border border-border bg-gray-100 p-4 md:space-y-4 lg:p-8">
                <form
                    className="space-y-5"
                    onSubmit={(e) => {
                        e.preventDefault()
                        getDecimalAddress()
                    }}
                >
                    <div>
                        <label className="mb-1.5 block text-sm/[18px] font-medium text-primary md:mb-2.5">
                            Enter IPV4/IPV6 address
                        </label>
                        <div className="flex gap-2.5">
                            <Input
                                type="text"
                                value={value}
                                placeholder="Enter IPV4/IPV6 address"
                                onChange={(e) => {
                                    setValue(e.target.value)
                                    setResult(null)
                                }}
                                className="w-full p-2 md:p-3"
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <Button type="submit">Convert</Button>
                    </div>
                </form>
                {!!result && (
                    <div className="flex items-center justify-between gap-4 rounded-md bg-white p-4">
                        <div className="break-all">{result}</div>
                        <CopyToClipboard text={result} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default IPToDecimalForm
