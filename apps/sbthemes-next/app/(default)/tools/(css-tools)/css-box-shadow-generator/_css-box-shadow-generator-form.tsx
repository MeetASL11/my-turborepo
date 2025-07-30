'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import ColorPicker from '@/components/ui/color-picker'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

type IForm = {
    boxType: string
    horizontalOffset: number
    verticalOffset: number
    blur: number
    spread: number
    backgroundColor: string
    boxColor: string
    shadowColor: string
    inset: boolean
}

const CSSBoxShadowGeneratorForm = () => {
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
            boxType: 'Box',
            horizontalOffset: 3,
            verticalOffset: 3,
            blur: 10,
            spread: 3,
            backgroundColor: '#ffffff',
            boxColor: '#474bff',
            shadowColor: '#dddddd',
            inset: false,
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

    const textCode = `-webkit-box-shadow: ${watch('inset') ? 'inset ' : ''}${watch('verticalOffset')}px ${watch('horizontalOffset')}px ${watch('blur')}px ${watch('spread')}px ${watch('shadowColor')};
-moz-box-shadow: ${watch('inset') ? 'inset ' : ''}${watch('verticalOffset')}px ${watch('horizontalOffset')}px ${watch('blur')}px ${watch('spread')}px ${watch('shadowColor')};
box-shadow: ${watch('inset') ? 'inset ' : ''}${watch('verticalOffset')}px ${watch('horizontalOffset')}px ${watch('blur')}px ${watch('spread')}px ${watch('shadowColor')};`

    return (
        <div className="container">
            <div className="mx-auto my-5 w-full max-w-5xl space-y-8 rounded-2xl border border-border bg-gray-100 p-4 sm:px-5 sm:py-8 lg:mt-14 lg:px-10 lg:py-12">
                <form className="space-y-8">
                    <div className="grid gap-10 lg:grid-cols-2">
                        <div className="flex flex-col gap-3 text-sm font-medium text-black">
                            <RadioGroup
                                className="flex flex-wrap gap-3.5 py-2 text-sm sm:gap-5"
                                value={watch('boxType')}
                                onValueChange={(value) =>
                                    setValue('boxType', value)
                                }
                            >
                                <div className="inline-flex items-center gap-2 sm:gap-3">
                                    <RadioGroupItem value="Box" id="Box" />
                                    <label htmlFor="Box">Box</label>
                                </div>
                                <div className="inline-flex items-center gap-2 sm:gap-3">
                                    <RadioGroupItem
                                        value="Circle"
                                        id="Circle"
                                    />
                                    <label htmlFor="Circle">Circle</label>
                                </div>
                                <div className="inline-flex items-center gap-2 sm:gap-3">
                                    <RadioGroupItem
                                        value="Header"
                                        id="Header"
                                    />
                                    <label htmlFor="Header">Header</label>
                                </div>
                            </RadioGroup>
                            <div
                                className="relative min-h-72 w-full rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)] sm:min-h-96 lg:aspect-square lg:min-h-max"
                                style={{
                                    backgroundColor: watch('backgroundColor'),
                                }}
                            >
                                <div className="absolute inset-0 size-full overflow-hidden rounded-lg">
                                    <div
                                        className={cn(
                                            'absolute z-[3] transition-all duration-500',
                                            {
                                                'left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-2xl sm:size-56 lg:size-[260px]':
                                                    watch('boxType') === 'Box',
                                                'left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full sm:size-56 lg:size-[260px]':
                                                    watch('boxType') ===
                                                    'Circle',
                                                'left-1/2 top-0 aspect-square h-20 w-full -translate-x-1/2':
                                                    watch('boxType') ===
                                                    'Header',
                                            },
                                        )}
                                        style={{
                                            backgroundColor: watch('boxColor'),
                                            boxShadow: `${watch('inset') ? 'inset ' : ''}${watch('verticalOffset')}px ${watch('horizontalOffset')}px ${watch('blur')}px ${watch('spread')}px ${watch('shadowColor')}`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-black">
                                    Horizontal offset
                                </label>
                                <div className="mt-1.5 flex items-center gap-3 sm:gap-5">
                                    <Slider
                                        value={[watch('horizontalOffset')]}
                                        onValueChange={(value) =>
                                            setValue(
                                                'horizontalOffset',
                                                value[0],
                                            )
                                        }
                                        min={-32}
                                        max={32}
                                        step={0.5}
                                    />
                                    <span className="min-w-8 shrink-0 text-end">
                                        {watch('horizontalOffset')}px
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black">
                                    Vertical offset
                                </label>
                                <div className="mt-1.5 flex items-center gap-3 sm:gap-5">
                                    <Slider
                                        value={[watch('verticalOffset')]}
                                        onValueChange={(value) =>
                                            setValue('verticalOffset', value[0])
                                        }
                                        min={-32}
                                        max={32}
                                        step={0.5}
                                    />
                                    <span className="min-w-8 shrink-0 text-end">
                                        {watch('verticalOffset')}px
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black">
                                    Blur
                                </label>
                                <div className="mt-1.5 flex items-center gap-3 sm:gap-5">
                                    <Slider
                                        value={[watch('blur')]}
                                        onValueChange={(value) =>
                                            setValue('blur', value[0])
                                        }
                                        min={0}
                                        max={32}
                                        step={0.5}
                                    />
                                    <span className="min-w-8 shrink-0 text-end">
                                        {watch('blur')}px
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black">
                                    Spread
                                </label>
                                <div className="mt-1.5 flex items-center gap-3 sm:gap-5">
                                    <Slider
                                        value={[watch('spread')]}
                                        onValueChange={(value) =>
                                            setValue('spread', value[0])
                                        }
                                        min={-32}
                                        max={32}
                                        step={0.5}
                                    />
                                    <span className="min-w-8 shrink-0 text-end">
                                        {watch('spread')}px
                                    </span>
                                </div>
                            </div>

                            <ColorPicker
                                labelName="Background color"
                                value={watch('backgroundColor')}
                                placeholder="#ffffff"
                                onColorChange={(val: string) =>
                                    setValue('backgroundColor', val)
                                }
                            />
                            <ColorPicker
                                labelName="Box color"
                                value={watch('boxColor')}
                                placeholder="#ffffff"
                                onColorChange={(val: string) =>
                                    setValue('boxColor', val)
                                }
                            />
                            <ColorPicker
                                labelName="Shadow color"
                                value={watch('shadowColor')}
                                placeholder="#ffffff"
                                onColorChange={(val: string) =>
                                    setValue('shadowColor', val)
                                }
                            />

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="inset"
                                    checked={watch('inset')}
                                    onCheckedChange={(value) =>
                                        setValue('inset', !watch('inset'))
                                    }
                                />
                                <label
                                    htmlFor="inset"
                                    className="text-sm font-medium text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Inset
                                </label>
                            </div>
                        </div>

                        <div className="prose flex w-full max-w-full overflow-x-auto rounded-xl bg-white px-2 py-3 text-sm/[18px] font-medium text-primary shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)] sm:px-4 lg:col-span-2">
                            <pre className="my-0 bg-white py-0">
                                <code className="text-black">{textCode}</code>
                            </pre>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-3 lg:col-span-2">
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

export default CSSBoxShadowGeneratorForm
