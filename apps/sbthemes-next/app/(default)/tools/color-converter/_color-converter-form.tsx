'use client'

import React, { useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import ColorPicker from '@/components/ui/color-picker'
import CopyToClipboard from '@/components/ui/copy-to-clipboard'
import { Input } from '@/components/ui/input'

interface ColorData {
    hex: string
    rgba: string
    hsl: string
    hsv: string
    cmyk?: string
}

const ColorConverter = () => {
    const [state, setState] = useState<{
        colorInput: string
        colorData: ColorData | null
        error: boolean
    }>({
        colorInput: '#5FD1D5',
        colorData: null,
        error: false,
    })

    const parseColor = useCallback((colorString: string) => {
        const tempElement = document.createElement('div')
        tempElement.style.color = colorString

        document.body.appendChild(tempElement)
        const computedColor = getComputedStyle(tempElement).color
        document.body.removeChild(tempElement)

        const rgbaMatch = computedColor.match(
            /(\d+), (\d+), (\d+)(, ([\d.]+))?/,
        )
        if (rgbaMatch) {
            const r = parseInt(rgbaMatch[1])
            const g = parseInt(rgbaMatch[2])
            const b = parseInt(rgbaMatch[3])
            const a = rgbaMatch[5] ? parseFloat(rgbaMatch[5]) : 1
            const hex = rgbaToHex(r, g, b, a)
            const hsl = rgbaToHsl(r, g, b, a)
            const hsv = rgbaToHsv(r, g, b, a)
            const cmyk = rgbaToCmyk(r, g, b)
            return { hex, rgba: computedColor, hsl, hsv, cmyk }
        }
        return null
    }, [])

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = event.target.value.trim()

            if (inputValue === '') {
                setState((prevState) => ({
                    ...prevState,
                    colorInput: '',
                    colorData: null,
                    error: false,
                }))
                return
            }

            const color = parseColor(inputValue)

            if (color) {
                const { hex, rgba, hsl, hsv, cmyk } = color

                setState((prevState) => ({
                    ...prevState,
                    colorInput: inputValue,
                    colorData: {
                        hex,
                        rgba,
                        hsl,
                        hsv,
                        cmyk,
                    },
                    error: false,
                }))
            } else {
                setState((prevState) => ({
                    ...prevState,
                    colorInput: inputValue,
                    colorData: null,
                    error: true,
                }))
            }
        },
        [parseColor],
    )

    useEffect(() => {
        handleChange({
            target: { value: '#5fd1d5' },
        } as React.ChangeEvent<HTMLInputElement>)
    }, [handleChange])

    const rgbaToHex = (r: number, g: number, b: number, a: number) => {
        const alpha = Math.round(a * 255)
            .toString(16)
            .padStart(2, '0')
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}${a !== 1 ? alpha : ''}`
    }

    const rgbaToHsl = (r: number, g: number, b: number, a: number): string => {
        r /= 255
        g /= 255
        b /= 255

        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        const delta = max - min

        let h = 0
        let s = 0
        const l = (max + min) / 2

        if (delta !== 0) {
            s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)

            switch (max) {
                case r:
                    h = (g - b) / delta + (g < b ? 6 : 0)
                    break
                case g:
                    h = (b - r) / delta + 2
                    break
                case b:
                    h = (r - g) / delta + 4
                    break
            }
            h /= 6
        }

        const hPercent = Math.round(h * 360)
        const sPercent = Math.round(s * 100)
        const lPercent = Math.round(l * 100)

        return a < 1
            ? `hsla(${hPercent}, ${sPercent}%, ${lPercent}%, ${a})`
            : `hsl(${hPercent}, ${sPercent}%, ${lPercent}%)`
    }

    const rgbaToHsv = (r: number, g: number, b: number, a: number): string => {
        r /= 255
        g /= 255
        b /= 255
        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        const delta = max - min
        const s = max === 0 ? 0 : delta / max
        const v = max
        let h = 0

        if (max !== min) {
            switch (max) {
                case r:
                    h = (g - b) / delta + (g < b ? 6 : 0)
                    break
                case g:
                    h = (b - r) / delta + 2
                    break
                case b:
                    h = (r - g) / delta + 4
                    break
            }
            h /= 6
        }

        return a < 1
            ? `hsva(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(v * 100)}%, ${a})`
            : `hsv(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(v * 100)}%)`
    }

    const rgbaToCmyk = (r: number, g: number, b: number): string => {
        const c = 1 - r / 255
        const m = 1 - g / 255
        const y = 1 - b / 255
        const k = Math.min(c, m, y)
        const cmyk =
            k === 1
                ? 'cmyk(0%, 0%, 0%, 100%)'
                : `cmyk(${Math.round(((c - k) / (1 - k)) * 100)}%, ${Math.round(((m - k) / (1 - k)) * 100)}%, ${Math.round(((y - k) / (1 - k)) * 100)}%, ${Math.round(k * 100)}%)`
        return cmyk
    }

    return (
        <div className="container my-5 w-full lg:my-14 lg:max-w-5xl">
            <div className="flex grid-cols-1 flex-col-reverse gap-5 rounded-2xl border border-border bg-gray-100 p-4 sm:p-5 lg:grid lg:grid-cols-2 lg:gap-10">
                <div>
                    <div className="mb-4 lg:mb-6">
                        <ColorPicker
                            labelName="Enter your Color"
                            value={state.colorInput}
                            placeholder="#FFFFFF"
                            onColorChange={(val) =>
                                handleChange({
                                    target: { value: val },
                                } as React.ChangeEvent<HTMLInputElement>)
                            }
                        />
                    </div>
                    <div className="space-y-3 lg:space-y-5">
                        <div className="flex gap-1.5 sm:gap-3 items-center">
                            <label className="min-w-12 text-xs sm:min-w-16 sm:text-base font-medium text-black">
                                RGB :
                            </label>
                            <div className="flex grow gap-2">
                                <Input
                                    readOnly
                                    className="w-full p-2 focus-visible:ring-0 md:p-3"
                                    value={state.colorData?.rgba || ''}
                                />
                                <CopyToClipboard
                                    text={state.colorData?.rgba || ''}
                                    tooltipContent="Copy RGBA"
                                />
                            </div>
                        </div>
                        <div className="mb-3 flex gap-1.5 sm:gap-3 items-center">
                            <label className="min-w-12 text-xs sm:min-w-16 sm:text-base font-medium text-black">
                                HEX :
                            </label>
                            <div className="flex grow gap-2">
                                <Input
                                    readOnly
                                    className="w-full p-2 focus-visible:ring-0 md:p-3"
                                    value={state.colorData?.hex || ''}
                                />
                                <CopyToClipboard
                                    text={state.colorData?.hex || ''}
                                    tooltipContent="Copy HEX"
                                />
                            </div>
                        </div>
                        <div className="mb-3 flex gap-1.5 sm:gap-3 items-center">
                              <label className="min-w-12 text-xs sm:min-w-16 sm:text-base font-medium text-black">
                                HSL :
                            </label>
                            <div className="flex grow gap-2">
                                <Input
                                    readOnly
                                    className="w-full p-2 focus-visible:ring-0 md:p-3"
                                    value={state.colorData?.hsl || ''}
                                />
                                <CopyToClipboard
                                    text={state.colorData?.hsl || ''}
                                    tooltipContent="Copy HSL"
                                />
                            </div>
                        </div>
                        <div className="mb-3 flex gap-1.5 sm:gap-3 items-center">
                              <label className="min-w-12 text-xs sm:min-w-16 sm:text-base font-medium text-black">
                                HSV :
                            </label>
                            <div className="flex grow gap-2">
                                <Input
                                    readOnly
                                    className="w-full p-2 focus-visible:ring-0 md:p-3"
                                    value={state.colorData?.hsv || ''}
                                />
                                <CopyToClipboard
                                    text={state.colorData?.hsv || ''}
                                    tooltipContent="Copy HSV"
                                />
                            </div>
                        </div>
                        <div className="mb-3 flex gap-1.5 sm:gap-3 items-center">
                              <label className="min-w-12 text-xs sm:min-w-16 sm:text-base font-medium text-black">
                                CMYK :
                            </label>
                            <div className="flex grow gap-2">
                                <Input
                                    readOnly
                                    className="w-full p-2 focus-visible:ring-0 md:p-3"
                                    value={state.colorData?.cmyk || ''}
                                />
                                <CopyToClipboard
                                    text={state.colorData?.cmyk || ''}
                                    tooltipContent="Copy CMYK"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="shadow-card relative flex items-center justify-center overflow-hidden rounded-xl border border-border bg-white bg-[url(/images/img_bg_transparent.gif)] bg-left-top bg-repeat p-10">
                    <span
                        style={{ backgroundColor: state.colorData?.hex }}
                        className="absolute z-10 h-full w-full outline-0"
                    ></span>
                </div>
            </div>
        </div>
    )
}

export default ColorConverter
