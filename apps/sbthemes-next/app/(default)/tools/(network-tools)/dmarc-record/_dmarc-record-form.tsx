'use client'

import React, { useState } from 'react'
import { Copy, MinusIcon, PlusIcon } from 'lucide-react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import CopyToClipboard from '@/components/ui/copy-to-clipboard'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

const Modes = [
    { value: '0', label: '--' },
    { value: 'none', label: 'None' },
    { value: 'quarantine', label: 'Quarantine' },
    { value: 'reject', label: 'Reject' },
]

const Unit = [
    { value: '0', label: '--' },
    { value: 'k', label: 'KB' },
    { value: 'm', label: 'MB' },
    { value: 'g', label: 'GB' },
    { value: 't', label: 'TB' },
]

const ReportFormat = [
    { value: '0', label: '--' },
    { value: 'afrt', label: 'AFRF' },
]

const Identifier = [
    { value: '0', label: '--' },
    { value: 'r', label: 'Relaxed' },
    { value: 's', label: 'Strict' },
]

type FormFields =
    | 'everything_fails'
    | 'anything_fails'
    | 'dkim_fails'
    | 'spf_fails'

type IAdvanceCheckboxOptions = {
    id: string
    label: string
    key: FormFields
}

const AdvanceCheckboxOptions: IAdvanceCheckboxOptions[] = [
    {
        id: 'everythingFails',
        label: 'Generate reports if everything fails',
        key: 'everything_fails',
    },
    {
        id: 'anythingFails',
        label: 'Generate reports if anything fails',
        key: 'anything_fails',
    },
    {
        id: 'dkimFails',
        label: 'Generate report if DKIM failed',
        key: 'dkim_fails',
    },
    {
        id: 'spfFails',
        label: 'Generate report if SPF failed',
        key: 'spf_fails',
    },
]

type IForm = {
    policy: string
    pct: number
    rua: { email: string; size: number; unit: string }[]
    ruf: { email: string; size: number; unit: string }[]
    subdomain_policy: string
    report_format: string
    everything_fails: boolean
    anything_fails: boolean
    dkim_fails: boolean
    spf_fails: boolean
    reporting_interval: number
    dkim_identifier: string
    spf_identifier: string
}

const defaultValues: IForm = {
    policy: '0',
    pct: 100,
    rua: [{ email: '', size: 0, unit: '0' }],
    ruf: [{ email: '', size: 0, unit: '0' }],
    subdomain_policy: '0',
    report_format: '0',
    everything_fails: false,
    anything_fails: false,
    dkim_fails: false,
    spf_fails: false,
    reporting_interval: 0,
    dkim_identifier: '0',
    spf_identifier: '0',
}

