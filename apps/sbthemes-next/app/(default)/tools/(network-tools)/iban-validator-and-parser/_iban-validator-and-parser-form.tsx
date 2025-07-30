'use client'
import React, { useEffect, useState } from 'react'
import IBAN from 'iban'
import { CopyIcon } from 'lucide-react'

import CopyToClipboard from '@/components/custom/copy-to-clipboard'
import { Input } from '@/components/ui/input'

const IBANValidatorAndParserForm = () => {
    const [result, setResult] = useState<any>(null)
    const [value, setValue] = useState('')

    const getIBANInfo = (iban: string) => {
        const isValid = IBAN.isValid(iban)
        const countryCode = IBAN.isValid(iban) ? iban.slice(0, 2) : null
        const isQRIBAN = IBAN.isValidBBAN(countryCode || '', iban)
        const bban = IBAN.isValid(iban) ? IBAN.toBBAN(iban) : null
        const friendlyFormat = IBAN.isValid(iban) ? IBAN.printFormat(iban) : ''

        setResult({
            isValid,
            countryCode,
            bban,
            friendlyFormat,
            isQRIBAN,
        })
    }

    useEffect(() => {
        if (!!value) getIBANInfo(value.replaceAll(' ', ''))
    }, [value])

    return (
        <div className="container my-5 max-w-5xl gap-5 lg:my-14">
            <div className="space-y-3.5 rounded-2xl border border-border bg-gray-100 p-4 md:space-y-4 lg:p-8">
                <div>
                    <label className="mb-1.5 block text-sm/[18px] font-medium text-primary md:mb-2.5">
                        Enter domain
                    </label>
                    <div className="flex gap-2.5">
                        <Input
                            type="text"
                            value={value}
                            placeholder="Enter iban"
                            onChange={(e) => {
                                setValue(e.target.value)
                            }}
                            className="w-full p-2 md:p-3"
                        />
                    </div>
                </div>

                {!!value && (
                    <div className="space-y-3.5 rounded-2xl bg-white p-4 text-sm sm:text-base">
                        <div className="space-y-1">
                            <div>Is IBAN valid ?</div>
                            <div className="font-semibold text-black">
                                {result?.isValid ? 'Yes' : 'No'}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div>Is IBAN a QR-IBAN ?</div>
                            <div className="font-semibold text-black">
                                {result?.isQRIBAN ? 'Yes' : 'No'}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div>Country code</div>
                            <div className="font-semibold text-black">
                                {result?.countryCode || 'N/A'}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div>BBAN</div>
                            <div className="flex items-center gap-2.5">
                                <div className="font-semibold text-black">
                                    {result?.bban || 'N/A'}
                                </div>
                                <CopyToClipboard text={result?.bban || ''}>
                                    <CopyIcon className="size-4 sm:size-5" />
                                </CopyToClipboard>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div>IBAN friendly format</div>
                            <div className="flex items-center gap-2.5">
                                <div className="font-semibold text-black">
                                    {result?.friendlyFormat || 'N/A'}
                                </div>
                                <CopyToClipboard
                                    text={result?.friendlyFormat || ''}
                                >
                                    <CopyIcon className="size-4 sm:size-5" />
                                </CopyToClipboard>
                            </div>
                        </div>
                    </div>
                )}
                <div className="rounded-2xl bg-white p-4">
                    <div className="my-3 text-black">Valid IBAN examples</div>
                    <div className="space-y-3.5">
                        <div className="flex items-center gap-2.5 md:gap-5">
                            <div className="text-sm sm:text-base">
                                GB33BUKB20201555555555
                            </div>
                            <CopyToClipboard text="GB33BUKB20201555555555">
                                <CopyIcon className="size-4 sm:size-5" />
                            </CopyToClipboard>
                        </div>
                        <div className="flex items-center gap-2.5 md:gap-5">
                            <div className="text-sm sm:text-base">
                                GB94BARC10201530093459
                            </div>
                            <CopyToClipboard text="GB94BARC10201530093459">
                                <CopyIcon className="size-4 sm:size-5" />
                            </CopyToClipboard>
                        </div>
                        <div className="flex items-center gap-2.5 md:gap-5">
                            <div className="text-sm sm:text-base">
                                DE89370400440532013000
                            </div>
                            <CopyToClipboard text="DE89370400440532013000">
                                <CopyIcon className="size-4 sm:size-5" />
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IBANValidatorAndParserForm
