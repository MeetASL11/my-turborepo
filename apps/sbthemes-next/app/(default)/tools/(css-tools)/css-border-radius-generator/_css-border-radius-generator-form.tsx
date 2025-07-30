'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Draggable from 'react-draggable'
import { useForm } from 'react-hook-form'

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
import helper from '@/lib/helper'
import { cn } from '@/lib/utils'

type IForm = {
    previewType: string
    width: number
    height: number
    mergeEdgeRadiuses: boolean
    hideGuides: boolean
}

const previewTypes = [
    {
        label: 'Solid Color',
        value: 'color',
    },
    {
        label: 'Gradient',
        value: 'gradient',
    },
    {
        label: 'Image',
        value: 'image',
    },
]

const withoutMergeDots = [
    {
        isRed: false,
        isSquare: false,
        dots: [0.25, 0],
        reverse: false,
        group: 'top',
    },
    {
        isRed: true,
        isSquare: false,
        dots: [0.75, 0],
        reverse: true,
        group: 'top',
    },
    {
        isRed: false,
        isSquare: false,
        dots: [0.75, 1],
        reverse: true,
        group: 'button',
    },
    {
        isRed: true,
        isSquare: false,
        dots: [0.25, 1],
        reverse: false,
        group: 'button',
    },
    {
        isRed: true,
        isSquare: true,
        dots: [0, 0.25],
        reverse: false,
        group: 'left',
    },
    {
        isRed: false,
        isSquare: true,
        dots: [1, 0.25],
        reverse: false,
        group: 'right',
    },
    {
        isRed: true,
        isSquare: true,
        dots: [1, 0.75],
        reverse: true,
        group: 'right',
    },
    {
        isRed: false,
        isSquare: true,
        dots: [0, 0.75],
        reverse: true,
        group: 'left',
    },
]

const mergeDots = [
    {
        isRed: false,
        isSquare: false,
        dots: [0.5, 0],
        group: 'top',
    },
    {
        isRed: false,
        isSquare: false,
        dots: [0.5, 1],
        group: 'button',
    },
    {
        isRed: true,
        isSquare: true,
        dots: [0, 0.5],
        group: 'left',
    },
    {
        isRed: true,
        isSquare: true,
        dots: [1, 0.5],
        group: 'right',
    },
]

