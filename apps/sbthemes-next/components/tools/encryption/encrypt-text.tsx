'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Buffer } from 'buffer'
import * as crypto from 'crypto'
import { Controller, useForm } from 'react-hook-form'

import DecryptText from '@/components/tools/encryption/decrypt-text'
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
    encryption_algorithm: string
    encrypted_text: string
    iv: string
    auth_tag: Buffer
    key: string
}

const defaultValue: IForm = {
    text: 'Lorem ipsum dolor sit amet',
    secret_key: '',
    encryption_algorithm: 'aes-256-gcm',
    encrypted_text: '',
    iv: '',
    auth_tag: Buffer.from(''),
    key: '',
}

const EncryptText = () => {
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
    const algorithm: any = watch('encryption_algorithm')
    const text: any = watch('text')

    const getEncryptedText = useCallback(() => {
        try {
            const iv: any = crypto.randomBytes(16)
            const key: any = getKey(secretKey, algorithm)

            const cipher = crypto.createCipheriv(algorithm, key, iv)

            let encrypted = cipher.update(text, 'utf8', 'hex')
            encrypted += cipher.final('hex')

            setValue('auth_tag', cipher.getAuthTag())

            setValue('iv', iv)
            setValue('key', key)
            setValue('encrypted_text', encrypted || '')
        } catch (err) {
            console.error(err)
        }
    }, [setValue, algorithm, text, getKey, secretKey])

    useEffect(() => {
        getEncryptedText()
    }, [getEncryptedText])

    return (
        <>
            <div className="rounded-2xl border border-border bg-gray-100 p-4 sm:p-5">
                <h2 className="mb-5 text-xl font-semibold text-primary">
                    Encrypt
                </h2>
                <form>
                    <div className="mb-4">
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Your plain text
                        </label>
                        <Textarea
                            {...register('text')}
                            placeholder="Your text you want encrypt..."
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
                            name="encryption_algorithm"
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
                    <div className="mb-4">
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Encrypted text
                        </label>
                        <Input {...register('encrypted_text')} readOnly />
                    </div>
                </form>
            </div>
            <DecryptText iv={watch('iv')} authTag={watch('auth_tag')} />
        </>
    )
}

export default EncryptText
