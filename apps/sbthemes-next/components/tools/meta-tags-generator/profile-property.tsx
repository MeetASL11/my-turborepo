import React from 'react'
import { UseFormRegister } from 'react-hook-form'

import { IForm } from '@/components/tools/meta-tags-generator/meta-tag-form'
import { Input } from '@/components/ui/input'

type Props = {
    register: UseFormRegister<IForm>
}

const ProfileProperty = ({ register }: Props) => {
    return (
        <div className="grid gap-5 md:grid-cols-2">
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    First Name
                </label>
                <Input
                    {...register('first_name')}
                    type="text"
                    placeholder="First name"
                />
            </div>
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    Last Name
                </label>
                <Input
                    {...register('last_name')}
                    type="text"
                    placeholder="Last name"
                />
            </div>
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    Username
                </label>
                <Input
                    {...register('username')}
                    type="text"
                    placeholder="Username"
                />
            </div>
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                    Gender
                </label>
                <Input
                    {...register('gender')}
                    type="text"
                    placeholder="Gender"
                />
            </div>
        </div>
    )
}

export default ProfileProperty
