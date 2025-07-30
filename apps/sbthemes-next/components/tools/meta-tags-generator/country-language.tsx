'use client'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select'
import helper from '@/lib/helper'

type ICountryFieldProps = {
    onChange: (value: string) => void
    value: string
}

const CountryField = ({ value, onChange }: ICountryFieldProps) => {
    return (
        <div className="flex">
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger>
                    {
                        helper.countryData?.find(
                            (item) =>
                                item.code.toLowerCase() === value.toLowerCase(),
                        )?.name
                    }
                </SelectTrigger>
                <SelectContent>
                    {helper.countryData.map((item, i) => {
                        return (
                            <SelectItem key={i} value={item?.code}>
                                {item?.name}
                            </SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>
        </div>
    )
}

export default CountryField
