'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { differenceInDays, format } from 'date-fns'
import { LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { usePDF } from 'react-to-pdf'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

export type IForm = {
    url: string
}

const defaultValue: IForm = {
    url: '',
}

const SSLCheckerForm = () => {
    const [data, setData] = useState<any>(null)
    const [loading, stLoading] = useState(false)
    const [pdfLoading, setPdfLoading] = useState(false)
    const [certificateChain, setCertificateChain] = useState([])
    const { toPDF, targetRef } = usePDF({
        filename: 'sbthemes_ssl_certificate.pdf',
        page: {
            margin: 10,
            format: [200, 400],
        },
    })

    const {
        watch,
        handleSubmit,
        formState: { isSubmitting },
        setValue,
    } = useForm<IForm>({
        defaultValues: defaultValue,
    })

    const addReminder = (from: string, to: string) => {
        const eventTitle = 'Renew ssl'

        const fromDate = format(from, "yyyyMMdd'T'HHmmss'Z'")
        const toDate = format(to, "yyyyMMdd'T'HHmmss'Z'")

        // Google Calendar URL with event details
        const googleCalendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(eventTitle)}&dates=${fromDate}/${toDate}&sf=true`

        window.open(googleCalendarUrl, '_blank')
    }

    const checkSSL = async (formData: IForm) => {
        try {
            stLoading(true)
            const { data } = await axios.get(
                `/api/ssl-checker?url=${formData.url.trim()}`,
            )
            const formattedData = restoreCircularReferences(data?.certificate)
            setData({
                ...data,
                certificate: formattedData,
            })
        } catch (error) {
            setData(null)
            toast({
                variant: 'error',
                description: 'Something went wrong!',
            })
        }
        stLoading(false)
    }

    const restoreCircularReferences = (jsonString: string) => {
        const obj = JSON.parse(jsonString)
        const refs = new Map()

        function restore(obj: any) {
            if (typeof obj === 'object' && obj !== null) {
                if (obj.__ref !== undefined) {
                    // If a circular reference placeholder is found, restore the reference
                    const refKey = obj.__ref
                    return refs.get(refKey)
                }
                // Otherwise, we store the object and traverse its children
                refs.set(obj, obj)
                for (const key in obj) {
                    obj[key] = restore(obj[key])
                }
            }
            return obj
        }

        return restore(obj)
    }

    const flattenCertificates = (obj: any, keyName = 'issuerCertificate') => {
        const result: any = []

        function traverse(current: any) {
            if (!current || typeof current !== 'object') return

            // Add the current object (excluding its nested `issuerCertificate`) to the array
            const { [keyName]: nested, ...rest } = current
            result.push(rest)

            // Recursively process the nested `issuerCertificate`
            if (nested) {
                traverse(nested)
            }
        }

        traverse(obj)
        return result
    }

    useEffect(() => {
        if (!!data) {
            const certificates = flattenCertificates(
                data?.certificate?.issuerCertificate,
            )
            setCertificateChain(certificates || [])
        }
    }, [data])

    const formatSANs = (name: string) => {
        const tmp = name.split(',')
        let result = tmp.map((str) => str.replace(/DNS:/g, ''))

        return result.join(', ')
    }

    const downloadPdf = () => {
        setPdfLoading(true)
        setTimeout(() => {
            toPDF()
            setPdfLoading(false)
        }, 300)
    }

    const renderPdfContent = () => {
        return (
            <div className="space-y-3" ref={targetRef}>
                <div>
                    <Image
                        src="/images/logo.svg"
                        alt="logo"
                        width={150}
                        height={150}
                    />
                </div>
                <div className="space-y-3">
                    <div className="pt-4 text-xl font-medium">
                        Certificate details
                    </div>
                    <div className="flex gap-3">
                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                            Issued to:
                        </div>
                        <div>{data?.domain}</div>
                    </div>
                    <div className="flex gap-3">
                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                            Issued by:
                        </div>
                        <div>{data?.certificate?.issuer?.CN}</div>
                    </div>
                    <div className="flex gap-3">
                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                            Common name:
                        </div>
                        <div>{data?.certificate?.subject?.CN}</div>
                    </div>
                    <div className="flex gap-3">
                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                            SANs:
                        </div>
                        <div>
                            {formatSANs(data?.certificate?.subjectaltname)}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                            Key Size:
                        </div>
                        <div>{data?.certificate?.bits} bits</div>
                    </div>
                    <div className="flex gap-3">
                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                            Fingerprint:
                        </div>
                        <div className="break-words break-all lowercase">
                            {data?.certificate?.fingerprint.replace(/:/g, '')}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                            Serial Number:
                        </div>
                        <div className="break-words break-all lowercase">
                            {data?.certificate?.serialNumber.replace(/:/g, '')}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                            Issuer Brand:
                        </div>
                        <div>{data?.certificate?.issuer?.O}</div>
                    </div>
                    <div className="flex gap-3">
                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                            Issuer (CA):
                        </div>
                        <div>{data?.certificate?.issuer?.CN}</div>
                    </div>
                    <div className="flex gap-3">
                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                            Port:
                        </div>
                        <div>{data?.port}</div>
                    </div>
                    <div className="flex gap-3">
                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                            Hostname:
                        </div>
                        <div>{data?.domain}</div>
                    </div>
                    <div className="flex gap-3">
                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                            Valid:
                        </div>

                        <div>
                            {format(
                                data?.certificate?.valid_from,
                                'MMMM d, yyyy',
                            )}
                        </div>
                        <div>-</div>
                        <div>
                            {format(
                                data?.certificate?.valid_to,
                                'MMMM d, yyyy',
                            )}
                        </div>
                        <div>
                            (
                            {'expires in ' +
                                differenceInDays(
                                    data?.certificate?.valid_to,
                                    new Date(),
                                ) +
                                ' ' +
                                'days'}
                            )
                        </div>
                    </div>
                </div>
                {!!certificateChain?.length && (
                    <div>
                        <div className="pt-3 text-xl font-medium">
                            Certificate chain
                        </div>
                        <div>
                            {certificateChain.map((c: any, i: number) => (
                                <div key={i} className="space-y-2">
                                    <div className="pt-4 text-xl font-medium text-black underline">
                                        Certificate {i + 1}
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                                            Issued by:
                                        </div>
                                        <div>{c?.issuer?.CN || 'N/A'}</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                                            Valid:
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span>
                                                {format(
                                                    c?.valid_from,
                                                    'MMMM d, yyyy',
                                                )}
                                            </span>
                                            <span> - </span>
                                            <span>
                                                {format(
                                                    c?.valid_to,
                                                    'MMMM d, yyyy',
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                                            Common name:
                                        </div>
                                        <div>{c?.subject?.CN || 'N/A'}</div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                                            Key Size:
                                        </div>
                                        <div>{c?.bits} bits</div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                                            Fingerprint:
                                        </div>
                                        <div className="break-words break-all lowercase">
                                            {c?.fingerprint.replace(/:/g, '')}
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                                            Serial Number:
                                        </div>
                                        <div className="break-words break-all lowercase">
                                            {c?.serialNumber.replace(
                                                /:/g,
                                                '',
                                            ) || 'N/A'}
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                                            Issuer Brand:
                                        </div>
                                        <div>{c?.issuer?.O || 'N/A'}</div>
                                    </div>
                                    <div
                                        className={cn('flex gap-3', {
                                            'pb-2':
                                                i ===
                                                certificateChain.length - 1,
                                        })}
                                    >
                                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                                            Issuer (CA):
                                        </div>
                                        <div>{c?.issuer?.CN || 'N/A'}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="container my-5 lg:my-14 xl:max-w-7xl">
            <div className="rounded-2xl border border-border bg-gray-100 p-4 lg:p-8 xl:col-span-2">
                <form onSubmit={handleSubmit(checkSSL)}>
                    <div className="mb-4">
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            URL
                        </label>
                        <Input
                            placeholder="Enter the URL here..."
                            onChange={(e) => {
                                setValue('url', e.target.value)
                                setData(null)
                            }}
                        />
                    </div>

                    <div className="text-center">
                        <Button
                            type="submit"
                            disabled={!watch('url')}
                            loading={isSubmitting}
                        >
                            Check
                        </Button>
                        {!!data && (
                            <Button
                                type="button"
                                disabled={!data || isSubmitting || pdfLoading}
                                onClick={() => downloadPdf()}
                                className="ml-3"
                            >
                                Download PDF
                            </Button>
                        )}
                    </div>
                </form>

                {loading ? (
                    <div className="mt-5 flex h-10 justify-center">
                        <LoaderCircle className="mt-4 size-4 animate-spin" />
                    </div>
                ) : (
                    !!data && (
                        <div className="space-y-3">
                            <div className="space-y-3">
                                <div className="pt-4 text-xl font-medium">
                                    Certificate details
                                </div>
                                <div className="flex gap-3">
                                    <div className="min-w-[124px] font-medium text-black sm:w-36">
                                        Issued to:
                                    </div>
                                    <div>{data?.domain}</div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="min-w-[124px] font-medium text-black sm:w-36">
                                        Issued by:
                                    </div>
                                    <div>{data?.certificate?.issuer?.CN}</div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="min-w-[124px] font-medium text-black sm:w-36">
                                        Common name:
                                    </div>
                                    <div>{data?.certificate?.subject?.CN}</div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="min-w-[124px] font-medium text-black sm:w-36">
                                        SANs:
                                    </div>
                                    <div>
                                        {formatSANs(
                                            data?.certificate?.subjectaltname,
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="min-w-[124px] font-medium text-black sm:w-36">
                                        Key Size:
                                    </div>
                                    <div>{data?.certificate?.bits} bits</div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="min-w-[124px] font-medium text-black sm:w-36">
                                        Fingerprint:
                                    </div>
                                    <div className="break-words break-all lowercase">
                                        {data?.certificate?.fingerprint.replace(
                                            /:/g,
                                            '',
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="min-w-[124px] font-medium text-black sm:w-36">
                                        Serial Number:
                                    </div>
                                    <div className="break-words break-all lowercase">
                                        {data?.certificate?.serialNumber.replace(
                                            /:/g,
                                            '',
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="min-w-[124px] font-medium text-black sm:w-36">
                                        Issuer Brand:
                                    </div>
                                    <div>{data?.certificate?.issuer?.O}</div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="min-w-[124px] font-medium text-black sm:w-36">
                                        Issuer (CA):
                                    </div>
                                    <div>{data?.certificate?.issuer?.CN}</div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="min-w-[124px] font-medium text-black sm:w-36">
                                        Port:
                                    </div>
                                    <div>{data?.port}</div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="min-w-[124px] font-medium text-black sm:w-36">
                                        Hostname:
                                    </div>
                                    <div>{data?.domain}</div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="min-w-[124px] font-medium text-black sm:w-36">
                                        Valid:
                                    </div>

                                    <div>
                                        {format(
                                            data?.certificate?.valid_from,
                                            'MMMM d, yyyy',
                                        )}
                                    </div>
                                    <div>-</div>
                                    <div>
                                        {format(
                                            data?.certificate?.valid_to,
                                            'MMMM d, yyyy',
                                        )}
                                    </div>
                                    <div>
                                        (
                                        {'expires in ' +
                                            differenceInDays(
                                                data?.certificate?.valid_to,
                                                new Date(),
                                            ) +
                                            ' ' +
                                            'days'}
                                        )
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        type="button"
                                        size="small"
                                        onClick={() =>
                                            addReminder(
                                                data?.certificate?.valid_from,
                                                data?.certificate?.valid_to,
                                            )
                                        }
                                    >
                                        Remind me
                                    </Button>
                                </div>
                            </div>
                            {!!certificateChain?.length && (
                                <div>
                                    <div className="pt-3 text-xl font-medium">
                                        Certificate chain
                                    </div>
                                    <div>
                                        {certificateChain.map(
                                            (c: any, i: number) => (
                                                <div
                                                    key={i}
                                                    className="space-y-2"
                                                >
                                                    <div className="pt-4 text-xl font-medium text-black underline">
                                                        Certificate {i + 1}
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                                                            Issued by:
                                                        </div>
                                                        <div>
                                                            {c?.issuer?.CN ||
                                                                'N/A'}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                                                            Valid:
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span>
                                                                {format(
                                                                    c?.valid_from,
                                                                    'MMMM d, yyyy',
                                                                )}
                                                            </span>
                                                            <span> - </span>
                                                            <span>
                                                                {format(
                                                                    c?.valid_to,
                                                                    'MMMM d, yyyy',
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                                                            Common name:
                                                        </div>
                                                        <div>
                                                            {c?.subject?.CN ||
                                                                'N/A'}
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                                                            Key Size:
                                                        </div>
                                                        <div>
                                                            {c?.bits} bits
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                                                            Fingerprint:
                                                        </div>
                                                        <div className="break-words break-all lowercase">
                                                            {c?.fingerprint.replace(
                                                                /:/g,
                                                                '',
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                                                            Serial Number:
                                                        </div>
                                                        <div className="break-words break-all lowercase">
                                                            {c?.serialNumber.replace(
                                                                /:/g,
                                                                '',
                                                            ) || 'N/A'}
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                                                            Issuer Brand:
                                                        </div>
                                                        <div>
                                                            {c?.issuer?.O ||
                                                                'N/A'}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={cn(
                                                            'flex gap-3',
                                                            {
                                                                'pb-2':
                                                                    i ===
                                                                    certificateChain.length -
                                                                        1,
                                                            },
                                                        )}
                                                    >
                                                        <div className="min-w-[124px] font-medium text-black sm:w-36">
                                                            Issuer (CA):
                                                        </div>
                                                        <div>
                                                            {c?.issuer?.CN ||
                                                                'N/A'}
                                                        </div>
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                )}
                {!!data && pdfLoading && <div>{renderPdfContent()}</div>}
            </div>
        </div>
    )
}

export default SSLCheckerForm
