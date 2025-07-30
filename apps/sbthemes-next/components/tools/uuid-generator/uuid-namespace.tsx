import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import helper from '@/lib/helper'
import { cn } from '@/lib/utils'

type Props = {
    namespace: string
    setNamespace: React.Dispatch<React.SetStateAction<string>>
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    nameSpaceUUID: string
}

const UUIDNamespace = ({
    namespace,
    setNamespace,
    name,
    setName,
    nameSpaceUUID,
}: Props) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)

    useEffect(() => {
        setValue(nameSpaceUUID)
    }, [nameSpaceUUID])

    return (
        <div className="mb-4 space-y-4">
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium">
                    Namespace
                </label>
                <div className="flex gap-3">
                    {helper.uuidNamespace.map((name) => (
                        <Button
                            key={name.value}
                            variant="outline-general"
                            onClick={() => setNamespace(name.value)}
                            className={cn({
                                'bg-primary text-white':
                                    namespace === name.value,
                            })}
                        >
                            {name.label}
                        </Button>
                    ))}
                </div>
            </div>
            <div>
                <Input
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                        if (nameSpaceUUID !== e.target.value) {
                            setError(true)
                        } else {
                            setError(false)
                        }
                    }}
                />
                {error && (
                    <div className="mt-1 text-sm text-danger">Invalid UUID</div>
                )}
            </div>
            <div>
                <label className="mb-2.5 block text-sm/[18px] font-medium">
                    Name
                </label>
                <Input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
        </div>
    )
}

export default UUIDNamespace
