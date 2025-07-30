'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LoaderCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

const DMARCValidationForm = () => {
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const dmarcValidation = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(
                `/api/dmarc-validation?url=${value}`,
            )
            const updatedResultObj = formatResult(data?.dmarcResult)
            setResult({
                ...data,
                result: updatedResultObj || [],
            })
        } catch (err) {
            setResult(null)
        }
        setLoading(false)
    }

    const tagDescriptions = (tag: string) => {
        switch (tag.toLowerCase()) {
            case 'v':
                return {
                    name: 'version',
                    description:
                        'The v tag is required and represents the protocol version. An example is v=DMARC1',
                }
            case 'p':
                return {
                    name: 'policy',
                    description:
                        'Policy to apply to email that fails the DMARC test. Valid values can be "none", "quarantine", or "reject"',
                }
            case 'rua':
                return {
                    name: 'Receivers',
                    description:
                        'This optional tag is designed for reporting URI(s) for aggregate data. An rua example is rua=mailto:CUSTOMER@for.example.com.',
                }
            case 'ruf':
                return {
                    name: 'Forensic Receivers',
                    description:
                        'Like the rua tag, the ruf designation is an optional tag. It directs addresses to which message-specific forensic information is to be reported (i.e., comma-separated plain-text list of URIs). An ruf example is ruf=mailto:CUSTOMER@for.example.com.',
                }
            case 'sp':
                return {
                    name: 'Subdomain Policy',
                    description:
                        'Requested Mail Receiver policy for all subdomains. Can be "none", "quarantine", or "reject".',
                }
            case 'ri':
                return {
                    name: 'Report Interval',
                    description:
                        'The ri tag corresponds to the aggregate reporting interval and provides DMARC feedback for the outlined criteria.',
                }
            case 'pct':
                return {
                    name: 'Percentage',
                    description:
                        'It specifies the percentage of email messages subjected to filtering. For example, pct=25 means a quarter of your company’s emails will be filtered by the recipient.',
                }
            case 'fo':
                return {
                    name: 'Failure Reporting Options',
                    description:
                        'The FO tag pertains to how forensic reports are created and presented to DMARC users.',
                }
            case 'aspf':
                return {
                    name: 'ASPF Tag',
                    description:
                        'The aspf tag represents alignment mode for SPF. An optional tag, aspf=r is a common example of its configuration.',
                }
            case 'adkim':
                return {
                    name: 'ADKIM Tag',
                    description:
                        'Similar to aspf, the optional adkim tag is the alignment mode for the DKIM protocol. A sample tag is adkim=r.',
                }
            case 'rf':
                return {
                    name: 'Report Format',
                    description:
                        '	Forensic reporting format(s) is declared by the DMARC rf tag.',
                }
            default:
                return {
                    name: '',
                    description: '',
                }
        }
    }

    const formatResult = (data: any) => {
        if (!!data?.length && data?.[0]) {
            const tmp = data?.[0]
                ?.split(' ')
                .map((item: string) => item.trim().replace(/;$/, ''))

            const result = tmp.map((tag: string) => {
                //to get tagname and description from tag
                const [key, value] = tag?.split('=')
                const { name, description } = tagDescriptions(key)

                return {
                    tag: key,
                    value: value,
                    name: name,
                    description: description,
                }
            })

            return result
        }

        return []
    }

    return (
        <div className="container my-5 gap-5 lg:my-14 xl:max-w-7xl">
            <div className="space-y-3.5 rounded-2xl border border-border bg-gray-100 p-4 md:space-y-4 lg:p-8 xl:grid-cols-2">
                <form
                    className="space-y-5"
                    onSubmit={(e) => {
                        e.preventDefault()
                        dmarcValidation()
                    }}
                >
                    <div className="flex items-end gap-5">
                        <div className="flex-1">
                            <label className="mb-1.5 block text-sm/[18px] font-medium text-primary md:mb-2.5">
                                Enter URL or domain
                            </label>
                            <div className="flex gap-2.5">
                                <Input
                                    type="text"
                                    value={value}
                                    onChange={(e) => {
                                        setValue(e.target.value)
                                        setResult(null)
                                    }}
                                    placeholder="Enter url or domain"
                                    className="w-full p-2 md:p-3"
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <Button
                                type="submit"
                                loading={loading}
                                disabled={!value}
                            >
                                Check
                            </Button>
                        </div>
                    </div>
                </form>
                {!!result && (
                    <div className="space-y-3.5 lg:space-y-5">
                        {!!result?.dmarcResult?.[0] && (
                            <div className="rounded-lg bg-white p-4">
                                <div>{result?.dmarcResult?.[0] || ''}</div>
                            </div>
                        )}
                        {!!result?.error && (
                            <div className="text-danger">
                                {result?.error || ''}{' '}
                                {!!result?.code
                                    ? `with status ${result?.code}`
                                    : ''}{' '}
                                {!!result?.dmarcDomain
                                    ? `for domain ${result?.dmarcDomain}`
                                    : ''}
                            </div>
                        )}

                        {loading ? (
                            <div className="flex h-10 justify-center">
                                <LoaderCircle className="mt-4 size-4 animate-spin" />
                            </div>
                        ) : (
                            !!result?.result?.length &&
                            !loading && (
                                <div className="overflow-hidden rounded-2xl border border-border">
                                    <Table className="text-base/5">
                                        <TableHeader className="bg-white">
                                            <TableRow className="border-border">
                                                <TableHead className="whitespace-nowrap">
                                                    Tag
                                                </TableHead>
                                                <TableHead className="whitespace-nowrap">
                                                    Value
                                                </TableHead>
                                                <TableHead className="whitespace-nowrap">
                                                    Name
                                                </TableHead>
                                                <TableHead className="whitespace-nowrap">
                                                    Description
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody className="bg-white">
                                            {result?.result?.map(
                                                (r: any, index: number) => {
                                                    return (
                                                        <TableRow
                                                            className="border-border"
                                                            key={index}
                                                        >
                                                            <TableCell className="min-w-[120px]">
                                                                {r?.tag || ''}
                                                            </TableCell>
                                                            <TableCell className="min-w-[250px] max-w-[400px] break-words">
                                                                {r?.value || ''}
                                                            </TableCell>
                                                            <TableCell className="min-w-[220px]">
                                                                {r?.name || ''}
                                                            </TableCell>
                                                            <TableCell className="min-w-[220px]">
                                                                {r?.description ||
                                                                    ''}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                },
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default DMARCValidationForm
