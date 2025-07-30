import React from 'react'
import Link from 'next/link'

import {
    IPreviewIndexability,
    MissingContent,
} from '@/app/(default)/tools/website-optimization-suite/_website-optimization-suite-generator'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

const WebsiteOptimizationSuiteIndexability = ({
    indexability,
    url,
}: {
    indexability: IPreviewIndexability
    url: string
}) => {
    return (
        <Accordion
            type="multiple"
            className="space-y-4"
            defaultValue={['canonicalUrl', 'robots', 'sitemaps', 'hrefLangs']}
        >
            <AccordionItem value="canonicalUrl">
                <AccordionTrigger>
                    <div className="flex w-full items-center justify-between gap-3">
                        Canonical URL
                        {!indexability?.canonicalUrl && <MissingContent />}
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <dl className="space-y-4">
                        <div>
                            <dt className="flex justify-between gap-3 font-semibold">
                                <span>In HTML code :</span>
                                {/* {!!indexability?.canonicalUrl && (
                                    <span
                                        className={cn(
                                            'rounded px-1 py-0.5 text-white',
                                            indexability?.canonicalUrl === url
                                                ? 'bg-success'
                                                : 'bg-danger',
                                        )}
                                    >
                                        {indexability?.canonicalUrl === url
                                            ? 'Self-canonical'
                                            : 'Non-canonical'}
                                    </span>
                                )} */}
                            </dt>
                            <dd
                                className={cn('mt-1 text-gray overflow-x-auto', {
                                    'text-danger': !indexability?.canonicalUrl,
                                })}
                            >
                                {!!indexability?.canonicalUrl ? (
                                    <Link
                                        href={indexability?.canonicalUrl}
                                        target="_blank"
                                        className="text-blue hover:underline"
                                    >
                                        {indexability?.canonicalUrl}
                                    </Link>
                                ) : (
                                    'Missing'
                                )}
                            </dd>
                        </div>
                    </dl>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="robots">
                <AccordionTrigger>
                    <div className="flex w-full items-center justify-between gap-3">
                        Robots
                        {(!indexability?.robotsURL ||
                            !indexability?.robotsMetaTag ||
                            !indexability?.xRobotsTag) && <MissingContent />}
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <dl className="space-y-4">
                        <div>
                            <dt className="flex justify-between gap-3 font-semibold">
                                <span>Robots.txt :</span>
                            </dt>
                            <dd
                                className={cn('mt-1 text-gray overflow-x-auto', {
                                    'text-danger': !indexability?.robotsURL,
                                })}
                            >
                                {!!indexability?.robotsURL ? (
                                    <Link
                                        href={indexability?.robotsURL}
                                        target="_blank"
                                        className="text-blue hover:underline"
                                    >
                                        {indexability?.robotsURL}
                                    </Link>
                                ) : (
                                    'Missing'
                                )}
                            </dd>
                        </div>
                        <div>
                            <dt className="flex justify-between gap-3 font-semibold">
                                <span>Robots Meta Tag :</span>
                            </dt>
                            <dd
                                className={cn('mt-1 text-gray', {
                                    'text-danger': !indexability?.robotsMetaTag,
                                })}
                            >
                                {indexability?.robotsMetaTag || 'Missing'}
                            </dd>
                        </div>
                        <div>
                            <dt className="flex justify-between gap-3 font-semibold">
                                <span>X-Robots-Tag HTTP :</span>
                            </dt>
                            <dd
                                className={cn('mt-1 text-gray', {
                                    'text-danger': !indexability?.xRobotsTag,
                                })}
                            >
                                {indexability?.xRobotsTag || 'Missing'}
                            </dd>
                        </div>
                    </dl>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="sitemaps">
                <AccordionTrigger>
                    <div className="flex w-full items-center justify-between gap-3">
                        Sitemaps
                        {!indexability?.sitemaps?.length && <MissingContent />}
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <dl className="space-y-4">
                        <div>
                            <dt className="flex justify-between gap-3 font-semibold">
                                {/* <span>Sitemap URL :</span> */}
                            </dt>
                            <dd
                                className={cn('mt-1 text-gray overflow-x-auto', {
                                    'text-danger':
                                        !indexability?.sitemaps?.length,
                                })}
                            >
                                {indexability?.sitemaps?.length ? (
                                    <div className="inline-flex flex-col gap-2">
                                        {indexability?.sitemaps?.map(
                                            (sitemap, key) => {
                                                return (
                                                    <Link
                                                        key={key}
                                                        href={sitemap || ''}
                                                        target="_blank"
                                                        className="text-blue hover:underline"
                                                    >
                                                        {sitemap}
                                                    </Link>
                                                )
                                            },
                                        )}
                                    </div>
                                ) : (
                                    'Missing'
                                )}
                            </dd>
                        </div>
                    </dl>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="hrefLangs">
                <AccordionTrigger>
                    <div className="flex w-full items-center justify-between gap-3">
                        Hreflangs
                        {!indexability?.hrefLangs?.length && <MissingContent />}
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <dl className="space-y-4">
                        <div>
                            <dt className="flex justify-between gap-3 font-semibold">
                                {/* <span>hrefLangs :</span> */}
                            </dt>
                            <dd
                                className={cn('mt-1 text-gray', {
                                    'text-danger':
                                        !indexability?.hrefLangs?.length,
                                })}
                            >
                                {indexability?.hrefLangs?.length ? (
                                    <div className="inline-flex flex-col gap-2">
                                        {indexability?.hrefLangs?.map(
                                            (hrefLang, key) => {
                                                return (
                                                    <div
                                                        key={key}
                                                        className="flex flex-wrap gap-3 py-1"
                                                    >
                                                        <div className="w-[100px] pr-2 text-black">
                                                            {hrefLang?.lang}
                                                        </div>
                                                        <Link
                                                            href={
                                                                hrefLang?.url ||
                                                                ''
                                                            }
                                                            target="_blank"
                                                            className="text-blue hover:underline"
                                                        >
                                                            {hrefLang?.url}
                                                        </Link>
                                                    </div>
                                                )
                                            },
                                        )}
                                    </div>
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

export default WebsiteOptimizationSuiteIndexability
