import React from 'react'
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

const TwitterProperty = ({ register, control }: Props) => {
    return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-1">
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    Card Type
                </label>
                <Controller
                    name="twitter_card_type"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Select value={value} onValueChange={onChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select card type" />
                            </SelectTrigger>
                            <SelectContent>
                                {helper.twitterCardType.map((type) => (
                                    <SelectItem
                                        key={type.value}
                                        value={type.value}
                                    >
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
            </div>
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    Site Account
                </label>
                <Input
                    {...register('twitter_site_account')}
                    type="text"
                    placeholder="Name of the site account"
                />
            </div>
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    Creator Account
                </label>
                <Input
                    {...register('twitter_creator_account')}
                    type="text"
                    placeholder="Name of the creator account"
                />
            </div>
        </div>
    )
}

export default TwitterProperty
