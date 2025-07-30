'use client'

import React, { useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

const MAcAddressGeneratorForm = () => {
    const [quantity, setQuantity] = useState(1)
    const [textCase, setTextCase] = useState('u')
    const [separator, setSeparator] = useState(':')
    const [prefix, setPrefix] = useState('65:7a:6b')
    const [error, setError] = useState('')
    const [macAddresses, setMacAddresses] = useState<string[]>([])

    const isValidMacPrefix = (prefix: string) => {
        const separatorPattern = /[\.\-:]/g
        const hexOnly = prefix.replace(separatorPattern, '').toUpperCase()

        return (
            /^[0-9A-F]+$/.test(hexOnly) &&
            hexOnly.length % 2 === 0 &&
            hexOnly.length <= 12
        )
    }

    const generateMacAddresses = useCallback(() => {
        if (prefix && !isValidMacPrefix(prefix)) {
            setError('Invalid MAC address')
            return
        }

        const macAddresses = []

        const cleanPrefix =
            prefix
                .toUpperCase()
                .replace(/[^0-9A-F]/g, '')
                .match(/.{1,2}/g) || []

        for (let i = 0; i < quantity; i++) {
            let mac = [...cleanPrefix]

            while (mac.length < 6) {
                mac.push(
                    Math.floor(Math.random() * 256)
                        .toString(16)
                        .padStart(2, '0'),
                )
            }

            macAddresses.push(mac.join(separator !== 'none' ? separator : ''))
        }

        setMacAddresses(macAddresses || [])
    }, [prefix, separator, quantity])

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

    useEffect(() => {
        generateMacAddresses()
    }, [generateMacAddresses])

    return (
        <div className="container my-5 gap-5 lg:my-14 xl:max-w-7xl">
            <div className="space-y-3.5 rounded-2xl border border-border bg-gray-100 p-4 md:space-y-4 lg:p-8">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Quantity
                        </label>
                        <Input
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={(e) => {
                                if (e.target.value === '0') {
                                    setQuantity(1)
                                } else
                                    setQuantity(parseInt(e.target.value) || 1)
                            }}
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            MAC address prefix
                        </label>
                        <Input
                            type="text"
                            placeholder="Set a prefix, e.g. 65:E6:7A"
                            value={prefix}
                            onChange={(e) => {
                                setPrefix(e.target.value)
                                setError('')
                            }}
                        />
                        {!!error && (
                            <div className="text-xs text-danger">{error}</div>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Case
                        </label>
                        <div className="flex gap-5">
                            <Button
                                variant="outline-shadow"
                                onClick={() => setTextCase('u')}
                                className={cn({
                                    'bg-black text-white': textCase === 'u',
                                })}
                            >
                                Uppercase
                            </Button>
                            <Button
                                variant="outline-shadow"
                                onClick={() => setTextCase('l')}
                                className={cn({
                                    'bg-black text-white': textCase === 'l',
                                })}
                            >
                                Lowercase
                            </Button>
                        </div>
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Separator
                        </label>
                        <div className="flex gap-5">
                            <Button
                                variant="outline-shadow"
                                onClick={() => setSeparator(':')}
                                className={cn({
                                    'bg-black text-white': separator === ':',
                                })}
                            >
                                :
                            </Button>
                            <Button
                                variant="outline-shadow"
                                onClick={() => setSeparator('-')}
                                className={cn({
                                    'bg-black text-white': separator === '-',
                                })}
                            >
                                -
                            </Button>
                            <Button
                                variant="outline-shadow"
                                onClick={() => setSeparator('.')}
                                className={cn({
                                    'bg-black text-white': separator === '.',
                                })}
                            >
                                .
                            </Button>
                            <Button
                                variant="outline-shadow"
                                onClick={() => setSeparator('none')}
                                className={cn({
                                    'bg-black text-white': separator === 'none',
                                })}
                            >
                                None
                            </Button>
                        </div>
                    </div>
                </div>
                {!!macAddresses?.length && !error && (
                    <div className="rounded-lg bg-white p-5">
                        {macAddresses.map((address, index) => (
                            <div key={index} className="text-center">
                                {textCase === 'u'
                                    ? address.toUpperCase()
                                    : address.toLowerCase()}
                            </div>
                        ))}
                    </div>
                )}
                <div className="flex items-center justify-center gap-5">
                    <Button
                        type="button"
                        onClick={() => generateMacAddresses()}
                    >
                        Refresh
                    </Button>
                    <Button
                        type="button"
                        onClick={() => copyToClipboard(macAddresses.join('\n'))}
                    >
                        Copy
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default MAcAddressGeneratorForm
