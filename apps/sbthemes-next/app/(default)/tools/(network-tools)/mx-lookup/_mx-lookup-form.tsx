'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'

const MXLookupForm = () => {
    const [result, setResult] = useState<any>(null)
    const {
        watch,
        handleSubmit,
        setValue,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            value: '',
        },
    })

    const getMXLookup = async () => {
        setResult(null)
        try {
            const { data } = await axios.get(
                `/api/mx-lookup?url=${watch('value')}`,
            )
            if (data?.status === 'SUCCESS') setResult(data)
            else toast({ title: 'Something went wrong!', variant: 'error' })
        } catch (error) {
            toast({
                title: 'Something went wrong!',
                variant: 'error',
            })
            setResult(null)
        }
    }

    return (
        <div className="container my-5 max-w-5xl gap-5 lg:my-14">
            <div className="space-y-3.5 rounded-2xl border border-border bg-gray-100 p-4 md:space-y-4 lg:p-8">
                <form
                    className="space-y-5"
                    onSubmit={handleSubmit(getMXLookup)}
                >
                    <div>
                        <label className="mb-1.5 block text-sm/[18px] font-medium text-primary md:mb-2.5">
                            Enter domain
                        </label>
                        <div className="flex gap-2.5">
                            <Input
                                type="text"
                                value={watch('value')}
                                placeholder="Enter domain"
                                onChange={(e) => {
                                    setValue('value', e.target.value)
                                }}
                                className="w-full p-2 md:p-3"
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <Button type="submit" loading={isSubmitting}>
                            Lookup
                        </Button>
                    </div>
                </form>

                {!!result && !!result?.result?.length && (
                    <Table className="text-base/5">
                        <TableHeader className="bg-white">
                            <TableRow className="border-border">
                                <TableHead className="whitespace-nowrap">
                                    Record
                                </TableHead>
                                <TableHead className="whitespace-nowrap">
                                    Priority
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="bg-white">
                            {result?.result?.map((r: any, i: number) => {
                                return (
                                    <TableRow className="border-border" key={i}>
                                        <TableCell className="text-center">
                                            {r?.exchange || ''}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {r?.priority || ''}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    )
}

export default MXLookupForm
