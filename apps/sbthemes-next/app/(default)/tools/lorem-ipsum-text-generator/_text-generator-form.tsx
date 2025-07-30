'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

function TextGeneratorForm() {
    const [paragraphs, setParagraphs] = useState(3)
    const [wordsPerParagraph, setWordsPerParagraph] = useState(50)
    const [startWithLoremIpsum, setStartWithLoremIpsum] = useState(true)
    const [generatedText, setGeneratedText] = useState('')

    const loremIpsumWords = [
        'lorem',
        'ipsum',
        'dolor',
        'sit',
        'amet',
        'consectetur',
        'adipiscing',
        'elit',
        'sed',
        'do',
        'eiusmod',
        'tempor',
        'incididunt',
        'ut',
        'labore',
        'et',
        'dolore',
        'magna',
        'aliqua',
        'enim',
        'ad',
        'minim',
        'veniam',
        'quis',
        'nostrud',
        'exercitation',
        'ullamco',
        'laboris',
        'nisi',
        'ut',
        'aliquip',
        'ex',
        'ea',
        'commodo',
        'consequat',
        'duis',
        'aute',
        'irure',
        'dolor',
        'in',
        'reprehenderit',
        'in',
        'voluptate',
        'velit',
        'esse',
        'cillum',
        'dolore',
        'eu',
        'fugiat',
        'nulla',
        'pariatur',
        'excepteur',
        'sint',
        'occaecat',
        'cupidatat',
        'non',
        'proident',
        'sunt',
        'in',
        'culpa',
        'qui',
        'officia',
        'deserunt',
        'mollit',
        'anim',
        'id',
        'est',
        'laborum',
    ]

    const generateText = () => {
        let text = ''
        for (let i = 0; i < paragraphs; i++) {
            let paragraph = ''
            for (let j = 0; j < wordsPerParagraph; j++) {
                if (j === 0 && i === 0 && startWithLoremIpsum) {
                    paragraph += 'Lorem ipsum dolor sit amet, '
                    j += 4
                } else {
                    paragraph +=
                        loremIpsumWords[
                            Math.floor(Math.random() * loremIpsumWords.length)
                        ] + ' '
                }
            }
            text += paragraph.trim() + '\n\n'
        }
        setGeneratedText(text.trim())
    }

    const copyToClipboard = () => {
        toast({
            title: 'Copied to clipboard!',
            variant: 'success',
        })

        navigator.clipboard.writeText(generatedText).then(() => {})
    }

    return (
        <div className="container my-5 grid items-start gap-6 lg:my-14 xl:grid-cols-2 xl:gap-10">
            <div className="space-y-8 rounded-2xl border border-border bg-gray-100 px-5 py-8 lg:px-10 lg:py-12">
                <div className="space-y-2.5 text-black">
                    <label className="block shrink-0">
                        Number of Paragraphs:
                    </label>
                    <div className="flex items-center gap-3 sm:gap-5">
                        <Slider
                            value={[paragraphs]}
                            onValueChange={(value) => setParagraphs(value[0])}
                            min={1}
                            max={50}
                            step={1}
                        />
                        <span className="shrink-0">{paragraphs}</span>
                    </div>
                </div>
                <div className="space-y-2.5 text-black">
                    <label className="block shrink-0">
                        Words per Paragraph:
                    </label>
                    <div className="flex items-center gap-3 sm:gap-5">
                        <Slider
                            value={[wordsPerParagraph]}
                            onValueChange={(value) =>
                                setWordsPerParagraph(value[0])
                            }
                            min={10}
                            max={200}
                            step={5}
                        />
                        <span className="shrink-0">{wordsPerParagraph}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-5">
                    <label className="shrink-0 text-black">
                        Start with <span className='italic font-semibold'>&quot;Lorem ipsum&quot;</span>
                    </label>
                    <Switch
                        checked={startWithLoremIpsum}
                        onCheckedChange={setStartWithLoremIpsum}
                    />
                </div>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                    <Button onClick={generateText}>Generate Lorem Ipsum</Button>
                </div>
            </div>
            <div className="rounded-2xl border border-border bg-gray-100 p-4">
                <div className="mb-3 flex flex-wrap items-start justify-between gap-2 md:items-center">
                    <h2 className="text-xl font-semibold text-black">
                        Generated Lorem Ipsum:
                    </h2>
                    <Button onClick={copyToClipboard} disabled={!generatedText}>
                        Copy
                    </Button>
                </div>
                <div className="min-h-52 rounded-xl bg-white px-4 py-3 shadow-3xl whitespace-pre-wrap leading-6">
                    {generatedText}
                </div>
              
            </div>
        </div>
    )
}

export default TextGeneratorForm
