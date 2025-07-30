import React from 'react'
import { UseFormRegister } from 'react-hook-form'

import { IForm } from '@/components/tools/meta-tags-generator/meta-tag-form'
import { Input } from '@/components/ui/input'

type Props = {
    register: UseFormRegister<IForm>
}

const BookProperty = ({ register }: Props) => {
    return (
        <div className="grid gap-5 md:grid-cols-2">
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    Author
                </label>
                <Input
                    {...register('book_author')}
                    type="text"
                    placeholder="Book author"
                />
            </div>
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    ISBN
                </label>
                <Input
                    {...register('book_isbn')}
                    type="text"
                    placeholder="The International Standard Book Number"
                />
            </div>
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    Release Date
                </label>
                <Input
                    {...register('book_release_date')}
                    type="text"
                    placeholder="Book release date"
                />
            </div>
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    Tag
                </label>
                <Input
                    {...register('book_tag')}
                    type="text"
                    placeholder="Tag words related with book"
                />
            </div>
        </div>
    )
}

export default BookProperty
