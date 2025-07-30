import React from 'react'
import { Control, Controller, UseFormRegister } from 'react-hook-form'

import CountryField from '@/components/tools/meta-tags-generator/country-language'
import { IForm } from '@/components/tools/meta-tags-generator/meta-tag-form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import helper from '@/lib/helper'

type Props = {
    register: UseFormRegister<IForm>
    control: Control<IForm>
}

const GeneralInformationProperty = ({ register, control }: Props) => {
    return (
        <div className="space-y-5">
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    Page Type
                </label>
                <Controller
                    name="page_type"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Select value={value} onValueChange={onChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select page type" />
                            </SelectTrigger>
                            <SelectContent>
                                {helper.metaPageType.map((type) => (
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
                    Site Title
                </label>
                <Input
                    {...register('title')}
                    type="text"
                    placeholder="Title must be within 60 Characters"
                />
            </div>

            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    Page url
                </label>
                <Input
                    {...register('page_url')}
                    type="text"
                    placeholder="Page url"
                />
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-1">
                <div>
                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                        Site Description
                    </label>
                    <Textarea
                        {...register('description')}
                        rows={2}
                        placeholder="Description must be within 150 Characters"
                        className="min-h-16"
                    />
                </div>
                <div>
                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                        Site Keywords (Separate with commas)
                    </label>
                    <Textarea
                        {...register('site_keywords')}
                        rows={2}
                        placeholder="Keywords 1, Keywords 2, Keywords 3"
                        className="min-h-16"
                    />
                </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                <div>
                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                        Allow robots to index your website?
                    </label>
                    <Controller
                        name="include_robots_index"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select value={value} onValueChange={onChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>
                <div>
                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                        Allow robots to follow all links?
                    </label>
                    <Controller
                        name="follow_robots_links"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select value={value} onValueChange={onChange}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                <div>
                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                        What type of content will your site display?
                    </label>
                    <Controller
                        name="content_type"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select value={value} onValueChange={onChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    {helper.metaSiteContentType.map((type) => (
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
                        Language
                    </label>
                    <Controller
                        name="language"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <CountryField value={value} onChange={onChange} />
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default GeneralInformationProperty
