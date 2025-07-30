import React from 'react'
import { UseFormRegister } from 'react-hook-form'

import { IForm } from '@/components/tools/meta-tags-generator/meta-tag-form'
import { Input } from '@/components/ui/input'

type Props = {
    register: UseFormRegister<IForm>
}

const ImageProperty = ({ register }: Props) => {
    return (
        <div className="grid gap-5 md:grid-cols-2">
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    Image Url
                </label>
                <Input
                    {...register('image_url')}
                    type="text"
                    placeholder="Image URL"
                />
            </div>
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    Image Alt
                </label>
                <Input
                    {...register('image_alt')}
                    type="text"
                    placeholder="Image alt text"
                />
            </div>
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    Width
                </label>
                <Input
                    {...register('width')}
                    type="text"
                    placeholder="Image width"
                />
            </div>
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    Height
                </label>
                <Input
                    {...register('height')}
                    type="text"
                    placeholder="Image height"
                />
            </div>
        </div>
    )
}

export default ImageProperty
