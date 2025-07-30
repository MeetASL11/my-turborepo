'use client'

import React, { useState } from 'react'
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

const DKIMRecordCheckerForm = () => {
    const [value, setValue] = useState('')
    const [selector, setSelector] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const dkimCheck = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(
                `/api/dkim-record-checker?url=${value}&selector=${selector}`,
            )
            const updatedResultObj = {
                ...data,
                result: Array.isArray(data?.dkimResult)
                    ? formatResult(data?.dkimResult)
                    : [],
            }

            setResult(updatedResultObj)
        } catch (err) {
            setResult(null)
        }
        setLoading(false)
    }

    const formatResult = (data: any) => {
        if (!!data?.length) {
            const tmp = data?.[0]?.split(' ').map((item: string) => item.trim())

            const tagDescriptions = (tag: string) => {
                switch (tag.toLowerCase()) {
                    case 'v':
                        return {
                            tagName: 'Version',
                            description:
                                'Identifies the record retrieved as a DKIM record. It must be the first tag in the record.',
                        }
                    case 'k':
                        return {
                            tagName: 'Key type',
                            description: 'The type of the key used by tag (p).',
                        }
                    case 'p':
                        return {
                            tagName: 'Public key',
                            description:
                                'The syntax and semantics of this tag value before being encoded in base64 are defined by the (k) tag.',
                        }
                    case 'n':
                        return {
                            tagName: 'Notes',
                            description: '',
                        }
                    case 's':
                        return {
                            tagName: 'Service type',
                            description: '',
                        }
                    case 'g':
                        return {
                            tagName: 'Group',
                            description: '',
                        }
                    case 'l':
                        return {
                            tagName: 'Body length limit',
                            description: '',
                        }
                    default:
                        return {
                            tagName: '',
                            description: '',
                        }
                }
            }

            const result = tmp.map((tag: string) => {
                //to get tagname and description from tag
                const [key, value] = tag?.split('=')

                return {
                    key: key?.trim(),
                    tagValue:
                        key === 'p'
                            ? value?.trim()?.replace(/;$/, '') +
                              (data?.[1]
                                  ? data?.[1]?.trim()?.replace(/;$/, '')
                                  : '')
                            : value?.trim()?.replace(/;$/, ''),
                    tagName: tagDescriptions(key)?.tagName,
                    description: tagDescriptions(key)?.description,
                }
            })

            return result
        }
    }

    return (
        <div className="container my-5 gap-5 lg:my-14 xl:max-w-7xl">
            <div className="space-y-3.5 rounded-2xl border border-border bg-gray-100 p-4 md:space-y-4 lg:p-8 xl:grid-cols-2">
                <form
                    className="space-y-5"
                    onSubmit={(e) => {
                        e.preventDefault()
                        dkimCheck()
                    }}
                >
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div>
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

                        <div>
                            <label className="mb-1.5 block text-sm/[18px] font-medium text-primary md:mb-2.5">
                                Selector
                            </label>
                            <div className="flex gap-2.5">
                                <Input
                                    type="text"
                                    value={selector}
                                    onChange={(e) => {
                                        setSelector(e.target.value)
                                        setResult(null)
                                    }}
                                    placeholder="Selector"
                                    className="w-full p-2 md:p-3"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <Button
                            type="submit"
                            loading={loading}
                            disabled={!value || !selector}
                        >
                            Check
                        </Button>
                    </div>
                </form>

                {!loading && !!result && Array.isArray(result?.dkimResult) && (
                    <div className="space-y-1 rounded-lg bg-white p-4">
                        <div className="flex gap-3">
                            <div className="text-black">DNS Domain:</div>
                            <div>{result?.dkimDomain || ''}</div>
                        </div>
                        <div className="flex gap-3">
                            <div className="text-black">Selector:</div>
                            <div>{result?.selector || ''}</div>
                        </div>
                        <div className="flex gap-3">
                            <div className="text-black">Domain:</div>
                            <div>{result?.domain || ''}</div>
                        </div>
                        <div className="w-full break-words rounded-md bg-gray-100 p-3">
                            {result?.dkimResult?.[0]?.replace(/;$/, '') +
                                (result?.dkimResult?.[1]?.replace(/;$/, '') ||
                                    '')}
                        </div>
                    </div>
                )}

                <div>
                    {loading ? (
                        <div className="flex h-10 justify-center">
                            <LoaderCircle className="mt-4 size-4 animate-spin" />
                        </div>
                    ) : !!result?.result?.length && !loading ? (
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
                                                        {r?.key || ''}
                                                    </TableCell>
                                                    <TableCell className="min-w-[250px] max-w-[500px] break-words">
                                                        {r?.tagValue || ''}
                                                    </TableCell>
                                                    <TableCell className="min-w-[220px]">
                                                        {r?.description || ''}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        },
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        !loading &&
                        !Array.isArray(result?.dkimResult) &&
                        !!result?.dkimResult && (
                            <div className="text-danger">
                                {result?.dkimResult}
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default DKIMRecordCheckerForm
