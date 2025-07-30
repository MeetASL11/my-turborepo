'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

function Base64StringConverterForm() {
    const [formState, setFormState] = useState({
        encodeInput: '',
        encoded: '',
        decodeInput: '',
        decoded: '',
    })

    const handleInputChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        field: 'encodeInput' | 'decodeInput',
    ) => {
        const value = e.target.value

        setFormState((prevState) => {
            const updatedState = { ...prevState, [field]: value }

            if (field === 'encodeInput') {
                try {
                    updatedState.encoded = window.btoa(value) 
                } catch (error) {
                    updatedState.encoded = 'Error encoding the string'
                }
            } else if (field === 'decodeInput') {
                try {
                    updatedState.decoded = window.atob(value) 
                } catch (error) {
                    updatedState.decoded = ''
                }
            }

            return updatedState
        })
    }

    const copyToClipboard = (text: string) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                toast({
                    title: 'Copied to clipboard!',
                    variant: 'success',
                })
            })
        }
    }

    return (
        <div className="container my-5 grid gap-10 space-y-6 px-4 lg:my-14 lg:space-y-10 xl:grid xl:grid-cols-2 xl:items-start xl:space-y-0">
            <div className="space-y-3 rounded-xl bg-gray-100 px-4 py-5 ring-1 ring-border">
                <div className="text-xl font-semibold text-black">
                    String to base64
                </div>

                {/* <div className="flex items-center gap-2">
                    <label htmlFor="">Encode URL safe</label>
                    <Switch />
                </div> */}
                <label className="mb-2.5 block text-sm/[18px] font-medium">
                    String to encode
                </label>
                <Textarea
                    placeholder="Enter your string to encode"
                    value={formState.encodeInput}
                    onChange={(e) => handleInputChange(e, 'encodeInput')}
                />

                <label className="mb-2.5 block text-sm/[18px] font-medium">
                    Encoded (Base64)
                </label>
                <Textarea
                    placeholder="Base64 encoded output"
                    value={formState.encoded}
                    className="focus-visible:ring-0"
                    readOnly
                />
                <div className="text-center">
                    <Button
                        type="button"
                        onClick={() => copyToClipboard(formState.encoded)}
                        disabled={!formState.encoded}
                    >
                        Copy
                    </Button>
                </div>
            </div>

            <div className="space-y-3 rounded-xl bg-gray-100 px-4 py-5 ring-1 ring-border">
                <div className="text-xl font-semibold text-black">
                    Base64 string to decode
                </div>
                {/* <div className="flex items-center gap-2">
                    <label htmlFor="">Decode URL safe</label>
                    <Switch />
                </div> */}
                <label className="mb-2.5 block text-sm/[18px] font-medium">
                    Base64 to decode
                </label>
                <Textarea
                    placeholder="Enter Base64 string to decode"
                    value={formState.decodeInput}
                    onChange={(e) => handleInputChange(e, 'decodeInput')}
                />

                <label className="mb-2.5 block text-sm/[18px] font-medium">
                    Decoded output
                </label>
                <Textarea
                    placeholder="Decoded string output"
                    value={formState.decoded}
                    className="focus-visible:ring-0"
                    readOnly
                />
                <div className="text-center">
                    <Button
                        type="button"
                        onClick={() => copyToClipboard(formState.decoded)}
                        disabled={!formState.decoded}
                    >
                        Copy
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Base64StringConverterForm
