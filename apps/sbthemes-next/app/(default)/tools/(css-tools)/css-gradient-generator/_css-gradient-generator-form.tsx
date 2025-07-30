'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import ColorPicker from '@/components/ui/color-picker'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { toast } from '@/components/ui/use-toast'
import helper from '@/lib/helper'
import { DialogTitle } from '@radix-ui/react-dialog'

type IForm = {
    presetGradients: string
    startColor: string
    midColor: string
    endColor: string
    useMidColor: boolean
    gradientType: string
    angle: number
    reverse: boolean
}

const presetGradients = [
    {
        label: 'Warm Feelings',
        value: 'Warm Feelings',
        colorStart: '#8a2387',
        colorMid: '#e94057',
        colorEnd: '#f27121',
    },
    {
        label: 'Shiny Purple',
        value: 'Shiny Purple',
        colorStart: '#4776e6',
        colorEnd: '#8e54e9',
    },
    {
        label: 'Candy Cake',
        value: 'Candy Cake',
        colorStart: '#f857a6',
        colorEnd: '#ff5858',
    },
    {
        label: 'Spring',
        value: 'Spring',
        colorStart: '#a0e9ff',
        colorMid: '#a8f0ff',
        colorEnd: '#c6f5ff',
    },
    {
        label: 'Metallic',
        value: 'Metallic',
        colorStart: '#d7d7d7',
        colorEnd: '#eeeeee',
    },
    {
        label: 'Neon Green',
        value: 'Neon Green',
        colorStart: '#b3ffab',
        colorEnd: '#12fff7',
    },
    {
        label: 'Night Sky',
        value: 'Night Sky',
        colorStart: '#2b2f77',
        colorMid: '#141852',
        colorEnd: '#070b34',
    },
    {
        label: 'Mango Juice',
        value: 'Mango Juice',
        colorStart: '#f09819',
        colorEnd: '#edde5d',
    },
    {
        label: 'Sky is the Limit',
        value: 'Sky is the Limit',
        colorStart: '#1488cc',
        colorEnd: '#2b32b2',
    },
    {
        label: 'Almost Dark',
        value: 'Almost Dark',
        colorStart: '#606c88',
        colorEnd: '#3f4c6b',
    },
    {
        label: 'Pinky',
        value: 'Pinky',
        colorStart: '#efb1ff',
        colorEnd: '#ffe2ff',
    },
    {
        label: 'Red Love',
        value: 'Red Love',
        colorStart: '#c70039',
        colorEnd: '#900c3f',
    },
    {
        label: 'Skin',
        value: 'Skin',
        colorStart: '#ffb99a',
        colorEnd: '#ffdbc5',
    },
    {
        label: 'Amour',
        value: 'Amour',
        colorStart: '#e4406f',
        colorMid: '#ca2374',
        colorEnd: '#9c297f',
    },
    {
        label: 'Sweet',
        value: 'Sweet',
        colorStart: '#ecffc1',
        colorMid: '#ffe6cc',
        colorEnd: '#dfbaf7',
    },
    {
        label: 'Neon Purple',
        value: 'Neon Purple',
        colorStart: '#6900ff',
        colorEnd: '#9951ff',
    },
    {
        label: 'Barbie Girl',
        value: 'Barbie Girl',
        colorStart: '#faa9e0',
        colorMid: '#f8b3eb',
        colorEnd: '#eaa3fc',
    },
]

