'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { RotateCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import CopyToClipboard from '@/components/ui/copy-to-clipboard'
import { Slider } from '@/components/ui/slider'

export default function PasswordGeneratorBlock() {
    const [lengthSlider, setLengthSlider] = useState(33)
    const [useUppercase, setUseUppercase] = useState(true)
    const [useLowercase, setUseLowercase] = useState(true)
    const [useDigits, setUseDigits] = useState(true)
    const [useSymbols, setUseSymbols] = useState(true)
    const [password, setPassword] = useState('')

    const generatePassword = useCallback(() => {
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const lowercase = 'abcdefghijklmnopqrstuvwxyz'
        const digits = '0123456789'
        const symbols = '!@#$%^&*()_+[]{}|;:,.<>?'

        let characters = ''
        if (useUppercase) characters += uppercase
        if (useLowercase) characters += lowercase
        if (useDigits) characters += digits
        if (useSymbols) characters += symbols

        if (!characters) {
            setPassword('Please select at least one option')
            return
        }

        let generatedPassword = ''
        for (let i = 0; i < lengthSlider; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length)
            generatedPassword += characters[randomIndex]
        }

        setPassword(generatedPassword)
    }, [lengthSlider, useUppercase, useLowercase, useDigits, useSymbols])

    useEffect(() => {
        generatePassword()
    }, [generatePassword])

    return (
        <div className="px-4">
            <div className="mx-auto my-5 max-w-4xl rounded-2xl border border-border bg-gray-100 lg:my-14">
                <div className="border-b-2 border-border px-5 py-6">
                    <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
                        <div className="grow break-all text-base font-medium -tracking-tight text-black md:text-xl">
                            {password}
                        </div>
                        <div className="flex shrink-0 items-center gap-5">
                            <div className="flex items-center gap-2 text-xs font-medium text-white">
                                {password.length > 0 &&
                                    password.length <= 8 && (
                                        <div className="rounded bg-danger px-2 py-1">
                                            Weak
                                        </div>
                                    )}
                                {password.length > 8 &&
                                    password.length <= 16 && (
                                        <div className="rounded bg-warning px-2 py-1">
                                            Good
                                        </div>
                                    )}
                                {password.length > 16 && (
                                    <div className="rounded bg-success px-2 py-1">
                                        Strong
                                    </div>
                                )}
                            </div>
                            <Button
                                type="button"
                                variant="outline-shadow"
                                className="px-2.5 bg-white"
                                onClick={generatePassword}
                            >
                                <RotateCw className="size-5" />
                            </Button>
                            <CopyToClipboard
                                btnClass="!p-2.5"
                                text={password}
                                tooltipContent="Copy password"
                                copyIconClass="!size-5"
                            />
                        </div>
                    </div>
                </div>

                <div className="divide-y divide-border p-4 sm:px-10">
                    <div className="flex items-center gap-3 py-6 text-sm text-black sm:gap-5 sm:text-base md:py-10">
                        <div className="shrink-0">Password length:</div>
                        <Slider
                            defaultValue={[lengthSlider]}
                            min={4}
                            max={100}
                            step={1}
                            onValueChange={([value]) => setLengthSlider(value)}
                            className="grow"
                        />
                        <div className="shrink-0">{lengthSlider}</div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-6 py-6 text-black md:gap-10 md:py-10">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="uppercase"
                                checked={useUppercase}
                                onCheckedChange={() =>
                                    setUseUppercase(!useUppercase)
                                }
                            />
                            <label
                                htmlFor="uppercase"
                                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-lg"
                            >
                                ABC{' '}
                                <span className="text-sm text-gray">
                                    (Uppercase)
                                </span>
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="lowercase"
                                checked={useLowercase}
                                onCheckedChange={() =>
                                    setUseLowercase(!useLowercase)
                                }
                            />
                            <label
                                htmlFor="lowercase"
                                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-lg"
                            >
                                abc{' '}
                                <span className="text-sm text-gray">
                                    (Lowercase)
                                </span>
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="digits"
                                checked={useDigits}
                                onCheckedChange={() => setUseDigits(!useDigits)}
                            />
                            <label
                                htmlFor="digits"
                                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-lg"
                            >
                                123{' '}
                                <span className="text-sm text-gray">
                                    (Digits)
                                </span>
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="symbols"
                                checked={useSymbols}
                                onCheckedChange={() =>
                                    setUseSymbols(!useSymbols)
                                }
                            />
                            <label
                                htmlFor="symbols"
                                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-lg"
                            >
                                !@#{' '}
                                <span className="text-sm text-gray">
                                    (Symbols)
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
