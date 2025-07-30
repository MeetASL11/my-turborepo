'use client'

import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

const macAddressRegex = /^([0-9A-Fa-f]{2}[:]){5}[0-9A-Fa-f]{2}$/
const MACAddressLookupForm = () => {
    const [value, setValue] = useState('20:37:06:12:34:58')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any>(null)

    const getMacAddressLookup = useCallback(async () => {
        if (!value) {
            setError('Enter MAC address')
            return
        }

        if (!macAddressRegex.test(value)) {
            setError('Invalid MAC address')
            return
        }

        try {
            setLoading(true)
            const { data } = await axios.get(
                `/api/mac-address-lookup?macAddress=${value}`,
            )

            setData(data.data)
        } catch {
            setData(null)
        }
        setLoading(false)
    }, [value])

    useEffect(() => {
        getMacAddressLookup()
    }, [getMacAddressLookup])

    const copyToClipboard = () => {
        const company = data?.company || ''
        const address = data?.address?.split(',').join('\n') || ''

        // Construct the text to copy
        const text = `${company}\n${address}`

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
            <div className="space-y-3.5 rounded-2xl border border-border bg-gray-100 p-4 md:space-y-4 lg:p-8">
                <div>
                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                        MAC address
                    </label>
                    <Input
                        type="text"
                        placeholder="Set a prefix, e.g. 65:E6:7A"
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value)
                            setError('')
                            setData(null)
                        }}
                        readOnly={loading}
                    />
                    {!!error && (
                        <div className="text-xs text-danger">{error}</div>
                    )}
                </div>
                {!!data && !loading && (
                    <div>
                        <div className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Vendor info
                        </div>
                        <div className="space-y-2 rounded-2xl bg-white p-4">
                            {!!data?.company && <div>{data?.company}</div>}
                            {!!data?.address && (
                                <div className="space-y-2">
                                    {data?.address
                                        ?.split(',')
                                        .map((a: string, i: number) => (
                                            <div key={i}>{a}</div>
                                        ))}
                                </div>
                            )}
                        </div>
                        <div className="w-full text-center">
                            <Button
                                className="mt-4"
                                onClick={() => copyToClipboard()}
                            >
                                Copy
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MACAddressLookupForm
