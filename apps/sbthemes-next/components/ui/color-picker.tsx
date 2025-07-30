'use client'
import { useEffect, useState } from 'react'
import { HexColorPicker, RgbaColorPicker } from 'react-colorful'

import { Input } from '@/components/ui/input'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    labelName?: string
    subLabelName?: string
    leftSection?: React.ReactNode
    rightSection?: React.ReactNode
    error?: string
    value?: string
    onColorChange?: (color: string) => void
    isRGBA?: boolean
}

function rgbaStringToObject(rgbaString: string) {
    // Remove 'rgba(', ')' and then split by ',' to extract the values
    const rgbaValues = rgbaString
        .replace('rgba(', '') // Remove 'rgba('
        .replace(')', '') // Remove ')'
        .split(',') // Split by comma

    // Return the object with r, g, b, a properties
    return {
        r: parseInt(rgbaValues[0]),
        g: parseInt(rgbaValues[1]),
        b: parseInt(rgbaValues[2]),
        a: parseFloat(rgbaValues[3]), // Alpha can be a float
    }
}

export default function ColorPicker({
    className,
    type,
    labelName,
    subLabelName,
    leftSection = '',
    rightSection = '',
    error,
    value,
    onColorChange,
    isRGBA = false,
    modal,
    ...props
}: InputProps & { modal?: boolean }) {
    const [color, setColor] = useState<string | undefined>(value || '#000000')

    const updateColor = (val: string) => {
        setColor(val)
        onColorChange && onColorChange(val)
    }

    useEffect(() => {
        setColor(value || '#000000')
    }, [value])

    return (
        <div>
            <label className="block text-sm font-medium text-black">
                {labelName}
            </label>
            <label className="block text-xs text-gray">{subLabelName}</label>
            <div className="mt-1.5 flex w-full">
                <div className="relative w-full">
                    <Popover modal={modal}>
                        <PopoverTrigger asChild>
                            <div
                                className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 rounded-md border border-[#CED4DA]"
                                style={{ backgroundColor: color }}
                            ></div>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit bg-white p-1">
                            {isRGBA ? (
                                <RgbaColorPicker
                                    key={color}
                                    color={
                                        color
                                            ? rgbaStringToObject(
                                                  color || 'rgba(0,0,0,0)',
                                              )
                                            : undefined
                                    }
                                    onChange={(val) => {
                                        updateColor(
                                            `rgba(${val.r},${val.g},${val.b},${val?.a || 1})`,
                                        )
                                    }}
                                />
                            ) : (
                                <HexColorPicker
                                    color={color}
                                    onChange={(val) => {
                                        updateColor(val)
                                    }}
                                />
                            )}
                        </PopoverContent>
                    </Popover>
                    <Input
                        value={color}
                        className={cn(
                            'pl-8',
                            leftSection ? 'rounded-l-none' : '',
                            className,
                        )}
                        {...props}
                        onChange={(e) => updateColor(e.target.value)}
                    />
                </div>
            </div>
            {error && <p className="error mt-1 text-danger">{error}</p>}
        </div>
    )
}
