import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import helper from '@/lib/helper'

export const metadata: Metadata = {
    title: 'Refund policy | sbthemes',
    description:
        'We do not provide refunds for digital products. All sales of digital items are final.',
    openGraph: {
        ...helper.openGraphData,
        title: 'Refund policy | sbthemes',
        description:
            'We do not provide refunds for digital products. All sales of digital items are final.',
        url: process.env.NEXT_PUBLIC_APP_URL + '/refund-policy',
        type: 'website',
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_APP_URL}/refund-policy`,
    },
}
export default function PrivacyPolicy() {
    return (
        <>
            <div className="relative bg-gradient-to-r from-[#CACEFF]/10 to-gray-300/10 px-4 pb-10 pt-28 text-center sm:pt-32 lg:pb-[50px] lg:pt-40">
                <h1 className="text-[26px]/[30px] font-bold text-primary md:text-[40px]/[50px]">
                    Refund policy
                </h1>
            </div>
            <div className="prose mx-auto my-8 w-full max-w-[1142px] px-4 lg:prose-lg lg:my-14">
                <ol type="1">
                    <li>
                        <h3>Refund policy for Digital Products</h3>
                        <p>
                            We do not provide refunds for digital products. All
                            sales of digital items are final.
                        </p>
                    </li>
                    <li>
                        <h3>Non-refundable items</h3>
                        <p>
                            All digital products, including themes, software,
                            and downloadable content, are non-refundable.
                        </p>
                    </li>
                    <li>
                        <h3>Contact information</h3>
                        <p>
                            If you have any questions about our refund policy or
                            encounter issues with your digital purchase, please
                            contact our support team at{' '}
                            <Link href="/contact">contact us</Link>. We are here
                            to assist you.
                        </p>
                    </li>
                </ol>
            </div>
        </>
    )
}
