'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import JsBarcode from 'jsbarcode'
import { Controller, useForm, useWatch } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

const BarcodeFormats = [
    { value: 'CODE128', label: 'CODE 128' },
    { value: 'UPC', label: 'UPC' },
    { value: 'EAN13', label: 'EAN-13' },
    { value: 'EAN8', label: 'EAN-8' },
    { value: 'EAN5', label: 'EAN-5' },
    { value: 'EAN2', label: 'EAN-2' },
    { value: 'CODE39', label: 'CODE-39' },
    { value: 'ITF14', label: 'ITF-14' },
    { value: 'MSI', label: 'MSI' },
    { value: 'MSI10', label: 'MSI (Mode 10)' },
    { value: 'MSI11', label: 'MSI (Mode 11)' },
    { value: 'MSI1010', label: 'MSI (Mode 1010)' },
    { value: 'MSI1110', label: 'MSI (Mode 1110)' },
    { value: 'codabar', label: 'Codabar' },
    { value: 'pharmacode', label: 'Pharmacode' },
]

type IForm = {
    value: string
    format: string
    line_width: number
    line_height: number
    display_value: boolean
}

const defaultValues: IForm = {
    value: '12345',
    format: 'CODE128',
    line_width: 2,
    line_height: 100,
    display_value: true,
}

const BarcodeGeneratorForm = () => {
    const barcodeRef = useRef(null)
    const [showBarcode, setShowBarcode] = useState(false)

    const {
        register,
        reset,
        watch,
        control,
        formState: { errors },
    } = useForm<IForm>({
        defaultValues: defaultValues,
    })

    const allValues = useWatch({ control })

    const generateBarcode = useCallback(() => {
        if (barcodeRef.current && !!allValues.value) {
            try {
                JsBarcode(barcodeRef.current, allValues.value || '', {
                    format: allValues.format,
                    lineColor: '#000',
                    width: allValues.line_width,
                    height: allValues.line_height,
                    displayValue: allValues.display_value,
                })

                setShowBarcode(true)
            } catch (e) {
                setShowBarcode(false)
                toast({
                    title: 'Invalid input!',
                    variant: 'error',
                })
            }
        } else {
            setShowBarcode(false)
        }
    }, [allValues])

    const downloadBarcode = () => {
        if (barcodeRef.current) {
            const svg = barcodeRef.current
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')

            const svgData = new XMLSerializer().serializeToString(svg)
            const img = new Image()
            img.onload = () => {
                canvas.width = img.width
                canvas.height = img.height
                context?.drawImage(img, 0, 0)

                const pngUrl = canvas.toDataURL('image/png')
                const downloadLink = document.createElement('a')
                downloadLink.href = pngUrl
                downloadLink.download = 'barcode.png'
                downloadLink.click()
            }

            img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
        }
    }

    useEffect(() => {
        generateBarcode()
    }, [generateBarcode])

    return (
        <div className="container my-5 gap-5 lg:my-14 xl:max-w-7xl">
            <div className="space-y-3.5 rounded-2xl border border-border bg-gray-100 p-4 md:space-y-4 lg:p-8 xl:grid-cols-2">
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <form className="space-y-8">
                        <div className="flex flex-wrap gap-5 md:flex-nowrap">
                            <div className="w-full md:w-[70%]">
                                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                    Barcode value
                                </label>
                                <Input
                                    {...register('value', {
                                        required: 'Required',
                                    })}
                                    type="text"
                                    placeholder="Enter value to generate barcode"
                                />
                                {errors?.value && (
                                    <div className="mt-2 text-xs text-danger">
                                        {errors?.value?.message}
                                    </div>
                                )}
                            </div>

                            <div className="w-full md:w-[30%]">
                                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                    Barcode format
                                </label>
                                <Controller
                                    name="format"
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <Select
                                            value={value}
                                            onValueChange={onChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select option" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {BarcodeFormats.map(
                                                    (format) => (
                                                        <SelectItem
                                                            key={format.value}
                                                            value={format.value}
                                                        >
                                                            {format.label}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 items-end gap-7 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-black">
                                    Barcode line width
                                </label>
                                <div className="mt-1.5 flex items-center gap-3 sm:gap-5">
                                    <Controller
                                        name="line_width"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                        }) => (
                                            <Slider
                                                value={[value || 2]}
                                                onValueChange={(newValue) => {
                                                    onChange(newValue[0])
                                                }}
                                                min={1}
                                                max={6}
                                                step={1}
                                            />
                                        )}
                                    />
                                    <span className="min-w-10 shrink-0 text-start">
                                        {watch('line_width')}px
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black">
                                    Barcode line height
                                </label>
                                <div className="mt-1.5 flex items-center gap-3 sm:gap-5">
                                    <Controller
                                        name="line_height"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                        }) => (
                                            <Slider
                                                value={[value || 100]}
                                                onValueChange={(newValue) => {
                                                    onChange(newValue[0])
                                                }}
                                                min={1}
                                                max={200}
                                                step={1}
                                            />
                                        )}
                                    />
                                    <span className="min-w-10 shrink-0 text-start">
                                        {watch('line_height')}px
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Controller
                                name="display_value"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        id="displayValue"
                                        checked={field.value}
                                        onCheckedChange={(value) =>
                                            field.onChange(!field.value)
                                        }
                                    />
                                )}
                            />

                            <label
                                htmlFor="displayValue"
                                className="text-sm font-medium text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Display value
                            </label>
                        </div>
                    </form>

                    <div className="flex flex-col items-center justify-center">
                        <div className="flex min-h-56 w-full min-w-56 flex-col items-center justify-center overflow-x-auto rounded-lg bg-white p-4 px-3 shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]">
                            <svg
                                ref={barcodeRef}
                                className={cn(
                                    { 'h-0 w-0': !showBarcode },
                                    'w-full',
                                )}
                            ></svg>
                        </div>
                        <Button
                            type="button"
                            onClick={downloadBarcode}
                            className={cn({ hidden: !showBarcode }, 'mt-4')}
                        >
                            Download
                        </Button>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-5">
                    <Button type="button" onClick={() => reset()}>
                        Reset
                    </Button>
                    <Button
                        disabled={!watch('value')}
                        type="button"
                        onClick={(e) => {
                            e.preventDefault()
                            generateBarcode()
                        }}
                    >
                        Generate
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default BarcodeGeneratorForm
