'use client'
import { useEffect, useState } from 'react'

import ImageShow from '@/app/sharpe/_image-show'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import ColorPicker from '@/components/ui/color-picker'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import useSearchParamsQuery from '@/hooks/useSearchParamsQuery'

export default function ImageForm({ searchQueryValue, files }: any) {
    const [loading, setLoading] = useState(false)
    const { applyFilters } = useSearchParamsQuery()

    const allWebSafeFonts = [
        'Arial',
        'Georgia',
        'Helvetica',
        'Tahoma',
        'TimesNewRoman',
        'Verdana',
    ]

    const textPositions = [
        'top-left',
        'top-center',
        'top-right',
        'center-left',
        'center-center',
        'center-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
    ]

    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState<any>({
        image: '1-min.jpg',
        text: 'Lorem impsum',
        fontSize: 40,
        fontColor: '#000000',
        fontFamily: 'Arial',
        bold: false,
        italic: false,
        underline: false,
        position: 'center-center',
        xPosition: '',
        yPosition: '',
        waterMarkVersion: 'dark',
        ...searchQueryValue,
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const setValue = (key: string, value: any) => {
        setFormData((prevData: any) => ({
            ...prevData,
            [key]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault()
        applyFilters(formData, {
            scroll: true,
            hardLoad: true,
        })
    }

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <div className="w-fill mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8 p-4">
                <Button loading={loading} type="submit" className='ml-auto block'>
                    Submit
                </Button>
                <div>
                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                        Text
                        <span className="text-secondary">*</span>
                    </label>
                    <Textarea
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full"
                    />
                </div>
                <div className="grid gap-8 sm:grid-cols-2">
                    <div className="relative">
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Font family
                            <span className="text-secondary">*</span>
                        </label>
                        <Select
                            value={formData.fontFamily}
                            onValueChange={(val: any) =>
                                setValue('fontFamily', val)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select font family" />
                            </SelectTrigger>
                            <SelectContent>
                                {allWebSafeFonts.map((font, index) => (
                                    <SelectItem key={index} value={font}>
                                        {font}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Font size
                            <span className="text-secondary">*</span>
                        </label>
                        <Input
                            type="text"
                            name="fontSize"
                            value={formData.fontSize}
                            onChange={handleChange}
                            placeholder="Font size"
                            className="w-full"
                        />
                    </div>
                    <div>
                        <ColorPicker
                            labelName="Button Text Color"
                            subLabelName="The button’s text color"
                            value={formData.fontColor}
                            placeholder="#000000"
                            onColorChange={(val: string) =>
                                setValue('fontColor', val)
                            }
                        />
                    </div>
                    <div className="relative">
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Text position
                            <span className="text-secondary">*</span>
                        </label>
                        <Select
                            value={formData.position}
                            onValueChange={(val: any) =>
                                setValue('position', val)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Test position" />
                            </SelectTrigger>
                            <SelectContent>
                                {textPositions.map((position, index) => (
                                    <SelectItem key={index} value={position}>
                                        {position}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="">
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Text X position (%)
                            <span className="text-secondary">*</span>
                        </label>
                        <Input
                            type="text"
                            name="xPosition"
                            value={formData.xPosition}
                            onChange={handleChange}
                            placeholder="50"
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Text Y position (%)
                            <span className="text-secondary">*</span>
                        </label>
                        <Input
                            type="text"
                            name="yPosition"
                            value={formData.yPosition}
                            onChange={handleChange}
                            placeholder="50"
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Watermark version
                            <span className="text-secondary">*</span>
                        </label>
                        <RadioGroup
                            className="flex gap-5"
                            value={formData.waterMarkVersion}
                            onValueChange={(val: any) =>
                                setValue('waterMarkVersion', val)
                            }
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="dark" id="dark" />
                                <label htmlFor="dark">Dark</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="light" id="light" />
                                <label htmlFor="light">Light</label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Font style
                            <span className="text-secondary">*</span>
                        </label>
                        <div className="flex gap-3">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="font-style-bold"
                                    checked={formData.bold}
                                    onCheckedChange={(val: any) =>
                                        setValue('bold', !!val)
                                    }
                                />
                                <label
                                    htmlFor="font-style-bold"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Bold
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="font-style-italic"
                                    checked={formData.italic}
                                    onCheckedChange={(val: any) =>
                                        setValue('italic', !!val)
                                    }
                                />
                                <label
                                    htmlFor="font-style-italic"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Italic
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="font-style-underline"
                                    checked={formData.underline}
                                    onCheckedChange={(val: any) =>
                                        setValue('underline', !!val)
                                    }
                                />
                                <label
                                    htmlFor="font-style-underline"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Underline
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <RadioGroup
                    className="grid gap-5 sm:grid-cols-3 md:grid-cols-4"
                    value={formData.image}
                    onValueChange={(val: any) => setValue('image', val)}
                >
                    {files.map((file: any, index: number) => (
                        <label
                            key={index}
                            htmlFor={file.fileName}
                            className="relative cursor-pointer"
                        >
                            <RadioGroupItem
                                value={file.fileName}
                                id={file.fileName}
                                className="absolute left-2 top-2 z-10"
                            />
                            <ImageShow imgData={file} hideDownload={true} />
                        </label>
                    ))}
                </RadioGroup>
                <Button loading={loading} type="submit">
                    Submit
                </Button>
            </form>
        </div>
    )
}
