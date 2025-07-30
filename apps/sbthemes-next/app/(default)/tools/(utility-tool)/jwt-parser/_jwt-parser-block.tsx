'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { format, fromUnixTime } from 'date-fns'
import { jwtDecode, JwtHeader, JwtPayload } from 'jwt-decode'
import { LoaderCircle, SplineIcon } from 'lucide-react'

import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const defaultToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5'

const JWTParserBlock = () => {
    const [error, setError] = useState(false)
    const [value, setValue] = useState(defaultToken)
    const [decodedJWT, setDecodedJWT] = useState<{
        header: JwtHeader
        payload: any
    } | null>(null)
    const [loading, setLoading] = useState(false)

    const parseJWTToken = useCallback(async () => {
        setLoading(true)
        try {
            const payload: JwtPayload = await jwtDecode(value)
            const header: JwtHeader = await jwtDecode(value, { header: true })
            setDecodedJWT({ header, payload })
            setError(false)
        } catch (err) {
            setError(true)
            setDecodedJWT(null)
        }
        setLoading(false)
    }, [value])

    useEffect(() => {
        parseJWTToken()
    }, [parseJWTToken])

    const getClauseString = (key: string) => {
        switch (key) {
            case 'sub':
                return 'Subject'
            case 'name':
                return 'Full name'
            case 'iat':
                return 'Issued At'
            case 'alg':
                return 'Algorithm'
            case 'typ':
                return 'Type'
            case 'sub':
                return 'Subject'
            case 'exp':
                return 'Expiration Time'
            case 'iss':
                return 'Issuer'
            case 'aud':
                return 'Audience'
            case 'nbf':
                return 'Not Before'
            case 'jti':
                return 'JWT ID'
            default:
                return ''
        }
    }

    const isValidInteger = (value: any) => {
        return typeof value === 'number' && Number.isInteger(value)
    }

    return (
        <div className="container my-5 lg:my-14 xl:max-w-7xl">
            <div className="space-y-3.5 rounded-2xl border border-border bg-gray-100 p-4 lg:space-y-4 lg:p-8 xl:col-span-2">
                <div>
                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                        JWT to decode
                    </label>
                    <Textarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter your JWT token.."
                    />
                    {error && (
                        <span className="text-sm text-danger">Invalid JWT</span>
                    )}
                </div>

                {loading ? (
                    <div className="flex h-14 w-full items-center justify-center">
                        <LoaderCircle className="animate-spin" />
                    </div>
                ) : (
                    !!decodedJWT &&
                    !loading && (
                        <div className="text-black">
                            {/* Header */}
                            {!!Object.entries(decodedJWT?.header).length && (
                                <div>
                                    <div className="bg-gray/20 py-4 text-center font-semibold">
                                        Header
                                    </div>
                                    {Object.entries(decodedJWT?.header).map(
                                        ([key, value], i) => (
                                            <div
                                                className={cn(
                                                    'flex border border-gray-400 px-5 py-3',
                                                    Object.entries(
                                                        decodedJWT?.header,
                                                    )?.length -
                                                        1 !==
                                                        i && 'border-b-0',
                                                )}
                                                key={i}
                                            >
                                                <div className="w-[40%]">
                                                    <span className="font-semibold">
                                                        {key}
                                                    </span>
                                                    {!!getClauseString(key) && (
                                                        <span className="ml-1 text-sm">
                                                            (
                                                            {getClauseString(
                                                                key,
                                                            )}
                                                            )
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="w-[60%]">
                                                    {value}
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            )}

                            {/* Payload */}
                            {!!Object.entries(decodedJWT?.payload).length && (
                                <div>
                                    <div className="bg-gray/20 py-4 text-center font-semibold">
                                        Payload
                                    </div>

                                    {Object.entries(decodedJWT?.payload).map(
                                        ([key, value]: any, i) => (
                                            <div
                                                className={cn(
                                                    'flex border border-gray-400 px-5 py-3',
                                                    Object.entries(
                                                        decodedJWT?.payload,
                                                    )?.length -
                                                        1 !==
                                                        i && 'border-b-0',
                                                )}
                                                key={i}
                                            >
                                                <div className="w-[40%]">
                                                    <span className="font-semibold">
                                                        {key}
                                                    </span>
                                                    {!!getClauseString(key) && (
                                                        <span className="ml-1 text-sm">
                                                            (
                                                            {getClauseString(
                                                                key,
                                                            )}
                                                            )
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="w-[60%]">
                                                    {typeof value === 'boolean'
                                                        ? value.toString()
                                                        : value}

                                                    {!!isValidInteger(
                                                        value,
                                                    ) && (
                                                        <span className="ml-2">
                                                            (
                                                            {format(
                                                                fromUnixTime(
                                                                    value,
                                                                ),
                                                                'dd/MM/yyyy HH:mm:ss',
                                                            )}
                                                            )
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            )}
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default JWTParserBlock
