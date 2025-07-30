'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { Copy, Play } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { toast } from '@/components/ui/use-toast'

type IForm = {
    preDefinedEasingFunctions: string
    duration: number
}

const preDefinedEasingFunctions = [
    {
        label: 'linear',
        value: 'linear',
        x1: 0,
        y1: 0,
        x2: 1,
        y2: 1,
    },
    {
        label: 'ease',
        value: 'ease',
        x1: 0.25,
        y1: 0.1,
        x2: 0.25,
        y2: 1,
    },
    {
        label: 'ease-in',
        value: 'ease-in',
        x1: 0.42,
        y1: 0,
        x2: 1,
        y2: 1,
    },
    {
        label: 'ease-out',
        value: 'ease-out',
        x1: 0,
        y1: 0,
        x2: 0.58,
        y2: 1,
    },
    {
        label: 'ease-in-out',
        value: 'ease-in-out',
        x1: 0.42,
        y1: 0,
        x2: 0.58,
        y2: 1,
    },
]

const CSSCubicBezierGeneratorForm = () => {
    const svgRef = useRef(null)

    const defaultCoordinates = {
        x1: 0,
        y1: 0,
        x2: 1,
        y2: 1,
    }
    const [coordinates, setCoordinates] = useState(defaultCoordinates)

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
            preDefinedEasingFunctions: 'linear',
            duration: 1,
        },
    })

    const animateEffect = () => {
        const animation = document.querySelector('.animate-button')
        animation?.classList.add('animate')
        setTimeout(
            () => {
                animation?.classList.remove('animate')
            },
            watch('duration') * 1000,
        )
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

    const textCode = `animation-timing-function: ${watch('preDefinedEasingFunctions') || `cubic-bezier(${coordinates.x1}, ${coordinates.y1}, ${coordinates.x2}, ${coordinates.y2})`};
animation-duration: ${watch('duration')}s;`

    const coordinatesText = `(${coordinates.x1}, ${coordinates.y1}, ${coordinates.x2}, ${coordinates.y2})`

    useEffect(() => {
        const width = 250
        const height = 250
        const margin = { top: 40, right: 40, bottom: 40, left: 40 }

        const svg = d3
            .select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`)

        const bezierCurve = {
            p0: { x: 0, y: height }, // Start point
            p1: { x: coordinates.x1 * width, y: (1 - coordinates.y1) * height }, // First control point (red)
            p2: { x: coordinates.x2 * width, y: (1 - coordinates.y2) * height }, // Second control point (green)
            p3: { x: width, y: 0 }, // End point
        }

        // Draw background rect
        svg.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', width)
            .attr('height', height)
            .attr('fill', '#f0f4ff')

        // Define the Bezier curve line generator
        const bezierLine: d3.Line<[number, number]> = d3
            .line()
            .x((d) => d[0]) // Accessing x from tuple
            .y((d) => d[1]) // Accessing y from tuple
            .curve(d3.curveBasis) // Use curveBasis to simulate Bezier

        // Draw the Bezier curve using tuples
        const curvePoints: [number, number][] = [
            [bezierCurve.p0.x, bezierCurve.p0.y],
            [bezierCurve.p1.x, bezierCurve.p1.y],
            [bezierCurve.p2.x, bezierCurve.p2.y],
            [bezierCurve.p3.x, bezierCurve.p3.y],
        ]

        // Draw the Bezier curve
        svg.append('path')
            .datum(curvePoints) // Pass the curvePoints array directly
            .attr('d', bezierLine as unknown as string) // Type assertion to satisfy TypeScript
            .attr('fill', 'none')
            .attr('stroke', 'blue')
            .attr('stroke-width', 3)

        // Draw control point lines
        svg.append('line')
            .attr('x1', bezierCurve.p0.x)
            .attr('y1', bezierCurve.p0.y)
            .attr('x2', bezierCurve.p1.x)
            .attr('y2', bezierCurve.p1.y)
            .attr('stroke', '#ff4d4f')
            .attr('stroke-width', 1)

        svg.append('line')
            .attr('x1', bezierCurve.p3.x)
            .attr('y1', bezierCurve.p3.y)
            .attr('x2', bezierCurve.p2.x)
            .attr('y2', bezierCurve.p2.y)
            .attr('stroke', '#28a745')
            .attr('stroke-width', 1)

        // Draw control points (red and green)
        svg.append('circle')
            .attr('cx', bezierCurve.p1.x)
            .attr('cy', bezierCurve.p1.y)
            .attr('r', 5)
            .attr('fill', '#ff4d4f')

        svg.append('circle')
            .attr('cx', bezierCurve.p2.x)
            .attr('cy', bezierCurve.p2.y)
            .attr('r', 5)
            .attr('fill', '#28a745')

        svg.append('text')
            .attr('x', bezierCurve.p0.x - 10)
            .attr('y', bezierCurve.p0.y + 15)
            .attr('font-size', '12px')
            .attr('fill', 'black')
            .text('(0,0)')

        svg.append('text')
            .attr('x', bezierCurve.p3.x - 10)
            .attr('y', bezierCurve.p3.y - 10)
            .attr('font-size', '12px')
            .attr('fill', 'black')
            .text('(1,1)')
    }, [coordinates])

    return (
        <div className="cubic-bezier container">
            <style jsx global>
                {`
                    .animate {
                        animation-name: cubic-bezier-animation;
                        ${textCode}
                    }
                `}
            </style>
            <div className="mx-auto my-5 w-full max-w-5xl space-y-8 rounded-2xl border border-border bg-gray-100 p-4 sm:px-5 sm:py-8 lg:mt-14 lg:px-10 lg:py-12">
                <form className="space-y-8">
                    <div className="flex flex-col gap-10 lg:flex-row">
                        <div className="space-y-3 text-sm font-medium text-black">
                            <div className="overflow-x-auto rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]">
                                <div className="relative flex min-w-max items-center justify-center">
                                    <svg
                                        ref={svgRef}
                                        key={JSON.stringify(coordinates)}
                                    />
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="font-semibold">
                                    Cubic bezier coordinates
                                </p>
                                <div className="group flex items-center justify-center gap-2">
                                    <p>{coordinatesText}</p>
                                    <button
                                        type="button"
                                        className="invisible group-hover:visible"
                                        onClick={() =>
                                            copyToClipboard(coordinatesText)
                                        }
                                    >
                                        <Copy className="size-3" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex grow flex-col gap-10 lg:col-span-2">
                            <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
                                <div className="grow space-y-5">
                                    <div>
                                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                            Predefined easing functions
                                        </label>
                                        <Select
                                            value={watch(
                                                'preDefinedEasingFunctions',
                                            )}
                                            onValueChange={(val) => {
                                                const selectedPreDefinedEasingFunctions =
                                                    preDefinedEasingFunctions?.find(
                                                        (gradient) =>
                                                            gradient.value ===
                                                            val,
                                                    )
                                                setValue(
                                                    'preDefinedEasingFunctions',
                                                    val,
                                                )

                                                setCoordinates({
                                                    ...coordinates,
                                                    x1:
                                                        selectedPreDefinedEasingFunctions?.x1 ||
                                                        0,
                                                    y1:
                                                        selectedPreDefinedEasingFunctions?.y1 ||
                                                        0,
                                                    x2:
                                                        selectedPreDefinedEasingFunctions?.x2 ||
                                                        0,
                                                    y2:
                                                        selectedPreDefinedEasingFunctions?.y2 ||
                                                        0,
                                                })
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select predefined easing functions" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {preDefinedEasingFunctions.map(
                                                    (fun, key) => {
                                                        return (
                                                            <SelectItem
                                                                key={key}
                                                                value={
                                                                    fun.value
                                                                }
                                                            >
                                                                {fun.label}
                                                            </SelectItem>
                                                        )
                                                    },
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grow space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-black">
                                            Animation Duration
                                        </label>
                                        <div className="mt-1.5 flex items-center gap-3 sm:gap-5">
                                            <Slider
                                                value={[watch('duration')]}
                                                onValueChange={(value) =>
                                                    setValue(
                                                        'duration',
                                                        value[0],
                                                    )
                                                }
                                                min={0}
                                                max={5}
                                                step={0.1}
                                            />
                                            <span className="min-w-10 shrink-0 text-start">
                                                {watch('duration')}s
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-black">
                                    <div className="size-2 rounded-full bg-success"></div>{' '}
                                    Coordinates of P1 (Green dot)
                                </label>
                                <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
                                    <div className="grow space-y-5">
                                        <div>
                                            <label className="block text-sm font-medium text-black">
                                                X1
                                            </label>
                                            <div className="mt-1.5 flex items-center gap-3 sm:gap-5">
                                                <Slider
                                                    value={[coordinates.x1]}
                                                    onValueChange={(value) => {
                                                        setCoordinates({
                                                            ...coordinates,
                                                            x1: value[0],
                                                        })
                                                        setValue(
                                                            'preDefinedEasingFunctions',
                                                            '',
                                                        )
                                                    }}
                                                    min={0}
                                                    max={1}
                                                    step={0.01}
                                                />
                                                <span className="min-w-10 shrink-0 text-start">
                                                    {coordinates.x1}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grow space-y-5">
                                        <div>
                                            <label className="block text-sm font-medium text-black">
                                                Y1
                                            </label>
                                            <div className="mt-1.5 flex items-center gap-3 sm:gap-5">
                                                <Slider
                                                    value={[coordinates.y1]}
                                                    onValueChange={(value) => {
                                                        setCoordinates({
                                                            ...coordinates,
                                                            y1: value[0],
                                                        })
                                                        setValue(
                                                            'preDefinedEasingFunctions',
                                                            '',
                                                        )
                                                    }}
                                                    min={-2}
                                                    max={2}
                                                    step={0.01}
                                                />
                                                <span className="min-w-10 shrink-0 text-start">
                                                    {coordinates.y1}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-black">
                                    <div className="size-2 rounded-full bg-danger"></div>{' '}
                                    Coordinates of P2 (Red dot)
                                </label>
                                <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
                                    <div className="grow space-y-5">
                                        <div>
                                            <label className="block text-sm font-medium text-black">
                                                X2
                                            </label>
                                            <div className="mt-1.5 flex items-center gap-3 sm:gap-5">
                                                <Slider
                                                    value={[coordinates.x2]}
                                                    onValueChange={(value) => {
                                                        setCoordinates({
                                                            ...coordinates,
                                                            x2: value[0],
                                                        })

                                                        setValue(
                                                            'preDefinedEasingFunctions',
                                                            '',
                                                        )
                                                    }}
                                                    min={0}
                                                    max={1}
                                                    step={0.01}
                                                />
                                                <span className="min-w-10 shrink-0 text-start">
                                                    {coordinates.x2}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grow space-y-5">
                                        <div>
                                            <label className="block text-sm font-medium text-black">
                                                Y2
                                            </label>
                                            <div className="mt-1.5 flex items-center gap-3 sm:gap-5">
                                                <Slider
                                                    value={[coordinates.y2]}
                                                    onValueChange={(value) => {
                                                        setCoordinates({
                                                            ...coordinates,
                                                            y2: value[0],
                                                        })
                                                        setValue(
                                                            'preDefinedEasingFunctions',
                                                            '',
                                                        )
                                                    }}
                                                    min={-2}
                                                    max={2}
                                                    step={0.01}
                                                />
                                                <span className="min-w-10 shrink-0 text-start">
                                                    {coordinates.y2}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full rounded-xl bg-white px-4 py-3 text-sm/[18px] font-medium text-primary shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)] lg:col-span-3">
                        <label className="block text-sm font-medium text-black">
                            Animation preview
                        </label>
                        <div className="relative py-10">
                            <div className="absolute left-0 right-0 top-1/2 z-0 w-full -translate-y-1/2 transform border-b-2 border-dashed border-gray-400"></div>
                            <div className="custom-before custom-after z-1 absolute left-1/3 right-2/3 top-1/2 h-[2px] w-1/3 -translate-y-1/2 transform bg-black"></div>
                            <div className="animate-button z-2 absolute left-1/3 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-secondary bg-secondary">
                                <button
                                    type="button"
                                    className="flex h-full w-full items-center justify-center"
                                    onClick={animateEffect}
                                >
                                    <Play className="h-6 w-6 text-white" />
                                </button>
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
                            onClick={() => {
                                reset()
                                setCoordinates(defaultCoordinates)
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
                </form>
            </div>
        </div>
    )
}

export default CSSCubicBezierGeneratorForm
