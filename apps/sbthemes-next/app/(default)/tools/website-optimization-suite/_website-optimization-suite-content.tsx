import React from 'react'

import {
    IPreviewContent,
    MissingContent,
} from '@/app/(default)/tools/website-optimization-suite/_website-optimization-suite-generator'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

const WebsiteOptimizationSuiteContent = ({
    content,
}: {
    content: IPreviewContent
}) => {
    return (
        <Accordion
            type="multiple"
            className="space-y-4"
            defaultValue={['meta', 'dates', 'content']}
        >
            <AccordionItem value="meta">
                <AccordionTrigger>
                    <div className="flex w-full items-center justify-between gap-3">
                        Meta
                        {(!content?.meta?.title ||
                            !content?.meta?.description) && <MissingContent />}
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <dl className="space-y-4">
                        <div>
                            <dt className="flex justify-between gap-3 font-semibold">
                                <span>Title :</span>
                                {!!content?.meta?.title && (
                                    <span
                                        className={cn(
                                            'rounded px-1 py-0.5 text-white',
                                            content?.meta?.title?.length > 60
                                                ? 'bg-danger'
                                                : 'bg-success',
                                        )}
                                    >
                                        {content?.meta?.title?.length}/60
                                    </span>
                                )}
                            </dt>
                            <dd
                                className={cn('mt-1 text-gray', {
                                    'text-danger': !content?.meta?.title,
                                })}
                            >
                                {content?.meta?.title || 'Missing'}
                            </dd>
                        </div>
                        <div>
                            <dt className="flex justify-between gap-3 font-semibold">
                                <span>Description :</span>
                                {!!content?.meta?.description && (
                                    <span
                                        className={cn(
                                            'rounded px-1 py-0.5 text-white',
                                            content?.meta?.description?.length >
                                                160
                                                ? 'bg-danger'
                                                : 'bg-success',
                                        )}
                                    >
                                        {content?.meta?.description?.length}/160
                                    </span>
                                )}
                            </dt>
                            <dd
                                className={cn('mt-1 text-gray', {
                                    'text-danger': !content?.meta?.description,
                                })}
                            >
                                {content?.meta?.description || 'Missing'}
                            </dd>
                        </div>
                    </dl>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="dates">
                <AccordionTrigger>
                    <div className="flex w-full items-center justify-between gap-3">
                        Dates
                        {(!content?.dates?.publishedDate ||
                            !content?.dates?.modifiedDate) && (
                            <MissingContent />
                        )}
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <dl className="space-y-4">
                        <div>
                            <dt className="flex justify-between gap-3 font-semibold">
                                <span>Published :</span>
                            </dt>
                            <dd
                                className={cn('mt-1 text-gray', {
                                    'text-danger':
                                        !content?.dates?.publishedDate,
                                })}
                            >
                                {content?.dates?.publishedDate || 'Missing'}
                            </dd>
                        </div>
                        <div>
                            <dt className="flex justify-between gap-3 font-semibold">
                                <span>Modified :</span>
                            </dt>
                            <dd
                                className={cn('mt-1 text-gray', {
                                    'text-danger':
                                        !content?.dates?.modifiedDate,
                                })}
                            >
                                {content?.dates?.modifiedDate || 'Missing'}
                            </dd>
                        </div>
                    </dl>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="content">
                <AccordionTrigger>Content</AccordionTrigger>
                <AccordionContent>
                    <dl className="space-y-4">
                        <div>
                            <dt className="flex justify-between gap-3 font-semibold">
                                <span>Word count :</span>
                            </dt>
                            <dd
                                className={cn('mt-1 text-gray', {
                                    'text-danger': !content?.content?.wordCount,
                                })}
                            >
                                {content?.content?.wordCount || 'Missing'}
                            </dd>
                        </div>
                        <div>
                            <dt className="flex justify-between gap-3 font-semibold">
                                <span>Headings :</span>
                            </dt>
                            <dd
                                className={cn('mt-1 text-gray', {
                                    'text-danger': !content?.content?.headings,
                                })}
                            >
                                {!content?.content?.headings && 'Missing'}
                                {!!content?.content?.headings?.length && (
                                    <ul className="mt-1">
                                        {content?.content?.headings.map(
                                            (heading, index) => (
                                                <li
                                                    key={index}
                                                    className={cn('py-1', {
                                                        'pl-0':
                                                            heading?.level ===
                                                            1,
                                                        'pl-4':
                                                            heading?.level ===
                                                            2,
                                                        'pl-8':
                                                            heading?.level ===
                                                            3,
                                                        'pl-12':
                                                            heading?.level ===
                                                            4,
                                                        'pl-16':
                                                            heading?.level ===
                                                            5,
                                                        'pl-20':
                                                            heading?.level ===
                                                            6,
                                                    })}
                                                >
                                                    <span className="pr-2 text-black">
                                                        H{heading.level}
                                                    </span>
                                                    <span>{heading.text}</span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                )}
                            </dd>
                        </div>
                    </dl>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default WebsiteOptimizationSuiteContent
