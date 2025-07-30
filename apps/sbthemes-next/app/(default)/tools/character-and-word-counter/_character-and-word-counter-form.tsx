'use client'

import { useState } from 'react'
import { CircleCheck, CircleMinus, CircleX } from 'lucide-react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'

type IWebAndSocialMediaLimit = {
    name: string
    checkType: string
    minMax: string
    limit: number
    category: string
}

const WebAndSocialMediaLimits: IWebAndSocialMediaLimit[] = [
    {
        name: 'Meta Title',
        checkType: 'Letter',
        minMax: 'Max',
        limit: 55,
        category: 'meta',
    },
    {
        name: 'Meta Description',
        checkType: 'Letter',
        minMax: 'Max',
        limit: 160,
        category: 'meta',
    },
    {
        name: 'Google Ideal Post Content',
        checkType: 'Word',
        minMax: 'Min',
        limit: 300,
        category: 'google',
    },
    {
        name: 'Instagram Captions/Comments',
        checkType: 'Letter',
        minMax: 'Max',
        limit: 2200,
        category: 'instagram',
    },
    {
        name: 'Twitter Post',
        checkType: 'Letter',
        minMax: 'Max',
        limit: 280,
        category: 'twitter',
    },
    {
        name: 'Twitter Username',
        checkType: 'Letter',
        minMax: 'Max',
        limit: 20,
        category: 'twitter',
    },
    {
        name: 'Facebook Wall Post (Truncation)',
        checkType: 'Letter',
        minMax: 'Max',
        limit: 477,
        category: 'facebook',
    },
    {
        name: 'Facebook Wall Post (All)',
        checkType: 'Letter',
        minMax: 'Max',
        limit: 63206,
        category: 'facebook',
    },
    {
        name: 'Facebook Comment',
        checkType: 'Letter',
        minMax: 'Max',
        limit: 8000,
        category: 'facebook',
    },
    {
        name: 'Facebook Page Description',
        checkType: 'Letter',
        minMax: 'Max',
        limit: 255,
        category: 'facebook',
    },
    {
        name: 'Facebook Username',
        checkType: 'Letter',
        minMax: 'Max',
        limit: 50,
        category: 'facebook',
    },
    {
        name: 'Facebook Messenger Message',
        checkType: 'Letter',
        minMax: 'Max',
        limit: 20000,
        category: 'facebook',
    },
    {
        name: 'YouTube Video Title',
        checkType: 'Letter',
        minMax: 'Max',
        limit: 70,
        category: 'youtube',
    },
    {
        name: 'YouTube Video Description',
        checkType: 'Letter',
        minMax: 'Max',
        limit: 5000,
        category: 'youtube',
    },
    {
        name: 'Snapchat Caption',
        checkType: 'Letter',
        minMax: 'Max',
        limit: 250,
        category: 'snapchat',
    },
    {
        name: 'Pinterest Pin Description',
        checkType: 'Letter',
        minMax: 'Max',
        limit: 500,
        category: 'pinterest',
    },
]

