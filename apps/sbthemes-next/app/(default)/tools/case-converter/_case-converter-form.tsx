'use client'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

const textConversionType = [
    { value: 'sentence', label: 'Sentence case' },
    { value: 'lower', label: 'lower case' },
    { value: 'upper', label: 'UPPER CASE' },
    { value: 'capitalized', label: 'Capitalized Case' },
    { value: 'camel', label: 'camelCase' },
    { value: 'constant', label: 'CONSTANT_CASE' },
    { value: 'dot', label: 'dot.case' },
    { value: 'header', label: 'Header-Case' },
    { value: 'param', label: 'param-case' },
    { value: 'pascal', label: 'PascalCase' },
    { value: 'path', label: 'path/case' },
    { value: 'snake', label: 'snake_case' },
]

export default function CaseConverterForm() {
    const [text, setText] = useState('')
    const [convertedText, setConvertedText] = useState('')

    // Define conversion functions
    const conversions: Record<string, (text: string) => string> = {
        sentence: (text) =>
            text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),

        lower: (text) => text.toLowerCase(),

        upper: (text) => text.toUpperCase(),

        capitalized: (text: string) => {
            return text
                .split(/\n/)
                .map((paragraph) => {
                    return paragraph
                        .toLowerCase()
                        .split(' ')
                        .map(
                            (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(' ')
                })
                .join('\n')
        },

        camel: (text: string) => {
            return text
                .replace(/\n/g, ' ')
                .replace(/[^a-zA-Z0-9\s]/g, '')
                .split(' ')
                .filter((word) => word.length > 0)
                .map((word, index) => {
                    if (index === 0) {
                        return word.toLowerCase()
                    }
                    return (
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                })
                .join('')
        },

        constant: (text: string) => {
            return text
                .trim() // Trim leading and trailing spaces
                .replace(/[^a-zA-Z\s-']/g, '')
                .replace(/([a-z])([A-Z])/g, '$1_$2') // Remove non-alphabetic, non-space, and non-dash characters
                .replace(/\s+|[-']/g, '_') // Replace spaces, hyphens, and apostrophes with underscores
                .replace(/^_+|_+$/g, '') // Remove any leading or trailing underscores
                .toUpperCase()
        },

        dot: (text: string) => {
            return text
                .trim() // Trim leading and trailing spaces
                .replace(/[^a-zA-Z\s-']/g, '')
                .replace(/([a-z])([A-Z])/g, '$1.$2') // Remove non-alphabetic, non-space, and non-dash characters
                .replace(/\s+|[-']/g, '.') // Replace spaces, hyphens, and apostrophes with periods
                .replace(/^\.+|\.+$/g, '') // Remove any leading or trailing periods
                .toLowerCase()
        },

        header: (text: string) => {
            return text
                .trim() // Trim leading and trailing spaces
                .replace(/[^a-zA-Z\s-']/g, '')
                .replace(/([a-z])([A-Z])/g, '$1_$2') // Remove non-alphabetic, non-space, and non-dash characters
                .replace(/\s+|[-']/g, '-') // Replace spaces, hyphens, and apostrophes with hyphens
                .replace(/^_+|_+$/g, '') // Remove any leading or trailing hyphens
                .split('-') // Split the string into an array of words based on hyphens
                .map((word) =>
                    word.length > 0
                        ? word.charAt(0).toUpperCase() + word.slice(1)
                        : '',
                ) // Capitalize the first letter of each word, including single letters
                .join('-')
                .replace(/-+$/, '')
        },

        no: (text: string) => {
            return text
                .trim() // Trim leading and trailing spaces
                .replace(/[^a-zA-Z\s-']/g, ' ')
                .replace(/([a-z])([A-Z])/g, '$1 $2') // Remove non-alphabetic, non-space, and non-dash characters
                .replace(/\s+|[-']/g, ' ') // Replace spaces, hyphens, and apostrophes with hyphens
                .replace(/^_+|_+$/g, '') // Remove any leading or trailing hyphens
                .toLowerCase()
        },

        param: (text: string) => {
            return text
                .trim() // Trim leading and trailing spaces
                .replace(/[^a-zA-Z\s-']/g, '')
                .replace(/([a-z])([A-Z])/g, '$1-$2') // Remove non-alphabetic, non-space, and non-dash characters
                .replace(/\s+|[-']/g, '-') // Replace spaces, hyphens, and apostrophes with hyphens
                .replace(/^-+|-+$/g, '') // Remove any leading or trailing hyphens
                .toLowerCase()
        },

        pascal: (text: string) => {
            return text
                .trim() // Trim leading and trailing spaces
                .replace(/[^a-zA-Z\s-']/g, '')
                .replace(/\s+|[-']/g, '-') // Replace spaces, hyphens, and apostrophes with hyphens
                .replace(/^_+|_+$/g, '') // Remove any leading or trailing hyphens
                .split('-') // Split the string into an array of words based on hyphens
                .map((word) =>
                    word.length > 0
                        ? word.charAt(0).toUpperCase() + word.slice(1)
                        : '',
                ) // Capitalize the first letter of each word, including single letters
                .join('')
        },

        path: (text: string) => {
            return text
                .trim() // Trim leading and trailing spaces
                .replace(/[^a-zA-Z\s-']/g, '')
                .replace(/([a-z])([A-Z])/g, '$1/$2') // Remove non-alphabetic, non-space, and non-dash characters
                .replace(/\s+|[-']/g, '/') // Replace spaces, hyphens, and apostrophes with hyphens
                .replace(/\/+$/g, '')
                .toLowerCase()
        },

        snake: (text: string) => {
            return text
                .trim() // Trim leading and trailing spaces
                .replace(/[^a-zA-Z\s-']/g, '')
                .replace(/([a-z])([A-Z])/g, '$1_$2') // Remove non-alphabetic, non-space, and non-dash characters
                .replace(/\s+|[-']/g, '_') // Replace spaces, hyphens, and apostrophes with underscores
                .replace(/^_+|_+$/g, '') // Remove any leading or trailing underscores
                .toLowerCase()
        },
    }

    // Function to handle case conversions
    const handleCaseConversion = (type: string | number) => {
        const convert = conversions[type] || ((text) => text)
        setConvertedText(convert(text))
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(convertedText).then(() => {
            toast({
                title: 'Copied to clipboard!',
                variant: 'success',
            })
        })
    }

    return (
        <div className="container my-5 grid items-start gap-6 lg:my-14 lg:gap-10 xl:grid-cols-2">
            <div className="rounded-2xl border border-border bg-gray-100 p-4 sm:p-5">
                <Textarea
                    value={text}
                    rows={10}
                    placeholder="Paste your text here..."
                    className="text-base/5"
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-black sm:gap-5">
                    {textConversionType.map((type, index: number) => (
                        <Button
                            key={index}
                            type="button"
                            onClick={() => handleCaseConversion(type.value)}
                        >
                            {type.label}
                        </Button>
                    ))}
                </div>
            </div>
            <div className="rounded-2xl border border-border bg-gray-100 p-4 sm:p-5">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-2 md:items-center">
                    <h2 className="text-xl font-semibold text-black">
                        Case Converted Text:
                    </h2>
                    <Button onClick={copyToClipboard} disabled={!convertedText} className='ml-auto'>
                        Copy
                    </Button>
                </div>
                <Textarea
                    value={convertedText}
                    readOnly
                    rows={10}
                    className="pr-10 text-base/5 focus-visible:ring-0 md:pr-1"
                />
            </div>
        </div>
    )
}
