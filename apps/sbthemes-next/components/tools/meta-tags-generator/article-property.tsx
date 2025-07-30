import React from 'react'
import { UseFormRegister } from 'react-hook-form'

import { IForm } from '@/components/tools/meta-tags-generator/meta-tag-form'
import { Input } from '@/components/ui/input'

type Props = {
    register: UseFormRegister<IForm>
}

const ArticleProperty = ({ register }: Props) => {
    return (
        <div className="grid gap-5 md:grid-cols-2">
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    Publishing Date
                </label>
                <Input
                    {...register('article_publishing_date')}
                    type="text"
                    placeholder="Article first published date"
                />
            </div>
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    Modification Date
                </label>
                <Input
                    {...register('article_modification_date')}
                    type="text"
                    placeholder="Article last modification date"
                />
            </div>
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    Expiration Date
                </label>
                <Input
                    {...register('article_expiration_date')}
                    type="text"
                    placeholder="Article out of date"
                />
            </div>
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    Author
                </label>
                <Input
                    {...register('article_author')}
                    type="text"
                    placeholder="Article author"
                />
            </div>
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    Section
                </label>
                <Input
                    {...register('article_section')}
                    type="text"
                    placeholder="A high level article section"
                />
            </div>
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    Tag
                </label>
                <Input
                    {...register('article_tag')}
                    type="text"
                    placeholder="A tag word related to the article"
                />
            </div>
        </div>
    )
}

export default ArticleProperty