const DMARCRecordForm = () => {
    const [url, setUrl] = useState('')
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
    const [generateRecords, setGenerateRecords] = useState(false)
    const [error, setError] = useState('')
    const [urlInfo, setUrlInfo] = useState<any>(null)

    const { register, control, watch, setValue } = useForm<IForm>({
        defaultValues: defaultValues,
    })

    const {
        fields: ruaFields,
        append: ruaAdd,
        remove: ruaRemove,
    } = useFieldArray({
        control,
        name: 'rua',
    })

    const {
        fields: rufFields,
        append: rufAdd,
        remove: rufRemove,
    } = useFieldArray({
        control,
        name: 'ruf',
    })

    const generateRecord = () => {
        setUrlInfo(null)
        try {
            const info = new URL(url)
            setUrlInfo(info)
            setGenerateRecords(true)
            setError('')
        } catch (error) {
            setError('Invalid URL')
        }
    }

    const generateDMARCString = () => {
        const policy =
            allFormValues?.policy !== '0' ? `;p=${allFormValues?.policy}` : ''
        const pct =
            !!allFormValues?.pct && allFormValues?.policy !== '0'
                ? `;pct=${allFormValues?.pct}`
                : ''
        const subdomainPolicy =
            !!allFormValues?.subdomain_policy &&
            allFormValues?.subdomain_policy !== '0'
                ? `;sp=${allFormValues?.subdomain_policy}`
                : ''
        const rua = allFormValues?.rua
            ?.map((rua) => {
                const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                    rua.email || '',
                )
                return rua.email &&
                    isValidEmail &&
                    rua.size &&
                    !!rua.unit &&
                    rua.unit !== '0'
                    ? `;rua=mailto:${rua.email}!${rua.size}${rua.unit}`
                    : ''
            })
            .filter(Boolean)
            .join('')
        const ruf = allFormValues?.ruf
            ?.map((ruf) => {
                const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                    ruf.email || '',
                )
                return ruf.email &&
                    isValidEmail &&
                    ruf.size &&
                    !!ruf.unit &&
                    ruf.unit !== '0'
                    ? `;ruf=mailto:${ruf.email}!${ruf.size}${ruf.unit}`
                    : ''
            })
            .filter(Boolean)
            .join('')
        const reportFormat =
            !!allFormValues?.report_format &&
            allFormValues?.report_format !== '0'
                ? `;rt=${allFormValues?.report_format}`
                : ''
        const fo = [
            allFormValues?.everything_fails ? '0' : '',
            allFormValues?.anything_fails ? '1' : '',
            allFormValues?.dkim_fails ? 'd' : '',
            allFormValues?.spf_fails ? 's' : '',
        ]
            .filter(Boolean)
            .join(':')
        const failureOptions = fo ? `;fo=${fo}` : ''
        const reportingInterval = !!allFormValues?.reporting_interval
            ? `;ri=${allFormValues?.reporting_interval}`
            : ''
        const dkimIdentifier =
            !!allFormValues?.dkim_identifier &&
            allFormValues?.dkim_identifier !== '0'
                ? `;adkim=${allFormValues?.dkim_identifier}`
                : ''
        const spfIdentifier =
            !!allFormValues?.spf_identifier &&
            allFormValues?.spf_identifier !== '0'
                ? `;aspf=${allFormValues?.spf_identifier}`
                : ''

        return `v=DMARC1${policy}${pct}${subdomainPolicy}${rua}${ruf}${reportFormat}${failureOptions}${reportingInterval}${dkimIdentifier}${spfIdentifier}`
    }

    const copyToClipboard = () => {
        const text = generateDMARCString() || ''
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                toast({
                    title: 'Copied to clipboard!',
                    variant: 'success',
                })
            })
        }
    }

    const allFormValues = useWatch({ control })

    return (
        <div className="container my-5 gap-5 lg:my-14 xl:max-w-7xl">
            <div className="space-y-3.5 rounded-2xl border border-border bg-gray-100 p-4 md:space-y-4 lg:p-8 xl:grid-cols-2">
                <div>
                    <label className="mb-1.5 block text-sm/[18px] font-medium text-primary md:mb-2.5">
                        Enter URL or domain
                    </label>
                    <div className="flex gap-2.5">
                        <Input
                            type="text"
                            value={url}
                            placeholder="Enter url or domain"
                            onChange={(e) => {
                                setUrl(e.target.value)
                                setError('')
                                setUrlInfo(null)
                                setGenerateRecords(false)
                            }}
                        />
                    </div>
                    {!!error && (
                        <div className="mt-1 text-xs text-danger">{error}</div>
                    )}
                </div>

                <div className="text-center">
                    <Button
                        type="button"
                        disabled={!url}
                        onClick={() => generateRecord()}
                    >
                        Generate
                    </Button>
                </div>

                <div
                    className={cn({
                        hidden: !generateRecords || !!error,
                    })}
                >
                    <div className="mb-3">
                        <span className="mr-2 text-xl text-black">
                            Generate for:
                        </span>
                        <span className="text-xl font-bold">
                            {(urlInfo?.hostname || '') +
                                (urlInfo?.pathname || '')}
                        </span>
                    </div>
                    <div className="space-y-2 rounded-lg bg-white p-4 shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]">
                        <div>
                            <span className="mr-2 font-semibold text-black">
                                Type:
                            </span>
                            <span className="font-medium">TXT</span>
                        </div>
                        <div>
                            <span className="mr-2 font-semibold text-black">
                                Host/Name:
                            </span>
                            <span className="font-medium">
                                _dmarc.{urlInfo?.hostname || ''}
                            </span>
                        </div>
                        <div className="flex items-center justify-between gap-5">
                            <div>
                                <span className="mr-2 font-semibold text-black">
                                    Value:
                                </span>
                                <span>{generateDMARCString()}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => copyToClipboard()}
                            >
                                <Copy className={cn('size-4')} />
                            </button>
                        </div>
                    </div>
                </div>

                <form
                    className={cn('space-y-3.5 lg:space-y-5', {
                        hidden: !generateRecords || !!error,
                    })}
                >
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div>
                            <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                Policy/Reporting Mode
                            </label>
                            <Select
                                value={watch('policy')}
                                onValueChange={(val) => setValue('policy', val)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select policy" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Modes.map((type) => (
                                        <SelectItem
                                            key={type.value}
                                            value={type.value}
                                        >
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {allFormValues?.policy !== '0' && (
                            <div>
                                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                    None What percentage to apply this to?
                                </label>
                                <Input
                                    type="number"
                                    value={watch('pct')}
                                    onChange={(e) =>
                                        setValue(
                                            'pct',
                                            parseInt(e.target.value) || 100,
                                        )
                                    }
                                />
                            </div>
                        )}
                    </div>
                    <div className="space-y-3.5 lg:space-y-5">
                        {ruaFields.map((field, index: number) => (
                            <div key={index} className="flex items-end gap-4">
                                <div className="w-full">
                                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                        Email
                                    </label>
                                    <Input
                                        placeholder="example@gamil.com"
                                        type="text"
                                        {...register(`rua.${index}.email`)}
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                        size
                                    </label>
                                    <Input
                                        type="number"
                                        {...register(`rua.${index}.size`)}
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                        Unit
                                    </label>
                                    <Select
                                        value={watch(`rua.${index}.unit`)}
                                        onValueChange={(val) =>
                                            setValue(`rua.${index}.unit`, val)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select unit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Unit.map((type) => (
                                                <SelectItem
                                                    key={type.value}
                                                    value={type.value}
                                                >
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Button
                                        type="button"
                                        onClick={() =>
                                            ruaAdd({
                                                email: '',
                                                size: 0,
                                                unit: '0',
                                            })
                                        }
                                        className={cn(
                                            { hidden: index !== 0 },
                                            'px-3 py-2',
                                        )}
                                    >
                                        <PlusIcon className="size-5" />
                                    </Button>

                                    {ruaFields?.length > 1 && (
                                        <Button
                                            type="button"
                                            onClick={() => ruaRemove(index)}
                                            className={cn(
                                                {
                                                    hidden: index === 0,
                                                },
                                                'px-3 py-2',
                                            )}
                                        >
                                            <MinusIcon className="size-5" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-3.5 lg:space-y-5">
                        {rufFields.map((field, index: number) => (
                            <div key={index} className="flex items-end gap-4">
                                <div className="w-full">
                                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                        Forensic Email
                                    </label>
                                    <Input
                                        placeholder="example@gamil.com"
                                        type="text"
                                        {...register(`ruf.${index}.email`)}
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                        size
                                    </label>
                                    <Input
                                        type="number"
                                        {...register(`ruf.${index}.size`)}
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                        Unit
                                    </label>
                                    <Select
                                        value={watch(`ruf.${index}.unit`)}
                                        onValueChange={(val) =>
                                            setValue(`ruf.${index}.unit`, val)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select unit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Unit.map((type) => (
                                                <SelectItem
                                                    key={type.value}
                                                    value={type.value}
                                                >
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Button
                                        type="button"
                                        onClick={() =>
                                            rufAdd({
                                                email: '',
                                                size: 0,
                                                unit: '0',
                                            })
                                        }
                                        className={cn(
                                            { hidden: index !== 0 },
                                            'px-3 py-2',
                                        )}
                                    >
                                        <PlusIcon className="size-5" />
                                    </Button>

                                    {rufFields?.length > 1 && (
                                        <Button
                                            type="button"
                                            onClick={() => rufRemove(index)}
                                            className={cn(
                                                {
                                                    hidden: index === 0,
                                                },
                                                'px-3 py-2',
                                            )}
                                        >
                                            <MinusIcon className="size-5" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Advance section */}

                    <Button
                        type="button"
                        onClick={() =>
                            setShowAdvancedOptions(!showAdvancedOptions)
                        }
                    >
                        Advance
                    </Button>

                    {showAdvancedOptions && (
                        <div className="space-y-3.5 lg:space-y-5">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div>
                                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                        Policy subdomains
                                    </label>
                                    <Select
                                        value={watch('subdomain_policy')}
                                        onValueChange={(val) =>
                                            setValue('subdomain_policy', val)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select subdomain policy" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Modes.map((type) => (
                                                <SelectItem
                                                    key={type.value}
                                                    value={type.value}
                                                >
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                        Report Format
                                    </label>
                                    <Select
                                        value={watch('report_format')}
                                        onValueChange={(val) =>
                                            setValue('report_format', val)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select report format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {ReportFormat.map((type) => (
                                                <SelectItem
                                                    key={type.value}
                                                    value={type.value}
                                                >
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2 lg:space-y-3">
                                {AdvanceCheckboxOptions.map(
                                    ({ id, label, key }) => (
                                        <div
                                            key={id}
                                            className="flex items-center space-x-2"
                                        >
                                            <Checkbox
                                                id={id}
                                                checked={watch(key)}
                                                onCheckedChange={() =>
                                                    setValue(key, !watch(key))
                                                }
                                            />
                                            <label
                                                htmlFor={id}
                                                className="text-sm font-medium text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {label}
                                            </label>
                                        </div>
                                    ),
                                )}
                            </div>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                <div>
                                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                        Reporting Interval
                                    </label>
                                    <Input
                                        type="number"
                                        value={watch('reporting_interval')}
                                        onChange={(e) =>
                                            setValue(
                                                'reporting_interval',
                                                parseInt(e.target.value) || 100,
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                        DKIM Identifier
                                    </label>
                                    <Select
                                        value={watch('dkim_identifier')}
                                        onValueChange={(val) =>
                                            setValue('dkim_identifier', val)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select dkim identifier" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Identifier.map((type) => (
                                                <SelectItem
                                                    key={type.value}
                                                    value={type.value}
                                                >
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                        SPF Identifier
                                    </label>
                                    <Select
                                        value={watch('spf_identifier')}
                                        onValueChange={(val) =>
                                            setValue('spf_identifier', val)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select spf identifier" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Identifier.map((type) => (
                                                <SelectItem
                                                    key={type.value}
                                                    value={type.value}
                                                >
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default DMARCRecordForm
