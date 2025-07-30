import { Control, Controller, UseFormRegister } from 'react-hook-form'

import { IForm } from '@/components/tools/meta-tags-generator/meta-tag-form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import helper from '@/lib/helper'

type Props = {
    register: UseFormRegister<IForm>
    control: Control<IForm>
}

const OptionalProperty = ({ register, control }: Props) => {
    return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    Search engines should revisit this page after
                </label>
                <Controller
                    name="page_revisit_day"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Select value={value} onValueChange={onChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select days" />
                            </SelectTrigger>
                            <SelectContent>
                                {helper.pageRevisitDays.map((day) => (
                                    <SelectItem
                                        key={day.value}
                                        value={day.value}
                                    >
                                        {day.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
            </div>
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    Author:
                </label>
                <Input
                    {...register('author_name')}
                    type="text"
                    placeholder="Author name"
                />
            </div>
        </div>
    )
}

export default OptionalProperty
