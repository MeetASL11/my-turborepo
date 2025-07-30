'use client'

import React, { useCallback, useEffect, useState } from 'react'
import * as crypto from 'crypto'
import { Controller, useForm, useWatch } from 'react-hook-form'

import CopyToClipboard from '@/components/ui/copy-to-clipboard'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import helper from '@/lib/helper'

const hashTypes = [
    { label: 'MD5', value: 'MD5' },
    { label: 'SHA1', value: 'SHA1' },
    { label: 'SHA256', value: 'SHA256' },
    { label: 'SHA224', value: 'SHA224' },
    { label: 'SHA512', value: 'SHA512' },
    { label: 'SHA384', value: 'SHA384' },
    // { label: 'SHA3', type: 'SHA3' },
    { label: 'RIPEMD160', value: 'RIPEMD160' },
]

export type IForm = {
    text: string
    secret_key: string
    output_encoding: any
    hash_function: string
}

const defaultValue: IForm = {
    text: '',
    secret_key: '',
    output_encoding: 'hex',
    hash_function: 'SHA256',
}

const HmacGeneratorForm = () => {
    const { register, control } = useForm<IForm>({
        defaultValues: defaultValue,
    })

    const [hmacText, setHmacText] = useState('')

    const allValues = useWatch({ control })

    const generateHmac = useCallback(() => {
        try {
            const hashFunction = allValues.hash_function || 'SHA256'
            const secretKey = allValues.secret_key || ''
            const text = allValues.text || ''
            const encoding = (allValues.output_encoding as any) || 'hex'

            if (!text.trim() || !secretKey.trim()) {
                setHmacText('')
                return
            }

            const hmac = crypto.createHmac(hashFunction, secretKey)
            hmac.update(text)

            let digest
            if (encoding === 'base64url') {
                digest = hmac
                    .digest('base64')
                    .replace(/\+/g, '-')
                    .replace(/\//g, '_')
                    .replace(/=+$/, '')
            } else if (encoding === 'binary') {
                digest = Array.from(hmac.digest())
                    .map((byte) => byte.toString(2).padStart(8, '0'))
                    .join('')
            } else {
                digest = hmac.digest(encoding)
            }

            setHmacText(digest || '')
        } catch (e) {
            console.error(e)
            setHmacText('')
        }
    }, [allValues])

    useEffect(() => {
        generateHmac()
    }, [generateHmac])

    return (
        <div className="container my-5 lg:my-14 xl:max-w-7xl">
            <div className="rounded-2xl border border-border bg-gray-100 p-4 lg:p-8 xl:col-span-2">
                <form className='space-y-4'>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Text to compute hash
                        </label>
                        <Textarea
                            rows={3}
                            {...register('text')}
                            placeholder="Text to compute hash..."
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Secret key
                        </label>
                        <Input
                            {...register('secret_key')}
                            placeholder="Enter the secret key..."
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div>
                            <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                Hashing function
                            </label>
                            <Controller
                                name="hash_function"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        value={value}
                                        onValueChange={onChange}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select option" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {hashTypes.map((type) => (
                                                <SelectItem
                                                    key={type.value}
                                                    value={type.value}
                                                >
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div>
                            <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                Output encoding
                            </label>
                            <Controller
                                name="output_encoding"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        value={value}
                                        onValueChange={onChange}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select option" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {helper.digestEncodingOptions.map(
                                                (type) => (
                                                    <SelectItem
                                                        key={type.value}
                                                        value={type.value}
                                                    >
                                                        {type.label}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            HMAC text
                        </label>
                        <div className="flex items-end gap-2.5">
                            <Input
                                placeholder="Your hmac text.."
                                value={hmacText}
                                readOnly
                            />
                            <CopyToClipboard
                                text={hmacText}
                                btnClass="size-[42px]"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default HmacGeneratorForm
