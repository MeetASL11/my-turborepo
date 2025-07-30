'use client'
import React from 'react'
import * as crypto from 'crypto'
import { Controller, useForm } from 'react-hook-form'

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

export type IForm = {
    text: string
    digest_encoding: crypto.BinaryToTextEncoding
}

const defaultValue: IForm = {
    text: '',
    digest_encoding: 'hex',
}

const hashTypes = [
    { label: 'MD5', type: 'MD5' },
    { label: 'SHA1', type: 'SHA1' },
    { label: 'SHA256', type: 'SHA256' },
    { label: 'SHA224', type: 'SHA224' },
    { label: 'SHA512', type: 'SHA512' },
    { label: 'SHA384', type: 'SHA384' },
    // { label: 'SHA3', type: 'SHA3' },
    { label: 'RIPEMD160', type: 'RIPEMD160' },
]

const HashTextForm = () => {
    const { register, control, reset, watch } = useForm<IForm>({
        defaultValues: defaultValue,
    })

    const getMD5HashText = (
        text: string,
        digestOption: crypto.BinaryToTextEncoding,
        algorithm: string,
    ) => {
        if (!text.trim()) {
            return '' // Return an empty string if there's no text
        }
        let hash = ''
        try {
            if (digestOption === 'binary') {
                const hashText = crypto
                    .createHash(algorithm)
                    .update(text)
                    .digest()
                hash = Array.from(hashText)
                    .map((byte) => byte.toString(2).padStart(8, '0'))
                    .join('')
            } else if (digestOption === 'base64url') {
                const hashText = crypto
                    .createHash(algorithm)
                    .update(text)
                    .digest('base64')
                hash = hashText
                    .replace(/\+/g, '-')
                    .replace(/\//g, '_')
                    .replace(/=+$/, '')
            } else {
                hash = crypto
                    .createHash(algorithm)
                    .update(text)
                    .digest(digestOption)
            }
        } catch (error) {
            console.error(error)
        }

        return hash || ''
    }

    return (
        <div className="mx-auto my-5 w-full max-w-4xl rounded-2xl border border-border bg-gray-100 lg:my-14">
            <div className="border-border px-4 py-5 md:px-5 md:py-8">
                <form>
                    <div className="mb-4">
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Your text to hash
                        </label>
                        <Textarea rows={3} {...register('text')} />
                    </div>
                    <div className="mb-4">
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Digest encoding
                        </label>
                        <Controller
                            name="digest_encoding"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Select value={value} onValueChange={onChange}>
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
                    {hashTypes.map(({ label, type }) => (
                        <div key={type} className='mb-4'>
                            <label className="mb-2.5 block text-sm/[18px] font-medium text-gray">
                                {label}
                            </label>
                            <div className="flex gap-2.5">
                                <Input
                                    type="text"
                                    placeholder={`${label} hash`}
                                    value={getMD5HashText(
                                        watch('text'),
                                        watch('digest_encoding'),
                                        type,
                                    )}
                                    readOnly
                                />

                                <CopyToClipboard
                                    text={getMD5HashText(
                                        watch('text'),
                                        watch('digest_encoding'),
                                        type,
                                    )}
                                />
                            </div>
                        </div>
                    ))}
                </form>
            </div>
        </div>
    )
}

export default HashTextForm
