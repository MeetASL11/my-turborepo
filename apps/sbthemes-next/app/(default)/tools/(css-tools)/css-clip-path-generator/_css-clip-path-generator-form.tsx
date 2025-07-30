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
    clipPathShape: string
    width: number
    height: number
    customBackground: boolean
    showOutside: boolean
    hideGuides: boolean
    imageURL: string
    backgroundURL: string
    dots: number[][]
}

const clipPathShapes = [
    {
        label: 'Triangle',
        value: 'triangle',
        dots: [
            [0.5, 0],
            [1, 1],
            [0, 1],
        ],
    },
    {
        label: 'Inverted Triangle',
        value: 'inverted-triangle',
        dots: [
            [0, 0],
            [1, 0],
            [0.5, 1],
        ],
    },
    {
        label: 'Trapezoid',
        value: 'trapezoid',
        dots: [
            [0.25, 0],
            [0.75, 0],
            [1, 1],
            [0, 1],
        ],
    },
    {
        label: 'Inverted Trapezoid',
        value: 'inverterd-trapezoid',
        dots: [
            [0, 0],
            [1, 0],
            [0.75, 1],
            [0.25, 1],
        ],
    },
    {
        label: 'Parallelogram',
        value: 'parallelogram',
        dots: [
            [0.25, 0],
            [1, 0],
            [0.75, 1],
            [0, 1],
        ],
    },
    {
        label: 'Rhombus',
        value: 'rhombus',
        dots: [
            [0.5, 0],
            [1, 0.5],
            [0.5, 1],
            [0, 0.5],
        ],
    },
    {
        label: 'Bevel',
        value: 'bevel',
        dots: [
            [0.15, 0],
            [0.85, 0],
            [1, 0.15],
            [1, 0.85],
            [0.85, 1],
            [0.15, 1],
            [0, 0.85],
            [0, 0.15],
        ],
    },
    {
        label: 'Chevron Left',
        value: 'chevron-left',
        dots: [
            [0.5, 0],
            [1, 0],
            [0.5, 0.5],
            [1, 1],
            [0.5, 1],
            [0, 0.5],
        ],
    },
    {
        label: 'Chevron Right',
        value: 'chevron-right',
        dots: [
            [0, 0],
            [0.5, 0],
            [1, 0.5],
            [0.5, 1],
            [0, 1],
            [0.5, 0.5],
        ],
    },
    {
        label: 'Arrowhead Left',
        value: 'arrowhead-left',
        dots: [
            [1, 0],
            [0.75, 0.5],
            [1, 1],
            [0, 0.5],
        ],
    },
    {
        label: 'Arrowhead Right',
        value: 'arrowhead-right',
        dots: [
            [0, 0],
            [1, 0.5],
            [0, 1],
            [0.25, 0.5],
        ],
    },
    {
        label: 'Arrow Left',
        value: 'arrow-left',
        dots: [
            [0.5, 0],
            [0.5, 0.25],
            [1, 0.25],
            [1, 0.75],
            [0.5, 0.75],
            [0.5, 1],
            [0, 0.5],
        ],
    },
    {
        label: 'Arrow Right',
        value: 'arrow-right',
        dots: [
            [0, 0.25],
            [0.5, 0.25],
            [0.5, 0],
            [1, 0.5],
            [0.5, 1],
            [0.5, 0.75],
            [0, 0.75],
        ],
    },
    {
        label: 'Plus',
        value: 'plus',
        dots: [
            [0.33, 0],
            [0.66, 0],
            [0.66, 0.33],
            [1, 0.33],
            [1, 0.66],
            [0.66, 0.66],
            [0.66, 1],
            [0.33, 1],
            [0.33, 0.66],
            [0, 0.66],
            [0, 0.33],
            [0.33, 0.33],
        ],
    },
    {
        label: 'Cross',
        value: 'cross',
        dots: [
            [0.2, 0],
            [0, 0.2],
            [0.3, 0.5],
            [0, 0.8],
            [0.2, 1],
            [0.5, 0.7],
            [0.8, 1],
            [1, 0.8],
            [0.7, 0.5],
            [1, 0.2],
            [0.8, 0],
            [0.5, 0.3],
        ],
    },
    {
        label: 'Star',
        value: 'star',
        dots: [
            [0.5, 0],
            [0.61, 0.35],
            [0.98, 0.35],
            [0.68, 0.57],
            [0.79, 0.91],
            [0.5, 0.7],
            [0.21, 0.91],
            [0.32, 0.57],
            [0.02, 0.35],
            [0.39, 0.35],
        ],
    },
    {
        label: 'Message Box',
        value: 'message-box',
        dots: [
            [0, 0],
            [1, 0],
            [1, 0.75],
            [0.3, 0.75],
            [0.1, 1],
            [0.1, 0.75],
            [0, 0.75],
        ],
    },
    {
        label: 'Heart',
        value: 'heart',
        dots: [
            [0.3, 0],
            [0.5, 0.15],
            [0.7, 0],
            [0.9, 0.1],
            [1, 0.35],
            [0.8, 0.7],
            [0.5, 1],
            [0.2, 0.7],
            [0, 0.35],
            [0.1, 0.1],
        ],
    },
    {
        label: 'Diamond',
        value: 'diamond',
        dots: [
            [0.25, 0],
            [0.75, 0],
            [1, 0.25],
            [0.5, 1],
            [0, 0.25],
        ],
    },
    {
        label: 'Pentagon',
        value: 'pentagon',
        dots: [
            [0.5, 0],
            [1, 0.44],
            [0.82, 1],
            [0.18, 1],
            [0, 0.44],
        ],
    },
    {
        label: 'Hexagon',
        value: 'hexagon',
        dots: [
            [0.25, 0],
            [0.75, 0],
            [1, 0.5],
            [0.75, 1],
            [0.25, 1],
            [0, 0.5],
        ],
    },
    {
        label: 'Heptagon',
        value: 'heptagon',
        dots: [
            [0.5, 0],
            [0.9, 0.2],
            [1, 0.6],
            [0.75, 1],
            [0.25, 1],
            [0, 0.6],
            [0.1, 0.2],
        ],
    },
    {
        label: 'Octagon',
        value: 'octagon',
        dots: [
            [0.3, 0],
            [0.7, 0],
            [1, 0.3],
            [1, 0.7],
            [0.7, 1],
            [0.3, 1],
            [0, 0.7],
            [0, 0.3],
        ],
    },
    {
        label: 'Nonagon',
        value: 'nonagon',
        dots: [
            [0.5, 0],
            [0.83, 0.12],
            [1, 0.43],
            [0.94, 0.78],
            [0.68, 1],
            [0.32, 1],
            [0.06, 0.78],
            [0, 0.43],
            [0.17, 0.12],
        ],
    },
]

