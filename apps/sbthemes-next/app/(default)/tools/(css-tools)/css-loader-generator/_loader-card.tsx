'use client'
import React, { useState } from 'react'
import { Copy } from 'lucide-react'
import { FieldArrayWithId, UseFormReturn } from 'react-hook-form'

import {
    filterCSS,
    ILoaderForm,
    sizeOptions,
    speedOptions,
} from '@/app/(default)/tools/(css-tools)/css-loader-generator/_css-loader-generator-form'
import { Button } from '@/components/ui/button'
import ColorPicker from '@/components/ui/color-picker'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from '@/components/ui/use-toast'
import { DialogTitle } from '@radix-ui/react-dialog'

const LoaderCard = ({
    field,
    index,
    form,
}: {
    field: FieldArrayWithId<ILoaderForm, 'loaders', 'id'>
    index: number
    form: UseFormReturn<ILoaderForm, any, undefined>
}) => {
    const [open, setOpen] = useState(false)
    const [activeTab, setActiveTab] = useState('customize')

    const { watch, setValue } = form

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

    const cssTextCode = filterCSS(field.code, {
        size: watch(`loaders.${index}.size`),
        speed: watch(`loaders.${index}.speed`),
        primaryColor: watch(`loaders.${index}.primaryColor`),
        secondaryColor: watch(`loaders.${index}.secondaryColor`),
    })

    return (
        <div key={field.id} className="flex flex-col items-center gap-2">
            <div className="group relative flex min-h-52 w-full items-center justify-center overflow-auto rounded-lg bg-white p-10 shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]">
                <div
                    className="group-hover:opacity-0"
                    dangerouslySetInnerHTML={{
                        __html: filterCSS(field.code, {
                            size: 'Medium',
                            speed: 'Average',
                            primaryColor: '#008080',
                            secondaryColor: '#dbdcef',
                        })
                            ?.replaceAll(
                                'spinner',
                                `spinner-${index}-mini-preview`,
                            )
                            ?.replaceAll(
                                'progress',
                                `progress-${index}-mini-preview`,
                            )
                            ?.replaceAll('dots', `dots-${index}-mini-preview`)
                            ?.replaceAll('bars', `bars-${index}-mini-preview`)
                            ?.replaceAll(
                                'shape',
                                `shape-${index}-mini-preview`,
                            ),
                    }}
                ></div>
                <div className="absolute hidden flex-col gap-2 transition-all group-hover:flex">
                    <Button
                        type="button"
                        size={'small'}
                        className="hover:bg-white"
                        onClick={() => {
                            setActiveTab('customize')
                            setOpen(true)
                        }}
                    >
                        Customize
                    </Button>
                    <Button
                        type="button"
                        size={'small'}
                        className="hover:bg-white"
                        onClick={() => {
                            setActiveTab('code')
                            setOpen(true)
                        }}
                    >
                        Get the code
                    </Button>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild></DialogTrigger>
                    <DialogContent className="lg:max-w-[950px]">
                          <DialogTitle className='hidden'></DialogTitle>
                        <Tabs
                            defaultValue="customize"
                            value={activeTab}
                            onValueChange={setActiveTab}
                        >
                            <TabsList>
                                <TabsTrigger value="customize">
                                    Customize
                                </TabsTrigger>
                                <TabsTrigger value="code">
                                    Get the code
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent
                                value="customize"
                                className="max-w-4xl"
                            >
                                <div className="grid gap-5 lg:grid-cols-2">
                                    <div className="relative flex aspect-square items-center justify-center overflow-auto rounded-lg bg-white p-10 shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: filterCSS(field.code, {
                                                    size: watch(
                                                        `loaders.${index}.size`,
                                                    ),
                                                    speed: watch(
                                                        `loaders.${index}.speed`,
                                                    ),
                                                    primaryColor: watch(
                                                        `loaders.${index}.primaryColor`,
                                                    ),
                                                    secondaryColor: watch(
                                                        `loaders.${index}.secondaryColor`,
                                                    ),
                                                })
                                                    .replaceAll(
                                                        'spinner',
                                                        `spinner-${index}`,
                                                    )
                                                    .replaceAll(
                                                        'progress',
                                                        `progress-${index}`,
                                                    )
                                                    .replaceAll(
                                                        'dots',
                                                        `dots-${index}`,
                                                    )
                                                    .replaceAll(
                                                        'bars',
                                                        `bars-${index}`,
                                                    )
                                                    .replaceAll(
                                                        'shape',
                                                        `shape-${index}`,
                                                    ),
                                            }}
                                        ></div>
                                    </div>
                                    <div className="space-y-5">
                                        {!!field?.primaryColor && (
                                            <ColorPicker
                                                modal={true}
                                                labelName="Primary color"
                                                value={watch(
                                                    `loaders.${index}.primaryColor`,
                                                )}
                                                placeholder="#ffffff"
                                                onColorChange={(val: string) =>
                                                    setValue(
                                                        `loaders.${index}.primaryColor`,
                                                        val,
                                                    )
                                                }
                                            />
                                        )}
                                        {!!field?.secondaryColor && (
                                            <ColorPicker
                                                modal={true}
                                                labelName="Secondary color"
                                                value={watch(
                                                    `loaders.${index}.secondaryColor`,
                                                )}
                                                placeholder="#ffffff"
                                                onColorChange={(val: string) =>
                                                    setValue(
                                                        `loaders.${index}.secondaryColor`,
                                                        val,
                                                    )
                                                }
                                            />
                                        )}

                                        <div>
                                            <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                                Loader size
                                            </label>
                                            <Select
                                                value={watch(
                                                    `loaders.${index}.size`,
                                                )}
                                                onValueChange={(val) => {
                                                    setValue(
                                                        `loaders.${index}.size`,
                                                        val,
                                                    )
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select clip path shape" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {sizeOptions.map(
                                                        (sizeOption, key) => {
                                                            return (
                                                                <SelectItem
                                                                    key={key}
                                                                    value={
                                                                        sizeOption.value
                                                                    }
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <span>
                                                                            {
                                                                                sizeOption.label
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
                                            <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                                Loader speed
                                            </label>
                                            <Select
                                                value={watch(
                                                    `loaders.${index}.speed`,
                                                )}
                                                onValueChange={(val) => {
                                                    setValue(
                                                        `loaders.${index}.speed`,
                                                        val,
                                                    )
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select clip path shape" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {speedOptions.map(
                                                        (speedOption, key) => {
                                                            return (
                                                                <SelectItem
                                                                    key={key}
                                                                    value={
                                                                        speedOption.value
                                                                    }
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <span>
                                                                            {
                                                                                speedOption.label
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
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="code" className="max-w-4xl">
                                <pre className="max-h-[500px] overflow-auto">
                                    {cssTextCode}
                                </pre>
                            </TabsContent>
                            <div className="mt-5 text-center">
                                <Button
                                    type="button"
                                    onClick={() => copyToClipboard(cssTextCode)}
                                >
                                    <Copy className="size-4" />
                                    Copy code
                                </Button>
                            </div>
                        </Tabs>
                    </DialogContent>
                </Dialog>
            </div>
            <p>{field.name}</p>
        </div>
    )
}

export default LoaderCard
