import React from 'react'
import Link from 'next/link'

import {
    IPreviewStructuredData,
    MissingContent,
} from '@/app/(default)/tools/website-optimization-suite/_website-optimization-suite-generator'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

const WebsiteOptimizationSuiteStructureData = ({
    structuredData,
}: {
    structuredData: IPreviewStructuredData
}) => {
    console.log(Object.entries(structuredData))

    return (
        <>
            <StructuredValues data={structuredData} />
        </>
    )
}

export default WebsiteOptimizationSuiteStructureData

const StructuredValues = ({ data }: any) => {
    if (typeof data === 'string') {
        return (
            <dd
                className={cn('mt-1 text-gray', {
                    'text-danger': !data,
                })}
            >
                {!!data ? (
                    data.startsWith('http://') ||
                    data.startsWith('https://') ? (
                        <Link
                            href={data}
                            target="_blank"
                            className="text-blue hover:underline"
                        >
                            {data}
                        </Link>
                    ) : (
                        data
                    )
                ) : (
                    'Missing'
                )}
            </dd>
        )
    } else
        return (
            <div className="space-y-4">
                {Object.entries(data)?.map(([key, value]) => {
                    if (Array.isArray(value)) {
                        return (
                            <Accordion
                                key={key}
                                type="multiple"
                                className="space-y-4"
                                defaultValue={['title']}
                            >
                                <AccordionItem key={key} value={key}>
                                    <AccordionTrigger>
                                        <div className="flex w-full items-center justify-between gap-3">
                                            {key}
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-4">
                                        {value.map((item, index) => (
                                            <StructuredValues
                                                key={index}
                                                data={item}
                                            />
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        )
                    } else if (typeof value === 'object' && value !== null) {
                        return (
                            <Accordion
                                key={key}
                                type="multiple"
                                className="space-y-4"
                                defaultValue={['title']}
                            >
                                <AccordionItem key={key} value={key}>
                                    <AccordionTrigger>
                                        <div className="flex w-full items-center justify-between gap-3">
                                            {key}
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <StructuredValues data={value} />
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        )
                    } else if (typeof value === 'string') {
                        return (
                            <dl key={key} className="space-y-4">
                                <div>
                                    <dt className="flex justify-between gap-3 font-semibold">
                                        <span>{key} :</span>
                                    </dt>
                                    <dd
                                        className={cn('mt-1 text-gray overflow-x-auto', {
                                            'text-danger': !value,
                                        })}
                                    >
                                        {!!value ? (
                                            value.startsWith('http://') ||
                                            value.startsWith('https://') ? (
                                                <Link
                                                    href={value}
                                                    target="_blank"
                                                    className="text-blue hover:underline"
                                                >
                                                    {value}
                                                </Link>
                                            ) : (
                                                value
                                            )
                                        ) : (
                                            'Missing'
                                        )}
                                    </dd>
                                </div>
                            </dl>
                        )
                    } else {
                        return null
                    }
                })}
            </div>
        )
}
