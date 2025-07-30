'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import ColorPicker from '@/components/ui/color-picker'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

type IForm = {
    direction: string
    triangleColor: string
    width: number
    height: number
    customTopOrLeft: number
    customBottomOrRight: number
    custom: string
    customChecked: boolean
}

const directions = [
    {
        value: 'Top left',
        borderWidth: '56px 56px 0 0',
        previewBorderWidth: 'width height 0 0',
        borderColor: 'triangleColor transparent transparent transparent',
        custom: 'none',
    },
    {
        value: 'Top',
        borderWidth: '0 28px 56px 28px',
        previewBorderWidth: '0 customBottomOrRight height customTopOrLeft',
        borderColor: 'transparent transparent triangleColor',
        custom: 'width',
    },
    {
        value: 'Top right',
        borderWidth: '0 56px 56px 0',
        previewBorderWidth: '0 width height 0',
        borderColor: 'transparent triangleColor transparent transparent',
        custom: 'none',
    },
    {
        value: 'Left',
        borderWidth: '28px 56px 28px 0',
        previewBorderWidth: 'customTopOrLeft width customBottomOrRight 0',
        borderColor: 'transparent triangleColor transparent transparent',
        custom: 'height',
    },
    {
        value: 'Center',
    },
    {
        value: 'Right',
        borderWidth: '28px 0 28px 56px',
        previewBorderWidth: 'customTopOrLeft 0 customBottomOrRight width',
        borderColor: 'transparent transparent transparent triangleColor',
        custom: 'height',
    },
    {
        value: 'Bottom left',
        borderWidth: '56px 0 0 56px',
        previewBorderWidth: 'height 0 0 width',
        borderColor: 'transparent transparent transparent triangleColor',
        custom: 'none',
    },
    {
        value: 'Bottom',
        borderWidth: '56px 28px 0 28px',
        previewBorderWidth: 'height customBottomOrRight 0 customTopOrLeft',
        borderColor: 'triangleColor transparent transparent',
        custom: 'width',
    },
    {
        value: 'Bottom right',
        borderWidth: '0 0 56px 56px',
        previewBorderWidth: '0 0 height width',
        borderColor: 'transparent transparent triangleColor',
        custom: 'none',
    },
]

