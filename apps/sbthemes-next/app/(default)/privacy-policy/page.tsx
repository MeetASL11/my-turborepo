import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import helper from '@/lib/helper'

export const metadata: Metadata = {
    title: 'Privacy policy | sbthemes',
    description:
        'We collect personal information, such as names, email addresses, and billing details, when voluntarily submitted by our visitors during the ordering process or through contact forms.',
    openGraph: {
        ...helper.openGraphData,
        title: 'Privacy Policy | sbthemes',
        description:
            'We collect personal information, such as names, email addresses, and billing details, when voluntarily submitted by our visitors during the ordering process or through contact forms.',
        url: process.env.NEXT_PUBLIC_APP_URL + '/privacy-policy',
        type: 'website',
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_APP_URL}/privacy-policy`,
    },
}
export default function PrivacyPolicy() {
    return (
        <>
            <div className="relative bg-gradient-to-r from-[#CACEFF]/10 to-gray-300/10 px-4 pb-10 pt-28 text-center sm:pt-32 lg:pb-[50px] lg:pt-40">
                <h1 className="text-[26px]/[30px] font-bold text-primary md:text-[40px]/[50px]">
                    Privacy Policy
                </h1>
            </div>
            <div className="prose mx-auto my-8 w-full max-w-[1142px] px-4 lg:prose-lg lg:my-14">
                <ol type="1">
                    <li>
                        <h3>Information collection</h3>
                        <p>
                            We collect personal information, such as names,
                            email addresses, and billing details, when
                            voluntarily submitted by our visitors during the
                            ordering process or through contact forms. This
                            information is used solely for the purpose of
                            providing you with our products and services.
                        </p>
                    </li>
                    <li>
                        <h3>Cookies</h3>
                        <p>
                            We use cookies to enhance your experience on our
                            website. Cookies are small files that a site or its
                            service provider transfers to your computer&apos;s
                            hard drive through your web browser (if you allow)
                            that enables the site&apos;s or service
                            provider&apos;s systems to recognize your browser
                            and capture and remember certain information.
                        </p>
                    </li>
                    <li>
                        <h3>Third-party disclosure</h3>
                        <p>
                            We do not sell, trade, or otherwise transfer your
                            personally identifiable information to third parties
                            without your consent. This does not include trusted
                            third parties who assist us in operating our
                            website, conducting our business, or servicing you,
                            as long as those parties agree to keep this
                            information confidential.
                        </p>
                    </li>
                    <li>
                        <h3>Security</h3>
                        <p>
                            We take reasonable precautions to protect your
                            information. However, no method of transmission over
                            the internet or electronic storage is completely
                            secure, and we cannot guarantee absolute security.
                        </p>
                    </li>
                    <li>
                        <h3>Changes to privacy policy</h3>
                        <p>
                            We reserve the right to update our Privacy Policy at
                            any time. Any changes will be posted on this page.
                            We encourage you to check this page periodically for
                            any changes.
                        </p>
                    </li>
                </ol>
            </div>
        </>
    )
}
