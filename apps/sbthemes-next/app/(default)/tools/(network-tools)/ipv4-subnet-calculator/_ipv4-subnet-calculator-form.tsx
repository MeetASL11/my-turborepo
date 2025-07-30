'use client'

import { useCallback, useEffect, useState } from 'react'
import ip from 'ip'
import { Copy, MoveLeft, MoveRight } from 'lucide-react'

import CopyToClipboard from '@/components/custom/copy-to-clipboard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const SubnetCalculator = () => {
    const [value, setValue] = useState('192.168.0.6/32')
    const [error, setError] = useState('')
    const [results, setResults] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const calculateSubnet = useCallback(() => {
        try {
            const [ipAddress, cidrPrefix] = value.split('/')
            const prefix = parseInt(cidrPrefix || '32', 10)

            if (!ip.isV4Format(ipAddress)) {
                setError('Invalid IP address')
            }

            if (prefix < 0 || prefix > 32) {
                setError('Invalid IP address')
            }

            setLoading(true)
            const subnetMask = ip.subnet(ipAddress, ip.fromPrefixLen(prefix))
            const networkAddress = subnetMask.networkAddress
            const broadcastAddress = subnetMask.broadcastAddress
            const firstAddress = subnetMask.firstAddress
            const lastAddress = subnetMask.lastAddress
            const networkMask = subnetMask.subnetMask
            const networkMaskBinary =
                ip
                    ?.toLong(subnetMask.subnetMask)
                    ?.toString(2)
                    .padStart(32, '0')
                    .match(/.{1,8}/g)
                    ?.join('.') ?? ''
            const wildcardMask = subnetMask.subnetMask
                .split('.')
                .map((octet) => 255 - parseInt(octet))
                .join('.')
            const networkSize = subnetMask.numHosts

            setResults({
                netmask: `${networkAddress}/${prefix}`,
                networkAddress,
                subnetMask: networkMask,
                subnetMaskBinary: networkMaskBinary,
                wildcardMask,
                networkSize,
                firstAddress,
                lastAddress,
                broadcastAddress,
                cidrNotation: `/${prefix}`,
                ipAddressClass: getClass(ipAddress),
            })
        } catch {
            setError('Invalid IP address')
        }
        setLoading(false)
    }, [value])

    const getClass = (ipAddress: string) => {
        const firstOctet = parseInt(ipAddress?.split('.')?.[0])

        if (firstOctet >= 1 && firstOctet <= 126) {
            return 'A'
        } else if (firstOctet >= 128 && firstOctet <= 191) {
            return 'B'
        } else if (firstOctet >= 192 && firstOctet <= 223) {
            return 'C'
        } else if (firstOctet >= 224 && firstOctet <= 239) {
            return 'D (Multicast)'
        } else if (firstOctet >= 240 && firstOctet <= 255) {
            return 'E (Experimental)'
        } else {
            return ''
        }
    }

    const parseIpAndCidr = (input: string) => {
        const [address, cidr] = input.split('/')
        return { address, cidr: cidr || '32' }
    }

    const handleNext = () => {
        const { address, cidr } = parseIpAndCidr(value)
        const nextIp = ip.fromLong(ip.toLong(address) + 1)
        setValue(`${nextIp}/${cidr}`)
    }

    const handlePrev = () => {
        const { address, cidr } = parseIpAndCidr(value)
        const prevIp = ip.fromLong(ip.toLong(address) - 1)
        setValue(`${prevIp}/${cidr}`)
    }

    useEffect(() => {
        calculateSubnet()
    }, [calculateSubnet])

    return (
        <div className="container my-5 max-w-[850px] gap-5 lg:my-14">
            <div className="space-y-3.5 rounded-2xl border border-border bg-gray-100 p-4 md:space-y-4 lg:p-8 xl:grid-cols-2">
                <div>
                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                        IPv4 address
                    </label>
                    <Input
                        placeholder="IPv4 address"
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value)
                            setError('')
                            setResults(null)
                        }}
                    />
                    {!!error && (
                        <div className="text-xs text-danger">{error}</div>
                    )}
                </div>
                {loading ? (
                    <div className="space-y-2">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-7 w-full animate-pulse rounded-xl bg-gray/20"
                            ></div>
                        ))}
                    </div>
                ) : (
                    !!results && (
                        <div className="space-y-5">
                            <div className="bg-white">
                                <div className="grid grid-cols-2 border-b border-border p-3">
                                    <div className="text-black">Netmask</div>
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="break-words">
                                            {results?.netmask || ''}
                                        </div>
                                        <CopyToClipboard
                                            text={results?.netmask}
                                        >
                                            <Copy />
                                        </CopyToClipboard>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 border-b border-border p-3">
                                    <div className="text-black">
                                        Network address
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="break-words">
                                            {results?.networkAddress || ''}
                                        </div>
                                        <CopyToClipboard
                                            text={results?.networkAddress || ''}
                                        >
                                            <Copy />
                                        </CopyToClipboard>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 border-b border-border p-3">
                                    <div className="text-black">
                                        Network mask
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="break-words">
                                            {results?.subnetMask || ''}
                                        </div>
                                        <CopyToClipboard
                                            text={results?.subnetMask || ''}
                                        >
                                            <Copy />
                                        </CopyToClipboard>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 border-b border-border p-3">
                                    <div className="text-black">
                                        Network mask in binary
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="break-words">
                                            {results?.subnetMaskBinary || ''}
                                        </div>
                                        <CopyToClipboard
                                            text={
                                                results?.subnetMaskBinary || ''
                                            }
                                        >
                                            <Copy />
                                        </CopyToClipboard>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 border-b border-border p-3">
                                    <div className="text-black">
                                        CIDR notation
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="break-words">
                                            {results?.cidrNotation || ''}
                                        </div>
                                        <CopyToClipboard
                                            text={results?.cidrNotation || ''}
                                        >
                                            <Copy />
                                        </CopyToClipboard>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 border-b border-border p-3">
                                    <div className="text-black">
                                        Wildcard mask
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="break-words">
                                            {results?.wildcardMask || ''}
                                        </div>
                                        <CopyToClipboard
                                            text={results?.wildcardMask || ''}
                                        >
                                            <Copy />
                                        </CopyToClipboard>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 border-b border-border p-3">
                                    <div className="text-black">
                                        Network size
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="break-words">
                                            {results?.networkSize || ''}
                                        </div>
                                        <CopyToClipboard
                                            text={results?.networkSize || ''}
                                        >
                                            <Copy />
                                        </CopyToClipboard>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 border-b border-border p-3">
                                    <div className="text-black">
                                        First address
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="break-words">
                                            {results?.firstAddress || ''}
                                        </div>
                                        <CopyToClipboard
                                            text={results?.firstAddress || ''}
                                        >
                                            <Copy />
                                        </CopyToClipboard>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 border-b border-border p-3">
                                    <div className="text-black">
                                        Last address
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="break-words">
                                            {results?.lastAddress || ''}
                                        </div>
                                        <CopyToClipboard
                                            text={results?.lastAddress || ''}
                                        >
                                            <Copy />
                                        </CopyToClipboard>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 border-b border-border p-3">
                                    <div className="text-black">
                                        Broadcast address
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="break-words">
                                            {results?.broadcastAddress || ''}
                                        </div>
                                        <CopyToClipboard
                                            text={
                                                results?.broadcastAddress || ''
                                            }
                                        >
                                            <Copy />
                                        </CopyToClipboard>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 p-3">
                                    <div className="text-black">IP class</div>
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="break-words">
                                            {results?.ipAddressClass || ''}
                                        </div>
                                        <CopyToClipboard
                                            text={results?.ipAddressClass || ''}
                                        >
                                            <Copy />
                                        </CopyToClipboard>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-5">
                                <Button
                                    type="button"
                                    onClick={() => handlePrev()}
                                >
                                    <MoveLeft />
                                    Previous
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => handleNext()}
                                >
                                    Next
                                    <MoveRight />
                                </Button>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default SubnetCalculator