export default function CharacterAndWordCounterForm() {
    const [counts, setCounts] = useState({
        words: 0,
        character: 0,
        sentences: 0,
        byte: 0,
    })
    const [text, setText] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = e.target.value

        const wordCount = inputText
            .trim()
            .split(/\s+/)
            .filter((word) => word.length > 0).length

        const characterCount = inputText.length

        const sentenceCount = inputText
            .split(/[.!?]+/)
            .filter((sentence) => sentence.trim().length > 0).length

        const byteCount = new Blob([inputText]).size

        setCounts({
            words: wordCount,
            character: characterCount,
            sentences: sentenceCount,
            byte: byteCount,
        })

        setText(inputText)
    }

    const textStatus = (limit: IWebAndSocialMediaLimit) => {
        const pass = (
            <div className="flex items-center justify-center gap-1.5">
                <CircleCheck className="size-4 fill-success text-white" />
                <span className="font-medium text-success">Pass</span>
            </div>
        )

        const fail = (
            <div className="flex items-center justify-center gap-1.5">
                <CircleX className="size-4 fill-danger text-white" />
                <span className="font-medium text-danger">Fail</span>
            </div>
        )

        if (text.trim() === '') {
            return (
                <div className="flex items-center justify-center gap-1.5">
                    <CircleMinus className="size-4 fill-gray text-white" />
                    <span className="font-medium text-gray">Empty</span>
                </div>
            )
        } else if (limit.minMax === 'Max') {
            if (limit.checkType === 'Word') {
                if (counts.words <= limit.limit) {
                    return pass
                } else {
                    return fail
                }
            } else if (limit.checkType === 'Letter') {
                if (counts.character <= limit.limit) {
                    return pass
                } else {
                    return fail
                }
            }
        } else if (limit.minMax === 'Min') {
            if (limit.checkType === 'Word') {
                if (counts.words >= limit.limit) {
                    return pass
                } else {
                    return fail
                }
            } else if (limit.checkType === 'Letter') {
                if (counts.character >= limit.limit) {
                    return pass
                } else {
                    return fail
                }
            }
        } else {
            return fail
        }
    }

    const filteredLimits =
        selectedCategory === 'all'
            ? WebAndSocialMediaLimits
            : WebAndSocialMediaLimits.filter(
                (limit) => limit.category === selectedCategory,
            )

    return (
        <div className="container my-5 space-y-10 lg:my-14">
            <div className="flex flex-col lg:flex-row items-start gap-5">
                <div className="grow rounded-2xl border border-border bg-gray-100 p-4 sm:p-5">
                    <Textarea
                        rows={5}
                        placeholder="Paste your text here..."
                        className="text-base/5 min-h-44 lg:min-h-[346px]"
                        onChange={handleTextChange}
                    />
                </div>
                <div className="mx-auto grid w-full lg:w-60 shrink-0 grid-cols-2 md:grid-cols-4 lg:grid-cols-1 gap-2 sm:gap-4">
                    <div className="flex grow flex-col overflow-hidden rounded-xl border border-border">
                        <label className="block border-b border-border bg-gray-100 p-1.5 text-sm/4 font-medium text-primary sm:px-4 sm:text-base/[18px]">
                            Sentence :
                        </label>
                        <h2 className="flex grow items-center px-1.5 py-2.5 text-xl font-bold text-black sm:px-4 sm:text-3xl/8">
                            {counts.sentences}
                        </h2>
                    </div>
                    <div className="flex grow flex-col overflow-hidden rounded-xl border border-border">
                        <label className="block border-b border-border bg-gray-100 p-1.5 text-sm/4 font-medium text-primary sm:px-4 sm:text-base/[18px]">
                            Word :
                        </label>
                        <h2 className="flex grow items-center px-1.5 py-2.5 text-xl font-bold text-black sm:px-4 sm:text-3xl/8">
                            {counts.words}
                        </h2>
                    </div>
                    <div className="flex grow flex-col overflow-hidden rounded-xl border border-border">
                        <label className="block border-b border-border bg-gray-100 p-1.5 text-sm/4 font-medium text-primary sm:px-4 sm:text-base/[18px]">
                            Character :
                        </label>
                        <h2 className="flex grow items-center px-1.5 py-2.5 text-xl font-bold text-black sm:px-4 sm:text-3xl/8">
                            {counts.character}
                        </h2>
                    </div>
                    <div className="flex grow flex-col overflow-hidden rounded-xl border border-border">
                        <label className="block border-b border-border bg-gray-100 p-1.5 text-sm/4 font-medium text-primary sm:px-4 sm:text-base/[18px]">
                            Byte size :
                        </label>
                        <h2 className="flex grow items-center px-1.5 py-2.5 text-xl font-bold text-black sm:px-4 sm:text-3xl/8">
                            {counts.byte}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-gray-100 p-4 sm:p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold text-black">
                        Web and Social Media Limits
                    </h2>
                    <Select
                        defaultValue="all"
                        onValueChange={(value) => setSelectedCategory(value)}
                    >
                        <SelectTrigger className="min-w-40 sm:w-auto">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="meta">Meta</SelectItem>
                            <SelectItem value="google">Google</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="twitter">Twitter</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="youtube">YouTube</SelectItem>
                            <SelectItem value="snapchat">Snapchat</SelectItem>
                            <SelectItem value="pinterest">Pinterest</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="overflow-hidden rounded-2xl border border-border">
                    <Table className="whitespace-nowrap text-center text-base/5">
                        <TableHeader className="bg-white">
                            <TableRow className="!border-b-2 border-border">
                                <TableHead className="text-left">
                                    Name
                                </TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Min/Max</TableHead>
                                <TableHead>Limit</TableHead>
                                <TableHead className="w-0">
                                    Current Status
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="bg-white">
                            {filteredLimits.map((limit, key) => {
                                return (
                                    <TableRow
                                        className="border-border"
                                        key={key}
                                    >
                                        <TableCell className="text-left font-medium">
                                            {limit.name}
                                        </TableCell>
                                        <TableCell>{limit.checkType}</TableCell>
                                        <TableCell>{limit.minMax}</TableCell>
                                        <TableCell>{limit.limit}</TableCell>
                                        <TableCell>
                                            {textStatus(limit)}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
