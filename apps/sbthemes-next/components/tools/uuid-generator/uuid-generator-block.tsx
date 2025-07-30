'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { RotateCw } from 'lucide-react'
import {
    NIL as NIL_UUID,
    v1 as uuidv1,
    v3 as uuidv3,
    v4 as uuidv4,
    v5 as uuidv5,
} from 'uuid'

import UUIDNamespace from '@/components/tools/uuid-generator/uuid-namespace'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import helper from '@/lib/helper'
import { cn } from '@/lib/utils'

export default function UUIDGeneratorBlock() {
    const [currentVersion, setCurrentVersion] = useState('NIL')
    const [currentNamespace, setCurrentNamespace] = useState('DNS')
    const [quantity, setQuantity] = useState(1)
    const [name, setName] = useState('')
    const [namespaceUUID, setNamespaceUUID] = useState(
        '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    )
    const [uuid, setUuid] = useState('')

    const copyToClipboard = () => {
        toast({
            title: 'Copied to clipboard!',
            variant: 'success',
        })

        navigator.clipboard.writeText(uuid).then(() => { })
    }

    const modifyUUID = (originalUUID: string) => {
        const modifiedUUID = originalUUID.split('-')
        let lastNode = ''

        const characters = modifiedUUID[modifiedUUID.length - 1]

        //Manually generating last node charters to shuffle
        for (let i = 0; i < characters?.length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length)
            lastNode += characters[randomIndex]
        }

        modifiedUUID[modifiedUUID.length - 1] = lastNode

        return modifiedUUID.join('-')
    }

    const generateUUID = useCallback(
        (version: string) => {
            let generatedUUIDs: string[] = []

            if (version === 'NIL') {
                generatedUUIDs = Array.from(
                    { length: quantity },
                    () => NIL_UUID,
                )
            } else if (version === 'v1') {
                generatedUUIDs = Array.from({ length: quantity }, () =>
                    modifyUUID(uuidv1()),
                )
            } else if (version === 'v4') {
                generatedUUIDs = Array.from({ length: quantity }, () =>
                    uuidv4(),
                )
            } else if (version === 'v3' && !!namespaceUUID) {
                generatedUUIDs = Array.from({ length: quantity }, () =>
                    uuidv3(name, namespaceUUID),
                )
            } else if (version === 'v5' && !!namespaceUUID) {
                generatedUUIDs = Array.from({ length: quantity }, () =>
                    uuidv5(name, namespaceUUID),
                )
            }

            setUuid(generatedUUIDs.join('\n'))
        },
        [quantity, name, namespaceUUID],
    )

    useEffect(() => {
        generateUUID(currentVersion)
    }, [currentVersion, generateUUID])

    useEffect(() => {
        if (currentNamespace === 'DNS') {
            setNamespaceUUID('6ba7b810-9dad-11d1-80b4-00c04fd430c8')
        } else if (currentNamespace === 'URL') {
            setNamespaceUUID('6ba7b811-9dad-11d1-80b4-00c04fd430c8')
        } else if (currentNamespace === 'OID') {
            setNamespaceUUID('6ba7b812-9dad-11d1-80b4-00c04fd430c8')
        } else if (currentNamespace === 'X.500') {
            setNamespaceUUID('6ba7b814-9dad-11d1-80b4-00c04fd430c8')
        }
    }, [currentNamespace])

    return (
        <div className="container">
            <div className="mx-auto my-5 w-full max-w-3xl rounded-2xl border border-border bg-gray-100 lg:my-14">
                <div className="border-b-2 border-border px-4 py-5 md:px-5 md:py-8">
                    <div className="mb-4">
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            UUID version
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {helper.uuidVersions.map((version) => (
                                <Button
                                    key={version.value}
                                    variant="outline-general"
                                    onClick={() => {
                                        setCurrentVersion(version.value),
                                            generateUUID(version.value)
                                    }}
                                    className={cn({
                                        'bg-primary text-white':
                                            currentVersion === version.value,
                                    })}
                                >
                                    {version.label}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Quantity
                        </label>
                        <Input
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={(e) => {
                                if (e.target.value === '0') {
                                    setQuantity(1)
                                } else
                                    setQuantity(parseInt(e.target.value) || 1)
                            }}
                        />
                    </div>

                    {(currentVersion === 'v3' || currentVersion === 'v5') && (
                        <UUIDNamespace
                            namespace={currentNamespace}
                            setNamespace={setCurrentNamespace}
                            name={name}
                            setName={setName}
                            nameSpaceUUID={namespaceUUID}
                        />
                    )}

                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                        Generated UUID:
                    </label>
                    <div className="flex items-center gap-5">
                        <div className="grow break-all text-base font-semibold -tracking-tight text-primary focus-visible:ring-0 md:text-2xl">
                            <Textarea
                                value={uuid}
                                readOnly
                                className="text-center"
                                rows={quantity}
                            />
                        </div>
                        {/* <Button
                            type="button"
                            variant="outline-shadow"
                            className="px-2.5"
                            onClick={() => generateUUID(currentVersion)}
                        >
                            <RotateCw className="size-5" />
                        </Button> */}
                    </div>
                </div>
                <div className="py-5 text-center">
                    <Button type="button" onClick={copyToClipboard}>
                        Copy UUID
                    </Button>
                </div>
            </div>
        </div>
    )
}
