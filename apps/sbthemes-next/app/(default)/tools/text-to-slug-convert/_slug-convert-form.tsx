'use client'
import React, { useCallback, useEffect,useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

const stopWords = [
    'a', 'an', 'the', 'and', 'or', 'but', 'so', 'of', 'in', 'on', 'at', 'to', 
    'for', 'with', 'about', 'by', 'is', 'it', 'this', 'that', 'which', 'as', 
    'be', 'was', 'were', 'are', 'from',
]

export default function SlugConvertForm() {
    const [text, setText] = useState('')
    const [slug, setSlug] = useState('')
    const [separator, setSeparator] = useState('-')
    const [removeStopWords, setRemoveStopWords] = useState(false)
    const [removeNumbers, setRemoveNumbers] = useState(false)


    const convertToSlug = useCallback(
      (inputText: any) => {
        let modifiedText = inputText.toLowerCase()

        if (removeStopWords) {
            modifiedText =  modifiedText
            .split(' ')
            .filter((word:string) => !stopWords.includes(word.toLowerCase()))
            .join(' ')
        }

        if (removeNumbers) {
            modifiedText = modifiedText.replace(/[0-9]/g, '')
        }

        return modifiedText
            .replace(/[^a-z0-9]+/g, separator)
            .replace(new RegExp(`\\${separator}+`, 'g'), separator)
            .replace(new RegExp(`^\\${separator}+|\\${separator}+$`, 'g'), '')
      },
      [removeNumbers, removeStopWords, separator],
    )

    const handleTextChange = (event:any) => {
        setText(event.target.value)
    }

    const handleSample = () => {
        const sampleText = 'Welcome to the sbtheme!!'
        setText(sampleText)
    }

    const handleReset = () => {
        setText('')
        setSlug('')
    }

    const copyToClipboard = () => {
        toast({
            title: 'Copied to clipboard!',
            variant: 'success',
        })
        navigator.clipboard.writeText(slug)
    }

    useEffect(() => {
        setSlug(convertToSlug(text))
    }, [text, separator, removeStopWords, removeNumbers,convertToSlug])

    return (
        <div className="container my-5 grid items-start gap-6 lg:my-14 xl:grid-cols-10 xl:gap-10">
            <div className="rounded-2xl border border-border bg-gray-100 p-4 sm:p-5 xl:col-span-6">
                <Textarea
                    value={text}
                    rows={5}
                    onChange={handleTextChange}
                    placeholder="Paste your text here..."
                    className="text-base/5"
                />
                <div className="flex flex-col items-center justify-center gap-5 py-10">
                    <RadioGroup
                        className="flex flex-col gap-3 rounded-xl border border-border bg-white p-3 text-sm sm:flex-row sm:gap-10"
                        value={separator}
                        onValueChange={setSeparator}
                    >
                        <div className="inline-flex items-center gap-3">
                            <RadioGroupItem value="-" id="dash" />
                            <label htmlFor="dash">Separate with dash (-)</label>
                        </div>
                        <div className="inline-flex items-center gap-3">
                            <RadioGroupItem value="_" id="underscore" />
                            <label htmlFor="underscore">
                                Separate with underscore (_)
                            </label>
                        </div>
                    </RadioGroup>
                    <div className="flex flex-wrap justify-center gap-5 text-black">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remove-stop-words"
                                checked={removeStopWords}
                                onCheckedChange={() => setRemoveStopWords(!removeStopWords)}
                            />
                            <label
                                htmlFor="remove-stop-words"
                                className="text-sm leading-none text-gray"
                            >
                                Remove stop words
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remove-numbers"
                                checked={removeNumbers}
                                onCheckedChange={() => setRemoveNumbers(!removeNumbers)}
                            />
                            <label
                                htmlFor="remove-numbers"
                                className="text-sm leading-none text-gray"
                            >
                                Remove numbers
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 text-black sm:gap-5">
                    <Button type="button" onClick={handleSample}>
                        Sample
                    </Button>
                    <Button
                        type="button"
                        variant={'outline-general'}
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </div>
            </div>
            <div className="rounded-2xl border border-border bg-gray-100 p-4 sm:p-5 xl:col-span-4">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-2 md:items-center">
                    <h2 className="text-xl font-semibold text-black">
                        Generated Slug:
                    </h2>
                    <Button onClick={copyToClipboard} disabled={!slug} className='ml-auto'>
                        Copy
                    </Button>
                </div>
                <Textarea
                    value={slug}
                    readOnly
                    rows={5}
                    className="pr-10 text-base/5 focus-visible:ring-0 md:pr-12"
                />
            </div>
        </div>
    )
}