const CSSGradientGeneratorForm = () => {
    const {
        register,
        control,
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>({
        defaultValues: {
            presetGradients: '',
            startColor: '#474bff',
            midColor: '#ffffff',
            endColor: '#bc48ff',
            useMidColor: false,
            gradientType: 'Linear',
            angle: 0,
            reverse: false,
        },
    })

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

    const shuffleColors = () => {
        setValue('startColor', helper.generateRandomColor())
        setValue('midColor', helper.generateRandomColor())
        setValue('endColor', helper.generateRandomColor())
    }

    const firstColor = !!watch('reverse')
        ? watch('endColor')
        : watch('startColor')
    const lastColor = !!watch('reverse')
        ? watch('startColor')
        : watch('endColor')

    const textCode = `background: ${firstColor};
background: -webkit-${watch('gradientType') === 'Linear' ? 'linear' : 'radial'}-gradient(${watch('gradientType') === 'Linear' ? `${watch('angle')}deg` : 'circle'}, ${firstColor} 0%${watch('useMidColor') ? `, ${watch('midColor')} 50%` : ''}, ${lastColor} 100%);
background: ${watch('gradientType') === 'Linear' ? 'linear' : 'radial'}-gradient(${watch('gradientType') === 'Linear' ? `${watch('angle')}deg` : 'circle'}, ${firstColor} 0%${watch('useMidColor') ? `, ${watch('midColor')} 50%` : ''}, ${lastColor} 100%);`

    return (
        <div className="container">
            <style jsx>
                {`
                    .gradient-bg {
                        ${textCode}
                    }
                `}
            </style>
            <div className="mx-auto my-5 w-full max-w-5xl space-y-8 rounded-2xl border border-border bg-gray-100 p-4 sm:px-5 sm:py-8 lg:mt-14 lg:px-10 lg:py-12">
                <form className="space-y-8">
                    <div className="grid gap-10 lg:grid-cols-3">
                        <div className="flex flex-col items-center justify-center gap-3 text-sm font-medium text-black">
                            <div className="gradient-bg relative flex aspect-square w-full max-w-[400px] items-center justify-center overflow-auto rounded-lg shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]"></div>
                            <div className="flex flex-wrap justify-center gap-2 sm:gap-5 lg:col-span-3">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            type="button"
                                            variant={'outline-general'}
                                        >
                                            View full screen
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="h-full w-full max-w-full border-none bg-transparent px-4 py-8 sm:p-10 [&>.dialog-close]:text-white">
                                        <DialogTitle className="hidden"></DialogTitle>
                                        <div className="gradient-bg relative flex w-full items-center justify-center overflow-auto rounded-lg shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]"></div>
                                    </DialogContent>
                                </Dialog>
                                <Button
                                    type="button"
                                    variant={'outline-general'}
                                    onClick={shuffleColors}
                                >
                                    Shuffle colors
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-10 lg:col-span-2 lg:flex-row">
                            <div className="grow space-y-5">
                                <div>
                                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                        Preset gradients
                                    </label>
                                    <Select
                                        value={watch('presetGradients')}
                                        onValueChange={(val) => {
                                            const selectedPresetGradients =
                                                presetGradients?.find(
                                                    (gradient) =>
                                                        gradient.value === val,
                                                )
                                            setValue('presetGradients', val)
                                            setValue(
                                                'startColor',
                                                selectedPresetGradients?.colorStart ||
                                                    '',
                                            )
                                            setValue(
                                                'midColor',
                                                selectedPresetGradients?.colorMid ||
                                                    '',
                                            )

                                            setValue(
                                                'endColor',
                                                selectedPresetGradients?.colorEnd ||
                                                    '',
                                            )
                                            setValue(
                                                'useMidColor',
                                                !!selectedPresetGradients?.colorMid,
                                            )
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select preset gradients" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {presetGradients.map(
                                                (gradient, key) => {
                                                    return (
                                                        <SelectItem
                                                            key={key}
                                                            value={
                                                                gradient.value
                                                            }
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <span
                                                                    className="block size-6 rounded-lg"
                                                                    style={{
                                                                        background: `linear-gradient(0deg, ${gradient.colorStart} 0%${gradient.colorMid ? `, ${gradient.colorMid} 50%` : ''}, ${gradient.colorEnd} 100%)`,
                                                                    }}
                                                                ></span>
                                                                <span>
                                                                    {
                                                                        gradient.label
                                                                    }
                                                                </span>
                                                            </div>
                                                        </SelectItem>
                                                    )
                                                },
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <ColorPicker
                                    // isRGBA
                                    labelName="Start color"
                                    value={watch('startColor')}
                                    placeholder="#ffffff"
                                    onColorChange={(val: string) => {
                                        setValue('startColor', val)
                                        setValue('presetGradients', '')
                                    }}
                                />
                                {!!watch('useMidColor') && (
                                    <ColorPicker
                                        // isRGBA
                                        labelName="Mid color"
                                        value={watch('midColor')}
                                        placeholder="#ffffff"
                                        onColorChange={(val: string) => {
                                            setValue('midColor', val)
                                            setValue('presetGradients', '')
                                        }}
                                    />
                                )}
                                <ColorPicker
                                    // isRGBA
                                    labelName="End color"
                                    value={watch('endColor')}
                                    placeholder="#ffffff"
                                    onColorChange={(val: string) => {
                                        setValue('endColor', val)
                                        setValue('presetGradients', '')
                                    }}
                                />
                            </div>
                            <div className="grow space-y-5">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="useMidColor"
                                        checked={watch('useMidColor')}
                                        onCheckedChange={(value) => {
                                            setValue(
                                                'useMidColor',
                                                !watch('useMidColor'),
                                            )
                                            setValue('presetGradients', '')
                                        }}
                                    />

                                    <label
                                        htmlFor="useMidColor"
                                        className="text-sm font-medium text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Use mid color
                                    </label>
                                </div>
                                <RadioGroup
                                    className="flex gap-5 py-2 text-sm"
                                    value={watch('gradientType')}
                                    onValueChange={(value) =>
                                        setValue('gradientType', value)
                                    }
                                >
                                    <div className="inline-flex items-center gap-3">
                                        <RadioGroupItem
                                            value="Linear"
                                            id="Linear"
                                        />
                                        <label
                                            htmlFor="Linear"
                                            className="text-sm font-medium text-black"
                                        >
                                            Linear
                                        </label>
                                    </div>
                                    <div className="inline-flex items-center gap-3">
                                        <RadioGroupItem
                                            value="Radial"
                                            id="Radial"
                                        />
                                        <label
                                            htmlFor="Radial"
                                            className="text-sm font-medium text-black"
                                        >
                                            Radial
                                        </label>
                                    </div>
                                </RadioGroup>
                                <div>
                                    <label className="block text-sm font-medium text-black">
                                        Angle
                                    </label>
                                    <div className="mt-1.5 flex items-center gap-3 sm:gap-5">
                                        <Slider
                                            disabled={
                                                watch('gradientType') ===
                                                'Radial'
                                            }
                                            value={[watch('angle')]}
                                            onValueChange={(value) =>
                                                setValue('angle', value[0])
                                            }
                                            min={0}
                                            max={360}
                                            step={1}
                                        />
                                        <span className="min-w-10 shrink-0 text-start">
                                            {watch('angle')}°
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="reverse"
                                        checked={watch('reverse')}
                                        onCheckedChange={(value) =>
                                            setValue(
                                                'reverse',
                                                !watch('reverse'),
                                            )
                                        }
                                    />

                                    <label
                                        htmlFor="reverse"
                                        className="text-sm font-medium text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Reverse
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="prose flex w-full max-w-full overflow-x-auto rounded-xl bg-white px-2 py-3 text-sm/[18px] font-medium text-primary shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)] sm:px-4 lg:col-span-3">
                            <pre className="my-0 bg-white py-0">
                                <code className="text-black">{textCode}</code>
                            </pre>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-3 lg:col-span-3">
                            <Button
                                type="button"
                                variant={'outline-general'}
                                onClick={() => reset()}
                            >
                                Reset
                            </Button>
                            <Button
                                type="button"
                                onClick={() => copyToClipboard(textCode)}
                            >
                                Copy
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CSSGradientGeneratorForm
