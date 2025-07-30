import React from 'react'
import Link from 'next/link'

import {
    IPreviewSocial,
    MissingContent,
} from '@/app/(default)/tools/website-optimization-suite/_website-optimization-suite-generator'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

const WebsiteOptimizationSuiteSocial = ({
    social,
}: {
    social: IPreviewSocial
}) => {
    return (
        <Accordion
            type="multiple"
            className="space-y-4"
            defaultValue={['openGraph', 'twitter']}
        >
            <AccordionItem value="openGraph">
                <AccordionTrigger>
                    <div className="flex w-full items-center justify-between gap-3">
                        Open graph tags
                        {(!social?.openGraph?.title ||
                            !social?.openGraph?.description ||
                            !social?.openGraph?.type ||
                            !social?.openGraph?.image ||
                            !social?.openGraph?.url ||
                            !social?.openGraph?.siteName) && <MissingContent />}
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <dl className="space-y-4">
                        <div>
                            <dt className="flex justify-between gap-3 font-semibold">
                                <span>og:title :</span>
                            </dt>
                            <dd
                                className={cn('mt-1 text-gray', {
                                    'text-danger': !social?.openGraph?.title,
                                })}
                            >
                                {social?.openGraph?.title || 'Missing'}
                            </dd>
                        </div>
                        <div>
                            <dt className="flex justify-between gap-3 font-semibold">
                                <span>og:type :</span>
                            </dt>
                            <dd
                                className={cn('mt-1 text-gray', {
                                    'text-danger': !social?.openGraph?.type,
                                })}
                            >
                                {social?.openGraph?.type || 'Missing'}
                            </dd>
                        </div>
                        <div>
                            <dt className="flex justify-between gap-3 font-semibold">
                                <span>og:image :</span>
                            </dt>
                            <dd
                                className={cn('mt-1 text-gray overflow-x-auto', {
                                    'text-danger': !social?.openGraph?.image,
                                })}
                            >
                                {social?.openGraph?.image ? (
                                    <Link
                                        href={social?.openGraph?.image}
                                        target="_blank"
                                        className="text-blue hover:underline"
                                    >
                                        {social?.openGraph?.image}
                                    </Link>
                                ) : (
                                    'Missing'
                                )}
                            </dd>
                        </div>
                        <div>
                            <dt className="flex justify-between gap-3 font-semibold">
                                <span>og:url :</span>
                            </dt>
                            <dd
                                className={cn('mt-1 text-gray overflow-x-auto', {
                                    'text-danger': !social?.openGraph?.url,
                                })}
                            >
                                {social?.openGraph?.url ? (
                                    <Link
                                        href={social?.openGraph?.url}
                                        target="_blank"
                                        className="text-blue hover:underline"
                                    >
                                        {social?.openGraph?.url}
                                    </Link>
                                ) : (
                                    'Missing'
                                )}
                            </dd>
                        </div>
                        <div>
                            <dt className="flex justify-between gap-3 font-semibold">
                                <span>og:description :</span>
                            </dt>
                            <dd
                                className={cn('mt-1 text-gray', {
                                    'text-danger':
                                        !social?.openGraph?.description,
                                })}
                            >
                                {social?.openGraph?.description || 'Missing'}
                            </dd>
                        </div>
                        <div>
                            <dt className="flex justify-between gap-3 font-semibold">
                                <span>og:site_name :</span>
                            </dt>
                            <dd
                                className={cn('mt-1 text-gray', {
                                    'text-danger': !social?.openGraph?.siteName,
                                })}
                            >
                                {social?.openGraph?.siteName || 'Missing'}
                            </dd>
                        </div>
                    </dl>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="twitter">
                <AccordionTrigger>
                    <div className="flex w-full items-center justify-between gap-3">
                        Twitter card
                        {(!social?.twitter?.title ||
                            !social?.twitter?.description ||
                            !social?.twitter?.card ||
                            !social?.twitter?.image ||
                            !social?.twitter?.site) && <MissingContent />}
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <dl className="space-y-4">
                        <div>
                            <dt className="flex justify-between gap-3 font-semibold">
                                <span>twitter:card :</span>
                            </dt>
                            <dd
                                className={cn('mt-1 text-gray', {
                                    'text-danger': !social?.twitter?.card,
                                })}
                            >
                                {social?.twitter?.card || 'Missing'}
                            </dd>
                        </div>
                        <div>
                            <dt className="flex justify-between gap-3 font-semibold">
                                <span>twitter:site :</span>
                            </dt>
                            <dd
                                className={cn('mt-1 text-gray', {
                                    'text-danger': !social?.twitter?.site,
                                })}
                            >
                                {social?.twitter?.site || 'Missing'}
                            </dd>
                        </div>
                        <div>
                            <dt className="flex justify-between gap-3 font-semibold">
                                <span>og:description :</span>
                            </dt>
                            <dd
                                className={cn('mt-1 text-gray', {
                                    'text-danger':
                                        !social?.twitter?.description,
                                })}
                            >
                                {social?.twitter?.description || 'Missing'}
                            </dd>
                        </div>
                        <div>
                            <dt className="flex justify-between gap-3 font-semibold">
                                <span>og:twitter :</span>
                            </dt>
                            <dd
                                className={cn('mt-1 text-gray', {
                                    'text-danger': !social?.twitter?.title,
                                })}
                            >
                                {social?.twitter?.title || 'Missing'}
                            </dd>
                        </div>
                        <div>
                            <dt className="flex justify-between gap-3 font-semibold">
                                <span>og:twitter :</span>
                            </dt>
                            <dd
                                className={cn('mt-1 text-gray overflow-x-auto', {
                                    'text-danger': !social?.twitter?.image,
                                })}
                            >
                                {social?.twitter?.image ? (
                                    <Link
                                        href={social?.twitter?.image}
                                        target="_blank"
                                        className="text-blue hover:underline"
                                    >
                                        {social?.twitter?.image}
                                    </Link>
                                ) : (
                                    'Missing'
                                )}
                            </dd>
                        </div>
                    </dl>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default WebsiteOptimizationSuiteSocial
