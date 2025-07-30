'use client'

import React, { useEffect, useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

const ListFormat = [
    { value: 'per-line', label: 'One per line' },
    { value: 'comma', label: 'Comma separated' },
    { value: 'Semicolon', label: 'Semicolon separated' },
    { value: 'space', label: 'Space separated' },
]

type IForm = {
    list: string
    list_format: string
    selection_no: string
    remove_duplicates: boolean
}

const defaultValues: IForm = {
    list: '',
    list_format: 'per-line',
    selection_no: '',
    remove_duplicates: true,
}

const ListRandomizerForm = () => {
    const [randomizedList, setRandomizedList] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const {
        register,
        reset,
        watch,
        handleSubmit,
        control,
        setError,
        setValue,
        formState: { errors, dirtyFields },
    } = useForm<IForm>({
        defaultValues: defaultValues,
        mode: 'onChange',
    })

    const fieldChange = Object.keys(dirtyFields).length

    useEffect(() => {
        if (!!fieldChange) {
            setRandomizedList([])
        }
    }, [fieldChange, setValue])

    const formateUniqueDuplicateCount = (arr: string[]) => {
        const frequencyMap: Record<string, number> = arr?.reduce(
            (acc: any, item) => {
                acc[item] = (acc[item] || 0) + 1
                return acc
            },
            {} as Record<string, number>,
        )

        const uniqueArray = Object.keys(frequencyMap)

        const uniqueCount = Object.values(frequencyMap).filter(
            (count) => count === 1 || count > 1,
        ).length

        const duplicateCount = Object.values(frequencyMap).reduce(
            (sum: number, count: number) => {
                if (count > 1) {
                    return sum + (count - 1)
                }
                return sum
            },
            0,
        )

        return {
            uniqueCount: uniqueCount || 0,
            duplicateCount: duplicateCount || 0,
            uniqueArray: uniqueArray || [],
        }
    }

    const getCount = () => {
        const list = watch('list')
        const format = watch('list_format')

        if (format === 'per-line') {
            let newArr = list?.split('\n')?.filter((item) => item.trim() !== '')

            const { uniqueCount, duplicateCount, uniqueArray } =
                formateUniqueDuplicateCount(newArr)

            return {
                totalLength: newArr?.length || 0,
                uniqueCount: uniqueCount || 0,
                duplicateCount: duplicateCount || 0,
                listArray: newArr,
                uniqueArray: uniqueArray,
            }
        } else if (format === 'comma') {
            let newArr = list
                ?.split(',')
                ?.filter((item) => item.trim() !== '\n' && item.trim() !== '')

            const { uniqueCount, duplicateCount, uniqueArray } =
                formateUniqueDuplicateCount(newArr)

            return {
                totalLength: newArr?.length || 0,
                uniqueCount: uniqueCount || 0,
                duplicateCount: duplicateCount || 0,
                listArray: newArr,
                uniqueArray: uniqueArray,
            }
        } else if (format === 'Semicolon') {
            let newArr = list
                ?.split(';')
                ?.map((item) => item.trim().replace(/\n/g, ''))
                ?.filter((item) => item !== '')

            const { uniqueCount, duplicateCount, uniqueArray } =
                formateUniqueDuplicateCount(newArr)

            return {
                totalLength: newArr?.length || 0,
                uniqueCount: uniqueCount || 0,
                duplicateCount: duplicateCount || 0,
                listArray: newArr,
                uniqueArray: uniqueArray,
            }
        } else if (format === 'space') {
            let newArr = list
                ?.split(' ')
                ?.map((item) => item.trim().replace(/\n/g, ''))
                ?.filter((item) => item !== '')

            const { uniqueCount, duplicateCount, uniqueArray } =
                formateUniqueDuplicateCount(newArr)

            return {
                totalLength: newArr?.length || 0,
                uniqueCount: uniqueCount || 0,
                duplicateCount: duplicateCount || 0,
                listArray: newArr,
                uniqueArray: uniqueArray,
            }
        }

        return {
            totalLength: 0,
            uniqueCount: 0,
            duplicateCount: 0,
            listArray: [],
            uniqueArray: [],
        }
    }

    const shuffleArray = (arr: string[]) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[arr[i], arr[j]] = [arr[j], arr[i]] // randomizes array element
        }
        return arr
    }

    const randomizeList: SubmitHandler<IForm> = (data: IForm) => {
        setRandomizedList([])
        setLoading(true)
        const randomizedArray = !!watch('remove_duplicates')
            ? getCount().uniqueArray || []
            : getCount().listArray || []

        if (randomizedArray.length === 1) {
            setLoading(false)
            return setError('list', {
                message: 'Not enough elements to generate randomized list',
            })
        }

        setRandomizedList(shuffleArray(randomizedArray))

        setLoading(false)
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

    return (
        <div className="container my-5 gap-5 lg:my-14 xl:max-w-7xl">
            <div className="space-y-3.5 rounded-2xl border border-border bg-gray-100 p-4 md:space-y-4 lg:p-8 xl:grid-cols-2">
                <form
                    onSubmit={handleSubmit(randomizeList)}
                    className="space-y-8"
                >
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Enter your list
                        </label>
                        <Textarea
                            rows={12}
                            placeholder="Enter you list"
                            {...register('list', {
                                required: 'Required',
                                onChange: () => {
                                    setRandomizedList([])
                                },
                            })}
                        />
                        {errors?.list && (
                            <div className="mt-2 text-xs text-danger">
                                {errors?.list?.message}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-3 gap-5">
                        <div className="rounded-md bg-white p-4 text-center">
                            <div className="mb-2">Total count</div>
                            <div className="text-xl font-semibold text-black">
                                {getCount().totalLength}
                            </div>
                        </div>
                        <div className="rounded-md bg-white p-4 text-center">
                            <div className="mb-2">Unique count</div>
                            <div className="text-xl font-semibold text-black">
                                {getCount().uniqueCount}
                            </div>
                        </div>
                        <div className="rounded-md bg-white p-4 text-center">
                            <div className="mb-2">Duplicate count</div>
                            <div className="text-xl font-semibold text-black">
                                {getCount().duplicateCount}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-8">
                        <div>
                            <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                List format
                            </label>
                            <Controller
                                name="list_format"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        value={value}
                                        onValueChange={(e) => {
                                            onChange(e)
                                            setValue('selection_no', '')
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {ListFormat.map((format) => (
                                                <SelectItem
                                                    key={format.value}
                                                    value={format.value}
                                                >
                                                    {format.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        <div>
                            <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                Number of selection
                            </label>
                            <Controller
                                name="selection_no"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        value={value || ''}
                                        onValueChange={onChange}
                                        disabled={
                                            watch('remove_duplicates')
                                                ? getCount().uniqueCount <= 1
                                                : getCount().totalLength <= 1
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select all" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                All
                                            </SelectItem>
                                            {Array.from(
                                                {
                                                    length: watch(
                                                        'remove_duplicates',
                                                    )
                                                        ? getCount()
                                                              .uniqueCount - 1
                                                        : getCount()
                                                              .totalLength - 1,
                                                },
                                                (_, index) => (
                                                    <SelectItem
                                                        value={(
                                                            index + 1
                                                        ).toString()}
                                                        key={index}
                                                    >
                                                        {index + 1}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        <div className="flex items-end space-x-2 pb-1">
                            <Controller
                                name="remove_duplicates"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        id="removeDuplicates"
                                        checked={field.value}
                                        onCheckedChange={(value) =>
                                            field.onChange(!field.value)
                                        }
                                        className="size-5"
                                    />
                                )}
                            />
                            <label
                                htmlFor="removeDuplicates"
                                className="text-sm font-medium text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Remove duplicates
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-5">
                        <Button
                            type="button"
                            onClick={() => {
                                reset()
                                setRandomizedList([])
                            }}
                        >
                            Reset
                        </Button>
                        <Button type="submit" loading={loading}>
                            Randomize
                        </Button>
                    </div>
                </form>
                {loading ? (
                    <div className="flex h-36 w-full flex-col items-center justify-center lg:h-52">
                        <div>Generating list...</div>
                        <LoaderCircle className="mt-3 h-6 w-6 animate-spin" />
                    </div>
                ) : (
                    <>
                        {watch('selection_no') !== '' &&
                        !isNaN(Number(watch('selection_no'))) &&
                        !!randomizedList?.length ? (
                            <>
                                {randomizedList
                                    .slice(0, Number(watch('selection_no')))
                                    .map((list, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center rounded-lg border border-success/60 text-success/80"
                                        >
                                            <div className="w-[7%] border-r border-success/60 bg-success/20 px-4 py-3 text-center">
                                                {index + 1}
                                            </div>
                                            <div className="w-full bg-success/10 px-4 py-3">
                                                {list}
                                            </div>
                                        </div>
                                    ))}
                                <div className="flex items-center gap-2">
                                    <div className="h-[1px] flex-1 bg-gray/20"></div>
                                    <div className="text-xs">
                                        End of selection
                                    </div>
                                    <div className="h-[1px] flex-1 bg-gray/20"></div>
                                </div>
                                {randomizedList
                                    .slice(Number(watch('selection_no')))
                                    .map((list, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center rounded-lg border border-danger/60 text-danger/80"
                                        >
                                            <div className="w-[7%] border-r border-danger/60 bg-danger/20 px-4 py-3 text-center">
                                                {index +
                                                    Number(
                                                        watch('selection_no'),
                                                    ) +
                                                    1}
                                            </div>
                                            <div className="w-full bg-danger/10 px-4 py-3">
                                                {list}
                                            </div>
                                        </div>
                                    ))}
                            </>
                        ) : (
                            <div className="space-y-5 lg:space-y-8">
                                {!!randomizedList?.length &&
                                    randomizedList.map((list, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center rounded-lg border border-border"
                                        >
                                            <div className="w-[7%] border-r border-border px-4 py-3 text-center">
                                                {index + 1}
                                            </div>
                                            <div className="w-full px-4 py-3">
                                                {list}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}

                        {!!randomizedList.length && (
                            <div className="flex flex-wrap items-center justify-center gap-5">
                                {watch('selection_no') !== '' &&
                                    !isNaN(Number(watch('selection_no'))) && (
                                        <Button
                                            type="button"
                                            onClick={() =>
                                                copyToClipboard(
                                                    randomizedList
                                                        .slice(
                                                            0,
                                                            Number(
                                                                watch(
                                                                    'selection_no',
                                                                ),
                                                            ),
                                                        )
                                                        .join('\n'),
                                                )
                                            }
                                        >
                                            Copy selection
                                        </Button>
                                    )}
                                <Button
                                    type="button"
                                    onClick={() =>
                                        copyToClipboard(
                                            randomizedList.join('\n'),
                                        )
                                    }
                                >
                                    Copy all
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default ListRandomizerForm