const getCoordinates = (codes: number[][]) => {
    const coordinates = codes.map((code) => {
        const [x, y] = code
        return `${x * 100}% ${y * 100}%`
    })

    return coordinates.join(', ')
}

const CSSClipPathGeneratorForm = () => {
    const randomImages = helper.randomImages

    const clipPathRef = useRef<HTMLDivElement>(null)

    const [maxSize, setMaxSize] = useState({
        width: 892,
        height: 400,
    })
    const [isDragging, setIsDragging] = useState(false)

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
            clipPathShape: clipPathShapes[0].value,
            width: 898,
            height: 400,
            customBackground: false,
            showOutside: false,
            hideGuides: false,
            imageURL: randomImages[0],
            backgroundURL: '',
            dots: clipPathShapes[0].dots,
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

    const shuffleBackground = () => {
        const randomIndex = Math.floor(Math.random() * randomImages.length)
        setValue('imageURL', randomImages[randomIndex])
    }

    const currentClipPathShape = clipPathShapes.find(
        (clipPathShape) => clipPathShape.value === watch('clipPathShape'),
    )

    const currentDots = watch('dots')

    const textCode = `clip-path: polygon(${getCoordinates(currentDots)});`

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
                                    Clip path shape
                                </label>
                                <Select
                                    value={watch('clipPathShape')}
                                    onValueChange={(val) => {
                                        setValue('clipPathShape', val)
                                        setValue(
                                            'dots',
                                            clipPathShapes?.find(
                                                (clipPathShape) =>
                                                    clipPathShape.value === val,
                                            )?.dots!,
                                        )
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select clip path shape" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {clipPathShapes.map(
                                            (clipPathShape, key) => {
                                                return (
                                                    <SelectItem
                                                        key={key}
                                                        value={
                                                            clipPathShape.value
                                                        }
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span
                                                                className="block size-6 bg-black"
                                                                style={{
                                                                    clipPath: `polygon(${getCoordinates(
                                                                        clipPathShape?.dots!,
                                                                    )})`,
                                                                }}
                                                            ></span>
                                                            <span>
                                                                {
                                                                    clipPathShape.label
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
                                    className="flex h-[400px] min-h-[100px] w-full min-w-[100px] items-center justify-center border-2 border-dashed border-gray/30"
                                >
                                    <div className="relative">
                                        <div
                                            className={cn(
                                                'absolute inset-0 flex h-full w-full items-center justify-center bg-repeat-round',
                                                watch('showOutside') ||
                                                    isDragging
                                                    ? 'opacity-25'
                                                    : 'opacity-0',
                                            )}
                                            style={{
                                                backgroundImage: `url(${
                                                    !!watch(
                                                        'customBackground',
                                                    ) &&
                                                    !!watch('backgroundURL')
                                                        ? watch('backgroundURL')
                                                        : watch('imageURL')
                                                })`,
                                            }}
                                        ></div>
                                        <Image
                                            className="h-full w-full bg-primary"
                                            src={
                                                !!watch('customBackground') &&
                                                !!watch('backgroundURL')
                                                    ? watch('backgroundURL')
                                                    : watch('imageURL')
                                            }
                                            alt="random-image"
                                            width={watch('width')}
                                            height={watch('height')}
                                            style={{
                                                clipPath: `polygon(${getCoordinates(
                                                    currentDots,
                                                )})`,
                                                width: watch('width'),
                                                height: watch('height'),
                                            }}
                                        />
                                        {!watch('hideGuides') &&
                                            currentDots?.map(
                                                ([x, y], index) => (
                                                    <Draggable
                                                        key={index}
                                                        bounds="parent"
                                                        onStart={() => {
                                                            setIsDragging(true)
                                                        }}
                                                        onStop={() => {
                                                            setIsDragging(false)
                                                        }}
                                                        onDrag={(e, data) => {
                                                            const newDots =
                                                                currentDots
                                                            newDots[index] = [
                                                                data.x /
                                                                    watch(
                                                                        'width',
                                                                    ),
                                                                data.y /
                                                                    watch(
                                                                        'height',
                                                                    ),
                                                            ]
                                                            setValue(
                                                                'dots',
                                                                newDots,
                                                            )
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
                                                        <div className="absolute -left-2.5 -top-2.5 z-20 size-5 cursor-grab rounded-full border border-secondary bg-secondary/50" />
                                                    </Draggable>
                                                ),
                                            )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full flex-col justify-between gap-2 sm:gap-5 lg:flex-row">
                                <Button
                                    type="button"
                                    variant={'outline-general'}
                                    onClick={shuffleBackground}
                                >
                                    Shuffle image
                                </Button>
                                <div className="flex flex-wrap items-center gap-2 sm:gap-5 lg:justify-end">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="customBackground"
                                            checked={watch('customBackground')}
                                            onCheckedChange={(value) => {
                                                setValue(
                                                    'customBackground',
                                                    !watch('customBackground'),
                                                )
                                            }}
                                        />

                                        <label
                                            htmlFor="customBackground"
                                            className="text-sm font-medium text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Custom background
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="showOutside"
                                            checked={watch('showOutside')}
                                            onCheckedChange={(value) => {
                                                setValue(
                                                    'showOutside',
                                                    !watch('showOutside'),
                                                )
                                            }}
                                        />

                                        <label
                                            htmlFor="showOutside"
                                            className="text-sm font-medium text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Show outside
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
                            {!!watch('customBackground') && (
                                <div className="flex w-full flex-col justify-between gap-2 sm:gap-5 lg:flex-row">
                                    <div className="w-full">
                                        <label className="mb-1.5 block text-sm/[18px] font-medium capitalize text-primary md:mb-2.5">
                                            Background URL
                                        </label>
                                        <div className="flex w-full gap-2.5">
                                            <Input
                                                type="text"
                                                className="w-full"
                                                placeholder="https://example.com/image.png"
                                                {...register('backgroundURL')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
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

export default CSSClipPathGeneratorForm
