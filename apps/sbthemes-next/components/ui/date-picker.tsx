'use client'
import { forwardRef } from 'react'
import { format } from 'date-fns'
import { DateOption } from 'flatpickr/dist/types/options'
import { CalendarIcon } from 'lucide-react'
import Flatpickr from 'react-flatpickr'

import { Button } from '@/components/ui/button'
import { Input, InputProps } from '@/components/ui/input'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

import 'flatpickr/dist/flatpickr.css'

const DatePicker = (
    {
        defaultValue,
        value,
        onChange,
        minDate,
        maxDate,
        triggerInputProps,
        ...inputProps
    }: {
        defaultValue?: string | undefined
        value:
            | string
            | number
            | Date
            | readonly (string | number | Date)[]
            | undefined
        onChange: (date: Date | Date[] | string | undefined) => void
        minDate?: DateOption | undefined
        maxDate?: DateOption | undefined
        triggerInputProps?: InputProps
    } & React.InputHTMLAttributes<HTMLInputElement>,
    ref: React.Ref<Flatpickr>,
) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="relative">
                    <Input
                        type="text"
                        value={
                            value
                                ? format(value?.toString() || '', 'dd LLL yyyy')
                                : ''
                        }
                        onChange={() => {}}
                        {...triggerInputProps}
                        className="cursor-pointer pl-10"
                    />
                    <CalendarIcon className="absolute left-3 top-1/2 mr-2 h-4 w-4 -translate-y-1/2" />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Flatpickr
                    ref={ref}
                    {...inputProps}
                    defaultValue={defaultValue}
                    value={
                        value
                            ? format(value?.toString() || '', 'yyyy-MM-dd')
                            : ''
                    }
                    options={{
                        altInput: true,
                        dateFormat: 'Y-m-d',
                        static: true,
                        minDate: minDate,
                        maxDate: maxDate,
                        inline: true,
                    }}
                    onChange={onChange}
                />
            </PopoverContent>
        </Popover>
    )
}

export default forwardRef(DatePicker)
