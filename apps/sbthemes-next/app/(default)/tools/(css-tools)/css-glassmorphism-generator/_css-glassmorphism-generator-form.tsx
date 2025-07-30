'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { Dot, Ellipsis, Settings } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import ColorPicker from '@/components/ui/color-picker'
import { Slider } from '@/components/ui/slider'
import { toast } from '@/components/ui/use-toast'
import helper from '@/lib/helper'

type IForm = {
    imageURL: string
    glassColor: string
    blur: number
    opacity: number
    border: boolean
    content: boolean
    basicShapes: boolean
}

const hexToRgb = (hex: string, opacity: number, isBorder = false) => {
    // Remove the '#' if present
    hex = hex.replace(/^#/, '')

    // Parse the r, g, b values from the hex string
    let bigint = parseInt(hex, 16)
    let r = (bigint >> 16) & 255
    let g = (bigint >> 8) & 255
    let b = bigint & 255

    return `rgb(${r}, ${g}, ${b}, ${isBorder ? opacity / 2 : opacity})`
}

const users = [
    {
        name: 'Michael Johnson',
        designation: 'Software Engineer',
        image: '/images/dummy-users/user-1.jpg',
    },
    {
        name: 'Sophia Wilson',
        designation: 'Sales Executive',
        image: '/images/dummy-users/user-2.jpg',
    },
    {
        name: 'William Brown',
        designation: 'Financial Analyst',
        image: '/images/dummy-users/user-3.jpg',
    },
    {
        name: 'Isabella Anderson',
        designation: 'Project Manager',
        image: '/images/dummy-users/user-4.jpg',
    },
]

const CssGlassmorphismGeneratorForm = () => {
    const randomImages = helper.randomImages

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
            imageURL: randomImages[0],
            glassColor: '#ffffff',
            blur: 10,
            opacity: 0.5,
            border: true,
            content: true,
            basicShapes: false,
        },
    })

    const shuffleBackground = () => {
        const randomIndex = Math.floor(Math.random() * randomImages.length)
        setValue('imageURL', randomImages[randomIndex])
    }

    const shuffleGlassColor = () => {
        const randomColor = helper.generateRandomColor()
        setValue('glassColor', randomColor)
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

    const textCode = `background: ${hexToRgb(
        watch('glassColor'),
        watch('opacity'),
    )};
-webkit-backdrop-filter: blur(${watch('blur')}px);
backdrop-filter: blur(${watch('blur')}px);
${watch('border') ? `border: 1px solid ${hexToRgb(watch('glassColor'), watch('opacity'), true)};` : ''}`

    return (
        <div className="container">
            <div className="mx-auto my-5 w-full max-w-5xl space-y-8 rounded-2xl border border-border bg-gray-100 p-4 sm:px-5 sm:py-8 lg:mt-14 lg:px-10 lg:py-12">
                <form className="space-y-8">
                    <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2">
                        <div className="overflow-hidden rounded-lg">
                            <div
                                className="relative h-full w-full bg-cover bg-center bg-no-repeat p-4 sm:p-14"
                                style={{
                                    backgroundImage: !watch('basicShapes')
                                        ? `url(${watch('imageURL')})`
                                        : 'none',
                                    backgroundColor: !!watch('basicShapes')
                                        ? `#0e63e3`
                                        : '',
                                }}
                            >
                                <div
                                    className="relative z-10 h-full min-h-60 rounded-2xl"
                                    style={{
                                        backgroundColor: hexToRgb(
                                            watch('glassColor'),
                                            watch('opacity'),
                                        ),
                                        backdropFilter: `blur(${watch('blur')}px)`,
                                        border: !!watch('border')
                                            ? `1px solid ${hexToRgb(
                                                  watch('glassColor'),
                                                  watch('opacity'),
                                                  true,
                                              )}`
                                            : 'none',
                                    }}
                                >
                                    {!!watch('content') && (
                                        <div className="h-full p-3 text-black sm:p-6">
                                            <div className="flex justify-between gap-3 border-b border-white/50 pb-4">
                                                <p className="font-bold">
                                                    Users
                                                </p>
                                                <span>
                                                    <Settings className="size-4" />
                                                </span>
                                            </div>
                                            <div className="flex h-full w-full flex-col divide-y divide-white/50">
                                                {users.map((user, key) => {
                                                    return (
                                                        <div
                                                            key={key}
                                                            className="flex items-center justify-between gap-3 py-2.5"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <Image
                                                                    src={
                                                                        user.image
                                                                    }
                                                                    width={35}
                                                                    height={35}
                                                                    className="aspect-square size-[35px] shrink-0 rounded-full border"
                                                                    alt={
                                                                        user.name
                                                                    }
                                                                />
                                                                <div>
                                                                    <p className="font-bold">
                                                                        {
                                                                            user?.name
                                                                        }
                                                                    </p>
                                                                    <span className="text-sm">
                                                                        {
                                                                            user.designation
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <span>
                                                                <Ellipsis className="size-4" />
                                                            </span>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {!!watch('basicShapes') && (
                                    <>
                                        <div
                                            className="absolute -left-2.5 top-6 h-[180px] w-[180px] rounded-full"
                                            style={{
                                                background:
                                                    'linear-gradient(45deg, rgb(188, 72, 255) 0%, rgb(255, 0, 61) 100%)',
                                            }}
                                        ></div>
                                        <div
                                            className="absolute right-2 top-5 h-0 w-0 border-solid"
                                            style={{
                                                borderWidth: '0 75px 150px',
                                                borderColor:
                                                    'transparent transparent rgb(71, 211, 255)',
                                                transform: 'rotate(20deg)',
                                                transformOrigin:
                                                    'center center',
                                            }}
                                        ></div>
                                        <div
                                            className="absolute bottom-[-10px] left-1/2 h-[150px] w-[150px] rounded-[8px]"
                                            style={{
                                                transform:
                                                    'translateX(calc(-50% + 48px)) rotate(-20deg)',
                                                background:
                                                    'linear-gradient(45deg, rgb(33, 191, 115) 0%, rgb(255, 172, 12) 100%)',
                                            }}
                                        ></div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="space-y-5">
                            <ColorPicker
                                labelName="Glass color"
                                value={watch('glassColor')}
                                placeholder="#ffffff"
                                onColorChange={(val: string) =>
                                    setValue('glassColor', val)
                                }
                            />
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
                                        min={1}
                                        max={50}
                                        step={1}
                                    />
                                    <span className="shrink-0">
                                        {watch('blur')}px
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black">
                                    Opacity
                                </label>
                                <div className="mt-1.5 flex items-center gap-3 sm:gap-5">
                                    <Slider
                                        value={[watch('opacity')]}
                                        onValueChange={(value) =>
                                            setValue('opacity', value[0])
                                        }
                                        min={0}
                                        max={1}
                                        step={0.01}
                                    />
                                    <span className="shrink-0">
                                        {watch('opacity')}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="border"
                                    checked={watch('border')}
                                    onCheckedChange={(value) =>
                                        setValue('border', !watch('border'))
                                    }
                                />
                                <label
                                    htmlFor="border"
                                    className="text-sm font-medium text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Use border for glass
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="content"
                                    checked={watch('content')}
                                    onCheckedChange={(value) =>
                                        setValue('content', !watch('content'))
                                    }
                                />
                                <label
                                    htmlFor="content"
                                    className="text-sm font-medium text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Show content on glass?
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="basicShapes"
                                    checked={watch('basicShapes')}
                                    onCheckedChange={(value) =>
                                        setValue(
                                            'basicShapes',
                                            !watch('basicShapes'),
                                        )
                                    }
                                />
                                <label
                                    htmlFor="basicShapes"
                                    className="text-sm font-medium text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Use basic shapes for preview
                                </label>
                            </div>
                            {!watch('basicShapes') && (
                                <Button
                                    type="button"
                                    className="w-full"
                                    variant={'outline-general'}
                                    onClick={shuffleBackground}
                                >
                                    Shuffle background
                                </Button>
                            )}
                            <Button
                                type="button"
                                className="w-full"
                                variant={'outline-general'}
                                onClick={shuffleGlassColor}
                            >
                                Shuffle glass color
                            </Button>
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

export default CssGlassmorphismGeneratorForm
