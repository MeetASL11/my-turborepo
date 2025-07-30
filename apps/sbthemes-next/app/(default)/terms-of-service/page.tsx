import React from 'react'
import { Metadata } from 'next'

import helper from '@/lib/helper'

export const metadata: Metadata = {
    title: 'Terms of Service | sbthemes',
    description: 'By using our website, you agree to our terms of service.',
    openGraph: {
        ...helper.openGraphData,
        title: 'Terms of Service | sbthemes',
        description: 'By using our website, you agree to our terms of service.',
        url: process.env.NEXT_PUBLIC_APP_URL + '/terms-of-service',
        type: 'website',
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_APP_URL}/terms-of-service`,
    },
}

export default function TermsOfService() {
    return (
        <>
            <div className="relative bg-gradient-to-r from-[#CACEFF]/10 to-gray-300/10 px-4 pb-10 pt-28 text-center sm:pt-32 lg:pb-[50px] lg:pt-40">
                <h1 className="text-[26px]/[30px] font-bold text-primary md:text-[40px]/[50px]">
                    Terms of Service
                </h1>
            </div>
            <div className="prose mx-auto my-8 w-full max-w-[1142px] px-4 lg:prose-lg lg:my-14">
                <ol type="1">
                    <li>
                        <h3>Agreement to terms</h3>
                        <p>
                            Welcome to sbthemes! By using our website, you agree
                            to comply with and be bound by these Terms and
                            Conditions. Please read them carefully before using
                            our site.
                        </p>
                    </li>
                    <li>
                        <h3>Intellectual property</h3>
                        <p>
                            All content on this website, including text,
                            graphics, logos, images, and software, is the
                            intellectual property of sbthemes and protected by
                            intellectual property laws. You may not use,
                            reproduce, or distribute any content without our
                            express written permission.
                        </p>
                    </li>
                    <li>
                        <h3>User responsibilities</h3>
                        <p>
                            You agree not to engage in any activity that may
                            disrupt or interfere with the functionality of the
                            website. Prohibited activities include but are not
                            limited to hacking, transmitting viruses, or
                            violating any laws.
                        </p>
                    </li>
                    <li>
                        <h3>Product information</h3>
                        <p>
                            We strive to provide accurate and up-to-date
                            information about our products. However, we do not
                            warrant the accuracy, completeness, or reliability
                            of any product information. Prices are subject to
                            change without notice, and we reserve the right to
                            modify or discontinue products at any time.
                        </p>
                    </li>
                    <li>
                        <h3>Ordering and payments</h3>
                        <p>
                            Orders are processed securely, and we do not store
                            credit card details. Prices for our products are
                            displayed in USD and are inclusive of applicable
                            taxes.
                        </p>
                    </li>
                    <li>
                        <h3>Termination</h3>
                        <p>
                            We reserve the right to terminate your access to the
                            website for violations of these Terms and
                            Conditions. Termination may result in the forfeiture
                            and destruction of all information associated with
                            your account.
                        </p>
                    </li>
                </ol>
            </div>
        </>
    )
}