const CSSTriangleGeneratorForm = () => {
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
            direction: 'Top left',
            triangleColor: '#000000',
            width: 150,
            height: 150,
            customTopOrLeft: 0,
            customBottomOrRight: 0,
            custom: 'none',
            customChecked: false,
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

    const textCode = `width: 0;
height: 0;
border-style: solid;
border-width: ${directions
        .find((direction) => direction.value === watch('direction'))
        ?.previewBorderWidth?.replaceAll('width', `${watch('width')}px`)
        .replaceAll('height', `${watch('height')}px`)
        .replaceAll('customTopOrLeft', `${watch('customTopOrLeft')}px`)
        .replaceAll('customBottomOrRight', `${watch('customBottomOrRight')}px`)
        .replaceAll('custom', watch('custom'))};
border-color: ${directions?.find((direction) => direction.value === watch('direction'))?.borderColor?.replace('triangleColor', watch('triangleColor'))};`

    return (
        <div className="container">
            <div className="mx-auto my-5 w-full max-w-5xl space-y-8 rounded-2xl border border-border bg-gray-100 p-4 sm:px-5 sm:py-8 lg:mt-14 lg:px-10 lg:py-12">
                <form className="space-y-8">
                    <div className="grid gap-10 lg:grid-cols-3">
                        <div className="flex flex-col items-center justify-center gap-3 text-sm font-medium text-black">
                            <div className="custom-background relative flex aspect-square w-full max-w-[400px] items-center justify-center overflow-auto rounded-lg shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]">
                                <div
                                    className={cn(
                                        'size-0 border transition-all duration-500',
                                    )}
                                    style={{
                                        borderWidth: directions
                                            .find(
                                                (direction) =>
                                                    direction.value ===
                                                    watch('direction'),
                                            )
                                            ?.previewBorderWidth?.replaceAll(
                                                'width',
                                                `${watch('width')}px`,
                                            )
                                            .replaceAll(
                                                'height',
                                                `${watch('height')}px`,
                                            )
                                            .replaceAll(
                                                'customTopOrLeft',
                                                `${watch('customTopOrLeft')}px`,
                                            )
                                            .replaceAll(
                                                'customBottomOrRight',
                                                `${watch('customBottomOrRight')}px`,
                                            )
                                            .replaceAll(
                                                'custom',
                                                watch('custom'),
                                            ),
                                        borderColor: directions
                                            .find(
                                                (direction) =>
                                                    direction.value ===
                                                    watch('direction'),
                                            )
                                            ?.borderColor?.replace(
                                                'triangleColor',
                                                watch('triangleColor'),
                                            ),
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-10 lg:col-span-2 lg:flex-row">
                            <div className="min-w-[220px]">
                                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                    Direction: {watch('direction')}
                                </label>
                                <RadioGroup
                                    className="grid w-fit grid-cols-3 gap-5 py-2 text-sm"
                                    value={watch('direction')}
                                    onValueChange={(value) => {
                                        const direction = directions.find(
                                            (direction) =>
                                                direction.value === value,
                                        )
                                        setValue('direction', value)
                                        if (direction?.custom) {
                                            setValue('custom', direction.custom)
                                            setValue('customChecked', false)
                                            if (direction.custom === 'width') {
                                                setValue(
                                                    'customTopOrLeft',
                                                    watch('width') / 2,
                                                )
                                                setValue(
                                                    'customBottomOrRight',
                                                    watch('width') / 2,
                                                )
                                            }
                                            if (direction.custom === 'height') {
                                                setValue(
                                                    'customTopOrLeft',
                                                    watch('height') / 2,
                                                )
                                                setValue(
                                                    'customBottomOrRight',
                                                    watch('height') / 2,
                                                )
                                            }
                                        }
                                    }}
                                >
                                    {directions.map((direction) => {
                                        if (direction.value === 'Center')
                                            return (
                                                <div
                                                    key={direction.value}
                                                ></div>
                                            )
                                        return (
                                            <div key={direction.value}>
                                                <RadioGroupItem
                                                    className="hidden"
                                                    value={direction.value}
                                                    id={direction.value}
                                                />
                                                <label
                                                    htmlFor={direction.value}
                                                    className={cn(
                                                        'flex size-14 cursor-pointer items-center justify-center overflow-hidden rounded bg-white shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]',
                                                        {
                                                            'border border-primary':
                                                                watch(
                                                                    'direction',
                                                                ) ===
                                                                direction.value,
                                                        },
                                                    )}
                                                >
                                                    <span
                                                        className="size-0 border"
                                                        style={{
                                                            borderWidth:
                                                                direction.borderWidth,
                                                            borderColor:
                                                                direction.borderColor?.replace(
                                                                    'triangleColor',
                                                                    'black',
                                                                ),
                                                        }}
                                                    ></span>
                                                </label>
                                            </div>
                                        )
                                    })}
                                </RadioGroup>
                            </div>
                            <div className="grow space-y-5">
                                <ColorPicker
                                    labelName="Triangle color"
                                    value={watch('triangleColor')}
                                    placeholder="#ffffff"
                                    onColorChange={(val: string) =>
                                        setValue('triangleColor', val)
                                    }
                                />
                                <div>
                                    <label
                                        htmlFor="width"
                                        className="mb-2.5 block text-sm/[18px] font-medium text-primary"
                                    >
                                        Width (px)
                                    </label>
                                    <Input
                                        id="width"
                                        type="text"
                                        placeholder="Width (px)"
                                        {...register('width')}
                                    />
                                </div>
                                {watch('custom') === 'width' && (
                                    <div className="flex flex-col items-center gap-3 lg:flex-row">
                                        <div>
                                            <div className="flex items-center space-x-2 lg:mt-5">
                                                <Checkbox
                                                    id="customChecked"
                                                    checked={watch(
                                                        'customChecked',
                                                    )}
                                                    onCheckedChange={(
                                                        value,
                                                    ) => {
                                                        const direction =
                                                            directions.find(
                                                                (direction) =>
                                                                    direction.value ===
                                                                    watch(
                                                                        'direction',
                                                                    ),
                                                            )
                                                        setValue(
                                                            'customChecked',
                                                            !watch(
                                                                'customChecked',
                                                            ),
                                                        )
                                                        if (
                                                            direction?.custom ===
                                                            'width'
                                                        ) {
                                                            setValue(
                                                                'customTopOrLeft',
                                                                watch('width') /
                                                                    2,
                                                            )
                                                            setValue(
                                                                'customBottomOrRight',
                                                                watch('width') /
                                                                    2,
                                                            )
                                                        }
                                                        if (
                                                            direction?.custom ===
                                                            'height'
                                                        ) {
                                                            setValue(
                                                                'customTopOrLeft',
                                                                watch(
                                                                    'height',
                                                                ) / 2,
                                                            )
                                                            setValue(
                                                                'customBottomOrRight',
                                                                watch(
                                                                    'height',
                                                                ) / 2,
                                                            )
                                                        }
                                                    }}
                                                />
                                                <label
                                                    htmlFor="customChecked"
                                                    className="text-sm font-medium text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Custom
                                                </label>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center gap-3 lg:flex-row">
                                            <div>
                                                <label
                                                    htmlFor="left"
                                                    className="mb-2.5 block text-sm/[18px] font-medium text-primary"
                                                >
                                                    Left (px)
                                                </label>
                                                <Input
                                                    id="left"
                                                    type="text"
                                                    placeholder="Left (px)"
                                                    {...register(
                                                        'customTopOrLeft',
                                                    )}
                                                    className="max-w-[150px]"
                                                    disabled={
                                                        !watch('customChecked')
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="right"
                                                    className="mb-2.5 block text-sm/[18px] font-medium text-primary"
                                                >
                                                    Right (px)
                                                </label>
                                                <Input
                                                    id="right"
                                                    type="text"
                                                    placeholder="Right (px)"
                                                    {...register(
                                                        'customBottomOrRight',
                                                    )}
                                                    className="max-w-[150px]"
                                                    disabled={
                                                        !watch('customChecked')
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                        Height (px)
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Height (px)"
                                        {...register('height')}
                                    />
                                </div>
                                {watch('custom') === 'height' && (
                                    <div className="flex flex-col items-center gap-3 lg:flex-row">
                                        <div>
                                            <div className="flex items-center space-x-2 lg:mt-5">
                                                <Checkbox
                                                    id="customChecked"
                                                    checked={watch(
                                                        'customChecked',
                                                    )}
                                                    onCheckedChange={(
                                                        value,
                                                    ) => {
                                                        const direction =
                                                            directions.find(
                                                                (direction) =>
                                                                    direction.value ===
                                                                    watch(
                                                                        'direction',
                                                                    ),
                                                            )
                                                        setValue(
                                                            'customChecked',
                                                            !watch(
                                                                'customChecked',
                                                            ),
                                                        )
                                                        if (
                                                            direction?.custom ===
                                                            'width'
                                                        ) {
                                                            setValue(
                                                                'customTopOrLeft',
                                                                watch('width') /
                                                                    2,
                                                            )
                                                            setValue(
                                                                'customBottomOrRight',
                                                                watch('width') /
                                                                    2,
                                                            )
                                                        }
                                                        if (
                                                            direction?.custom ===
                                                            'height'
                                                        ) {
                                                            setValue(
                                                                'customTopOrLeft',
                                                                watch(
                                                                    'height',
                                                                ) / 2,
                                                            )
                                                            setValue(
                                                                'customBottomOrRight',
                                                                watch(
                                                                    'height',
                                                                ) / 2,
                                                            )
                                                        }
                                                    }}
                                                />
                                                <label
                                                    htmlFor="customChecked"
                                                    className="text-sm font-medium text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Custom
                                                </label>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center gap-3 lg:flex-row">
                                            <div>
                                                <label
                                                    htmlFor="top"
                                                    className="mb-2.5 block text-sm/[18px] font-medium text-primary"
                                                >
                                                    Top (px)
                                                </label>
                                                <Input
                                                    id="top"
                                                    type="text"
                                                    placeholder="Top (px)"
                                                    {...register(
                                                        'customTopOrLeft',
                                                    )}
                                                    className="max-w-[150px]"
                                                    disabled={
                                                        !watch('customChecked')
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="bottom"
                                                    className="mb-2.5 block text-sm/[18px] font-medium text-primary"
                                                >
                                                    Bottom (px)
                                                </label>
                                                <Input
                                                    id="bottom"
                                                    type="text"
                                                    placeholder="Bottom (px)"
                                                    {...register(
                                                        'customBottomOrRight',
                                                    )}
                                                    className="max-w-[150px]"
                                                    disabled={
                                                        !watch('customChecked')
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
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

export default CSSTriangleGeneratorForm
