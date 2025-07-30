'use client'

import React, { useCallback, useEffect, useState } from 'react'
import * as crypto from 'crypto'
import { CircleX } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'

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
    secret_key: string
    decryption_algorithm: string
    decrypted_text: string
}

const defaultValue: IForm = {
    text: '',
    secret_key: '',
    decryption_algorithm: 'aes-256-gcm',
    decrypted_text: '',
}

const DecryptText = ({ iv, authTag }: any) => {
    const [error, setError] = useState(false)
    const { register, control, watch, setValue } = useForm<IForm>({
        defaultValues: defaultValue,
    })

    const getKey = useCallback((dynamicKey: string, algorithm: string) => {
        if (algorithm === 'aes-128-gcm') {
            return helper.get128BitKey(dynamicKey)
        } else if (algorithm === 'aes-192-gcm') {
            return helper.get192BitKey(dynamicKey)
        } else {
            return crypto.createHash('sha256').update(dynamicKey).digest() // Create a Buffer of 32 bytes
        }
    }, [])

    const secretKey: any = watch('secret_key')
    const algorithm: any = watch('decryption_algorithm')
    const text: any = watch('text')

    const getDecryptedText = useCallback(() => {
        const key: any = getKey(secretKey, algorithm)
        if (!!key.length && !!authTag.length && !!text)
            try {
                const decipher = crypto.createDecipheriv(algorithm, key, iv)

                decipher.setAuthTag(authTag as any)

                let decrypted = decipher.update(text, 'hex', 'utf8')
                decrypted += decipher.final('utf8')

                setValue('decrypted_text', decrypted || '')
                setError(false)
            } catch (error) {
                console.error(error)
                setError(true)
            }
    }, [algorithm, getKey, secretKey, authTag, iv, text, setValue])

    useEffect(() => {
        getDecryptedText()
    }, [getDecryptedText])

    return (
        <>
            <div className="rounded-2xl border border-border bg-gray-100 p-4 sm:p-5">
                <h2 className="mb-5 text-xl font-semibold text-primary">
                    Decrypt
                </h2>
                <form>
                    <div className="mb-4">
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Your encrypted text
                        </label>
                        <Textarea
                            {...register('text')}
                            placeholder="Enter your encrypted text..."
                            rows={4}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Your secret key
                        </label>
                        <Input
                            {...register('secret_key')}
                            placeholder="Enter your secret key..."
                        />
                    </div>
                    <div className="mb-4">
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Encryption algorithm
                        </label>
                        <Controller
                            name="decryption_algorithm"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Select value={value} onValueChange={onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select algorithm" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {helper.encryptionAlgorithm.map(
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
                    {error ? (
                        <div className="flex gap-3 rounded-xl bg-danger/10 p-4 text-danger">
                            <CircleX />
                            <span>Whoops! We weren&apos;t able to decrypt the message.</span>
                        </div>
                    ) : (
                        <div className="mb-4">
                            <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                Decrypted text
                            </label>
                            <Input
                                {...register('decrypted_text')}
                                placeholder="Your decrypted text..."
                                readOnly
                            />
                        </div>
                    )}
                </form>
            </div>
        </>
    )
}

export default DecryptText