const CSSBorderRadiusGeneratorForm = () => {
    const randomImages = helper.randomImages
    const [randomImage, setRandomImage] = useState(
        randomImages[Math.floor(Math.random() * randomImages.length)],
    )
    const clipPathRef = useRef<HTMLDivElement>(null)

    const [maxSize, setMaxSize] = useState({
        width: 892,
        height: 400,
    })

    const [currentDots, setCurrentDots] = useState<
        {
            isRed: boolean
            isSquare: boolean
            dots: [number, number]
            reverse: boolean
            group: string
        }[]
    >(JSON.parse(JSON.stringify(withoutMergeDots)))
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
            previewType: previewTypes[0].value,
            width: 400,
            height: 400,
            mergeEdgeRadiuses: false,
            hideGuides: false,
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

    const textCode = watch('mergeEdgeRadiuses')
        ? `border-radius:${Math.floor(currentDots[0].dots[0] * 100)}% ${Math.floor((1 - currentDots[0].dots[0]) * 100)}% ${Math.floor((1 - currentDots[1].dots[0]) * 100)}% ${Math.floor(currentDots[1].dots[0] * 100)}% / ${Math.floor(currentDots[2].dots[1] * 100)}% ${Math.floor(currentDots[3].dots[1] * 100)}% ${Math.floor((1 - currentDots[3].dots[1]) * 100)}% ${Math.floor((1 - currentDots[2].dots[1]) * 100)}%`
        : `border-radius: ${currentDots
              ?.filter(({ isSquare }) => !isSquare)
              .map(({ dots: [x, y], reverse }) => {
                  return `${Math.floor((reverse ? 1 - x : x) * 100)}%`
              })
              ?.join(' ')} / ${currentDots
              ?.filter(({ isSquare }) => isSquare)
              .map(({ dots: [x, y], reverse }) => {
                  return `${Math.floor((reverse ? 1 - y : y) * 100)}%`
              })
              ?.join(' ')};`

    const updateDimensions = useCallback(() => {
        if (clipPathRef.current) {
            const { width, height } =
                clipPathRef.current.getBoundingClientRect()
            if (watch('width') > width) {
                setValue('width', width)
            }
            if (watch('height') > height) {
                setValue('height', height)
            }
            setMaxSize({ width, height })
        }
    }, [setValue, watch])

    useEffect(() => {
        updateDimensions()
        window.addEventListener('resize', updateDimensions)

        return () => window.removeEventListener('resize', updateDimensions)
    }, [updateDimensions])

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
                    <div className="grid gap-10">
                        <div className="grid gap-2 sm:gap-5 lg:grid-cols-3">
                            <div>
                                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                    Preview type
                                </label>
                                <Select
                                    value={watch('previewType')}
                                    onValueChange={(val) => {
                                        setValue('previewType', val)
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select clip path shape" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {previewTypes.map(
                                            (previewType, key) => {
                                                return (
                                                    <SelectItem
                                                        key={key}
                                                        value={
                                                            previewType.value
                                                        }
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span>
                                                                {
                                                                    previewType.label
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

                            <div>
                                <label className="block text-sm font-medium text-black">
                                    Width
                                </label>
                                <div className="mt-1.5 flex items-center gap-3 sm:gap-5">
                                    <Slider
                                        value={[watch('width')]}
                                        onValueChange={(value) =>
                                            setValue('width', value[0])
                                        }
                                        min={100}
                                        max={maxSize.width}
                                        step={1}
                                    />
                                    <span className="min-w-10 shrink-0 text-start">
                                        {watch('width')}px
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black">
                                    Height
                                </label>
                                <div className="mt-1.5 flex items-center gap-3 sm:gap-5">
                                    <Slider
                                        value={[watch('height')]}
                                        onValueChange={(value) =>
                                            setValue('height', value[0])
                                        }
                                        min={100}
                                        max={maxSize.height}
                                        step={1}
                                    />
                                    <span className="min-w-10 shrink-0 text-start">
                                        {watch('height')}px
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-3 text-sm font-medium text-black">
                            <div className="flex w-full items-center justify-center overflow-auto rounded-lg bg-white p-5 shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]">
                                <div
                                    ref={clipPathRef}
                                    className="flex h-[400px] min-h-[100px] w-full min-w-[100px] items-center justify-center"
                                >
                                    <div
                                        className="relative border-2 border-dashed border-gray/30"
                                        style={{
                                            width: watch('width') + 4,
                                            height: watch('height') + 4,
                                        }}
                                    >
                                        <div
                                            className={cn(
                                                'gradient-bg h-full w-full',
                                                {
                                                    'bg-gray-400':
                                                        watch('previewType') ===
                                                        'color',
                                                    'bg-gradient-to-t from-gray-300 to-gray-100':
                                                        watch('previewType') ===
                                                        'gradient',
                                                    'bg-cover':
                                                        watch('previewType') ===
                                                        'image',
                                                },
                                            )}
                                            style={{
                                                ...{
                                                    width: watch('width'),
                                                    height: watch('height'),
                                                },
                                                ...(watch('previewType') ===
                                                'image'
                                                    ? {
                                                          backgroundImage: `url(${
                                                              randomImage
                                                          })`,
                                                      }
                                                    : {}),
                                            }}
                                        />
                                        {!watch('hideGuides') &&
                                            currentDots?.map(
                                                (
                                                    {
                                                        dots: [x, y],
                                                        isRed,
                                                        isSquare,
                                                        group,
                                                        reverse,
                                                    },
                                                    index,
                                                ) => (
                                                    <Draggable
                                                        key={index}
                                                        bounds={{
                                                            top: 0,
                                                            left: 0,
                                                            right: watch(
                                                                'width',
                                                            ),
                                                            bottom: watch(
                                                                'height',
                                                            ),
                                                        }}
                                                        axis={
                                                            isSquare ? 'y' : 'x'
                                                        }
                                                        onDrag={(e, data) => {
                                                            const sibling =
                                                                currentDots?.find(
                                                                    (dot, i) =>
                                                                        dot.group ===
                                                                            group &&
                                                                        i !==
                                                                            index,
                                                                )
                                                            const siblingX =
                                                                sibling
                                                                    ?.dots[0] as number
                                                            const siblingY =
                                                                sibling
                                                                    ?.dots[1] as number

                                                            const newDots =
                                                                currentDots

                                                            const modifiedX =
                                                                data.x /
                                                                watch('width')
                                                            const modifiedY =
                                                                data.y /
                                                                watch('width')

                                                            newDots[
                                                                index
                                                            ].dots = [
                                                                isSquare
                                                                    ? x
                                                                    : reverse
                                                                      ? modifiedX <
                                                                        siblingX
                                                                          ? siblingX
                                                                          : modifiedX
                                                                      : modifiedX >
                                                                          siblingX
                                                                        ? siblingX
                                                                        : modifiedX,
                                                                isSquare
                                                                    ? reverse
                                                                        ? modifiedY <
                                                                          siblingY
                                                                            ? siblingY
                                                                            : modifiedY
                                                                        : modifiedY >
                                                                            siblingY
                                                                          ? siblingY
                                                                          : modifiedY
                                                                    : y,
                                                            ]

                                                            setCurrentDots([
                                                                ...newDots,
                                                            ])
                                                        }}
                                                        position={{
                                                            x:
                                                                watch('width') *
                                                                x,
                                                            y:
                                                                watch(
                                                                    'height',
                                                                ) * y,
                                                        }}
                                                    >
                                                        <div
                                                            className={cn(
                                                                'absolute -left-2.5 -top-2.5 z-20 size-5 cursor-grab border',
                                                                isRed
                                                                    ? 'border-danger bg-danger/50'
                                                                    : 'border-secondary bg-secondary/50',
                                                                isSquare
                                                                    ? ''
                                                                    : 'rounded-full',
                                                            )}
                                                        />
                                                    </Draggable>
                                                ),
                                            )}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 flex w-full flex-col justify-between gap-2 sm:gap-5 lg:flex-row">
                                <div className="flex flex-wrap items-center gap-2 sm:gap-5 lg:justify-end">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="mergeEdgeRadiuses"
                                            checked={watch('mergeEdgeRadiuses')}
                                            onCheckedChange={(value) => {
                                                setValue(
                                                    'mergeEdgeRadiuses',
                                                    !watch('mergeEdgeRadiuses'),
                                                )
                                                setCurrentDots(
                                                    JSON.parse(
                                                        JSON.stringify(
                                                            value
                                                                ? mergeDots
                                                                : withoutMergeDots,
                                                        ),
                                                    ),
                                                )
                                            }}
                                        />

                                        <label
                                            htmlFor="mergeEdgeRadiuses"
                                            className="text-sm font-medium text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Merge edge radiuses
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="hideGuides"
                                            checked={watch('hideGuides')}
                                            onCheckedChange={(value) => {
                                                setValue(
                                                    'hideGuides',
                                                    !watch('hideGuides'),
                                                )
                                            }}
                                        />

                                        <label
                                            htmlFor="hideGuides"
                                            className="text-sm font-medium text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Hide guides
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="prose flex w-full max-w-full overflow-x-auto rounded-xl bg-white px-2 py-3 text-sm/[18px] font-medium text-primary shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)] sm:px-4">
                            <pre className="my-0 bg-white py-0">
                                <code className="text-black">{textCode}</code>
                            </pre>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <Button
                                type="button"
                                variant={'outline-general'}
                                onClick={() => {
                                    reset()
                                    setCurrentDots(
                                        JSON.parse(
                                            JSON.stringify(withoutMergeDots),
                                        ),
                                    )
                                }}
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

export default CSSBorderRadiusGeneratorForm
