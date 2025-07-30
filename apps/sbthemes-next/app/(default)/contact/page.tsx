import React from 'react'
import { Metadata } from 'next'

import ContactForm from '@/app/(default)/contact/_contact-form'
import ClientReviews from '@/components/custom/client-reviews'
import helper from '@/lib/helper'

export const metadata: Metadata = {
    title: 'Contact us | sbthemes',
    description:
        'Email or complete the form to learn how sbthemes can solve your messaging problem.',
    openGraph: {
        ...helper.openGraphData,
        title: 'Contact us | sbthemes',
        description:
            'Email or complete the form to learn how sbthemes can solve your messaging problem.',
        url: process.env.NEXT_PUBLIC_APP_URL + '/contact',
        type: 'website',
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_APP_URL}/contact`,
    },
}

export default function ContactUs() {
    return (
        <>
            <div className="container mt-28 lg:mt-[162px]">
                <div className="flex flex-col items-start gap-8 lg:gap-12 rounded-xl from-[#CACEFF]/10 to-gray-300/10 sm:bg-gradient-to-r sm:px-12 sm:py-12 lg:flex-row lg:py-20 xl:gap-16 xl:px-[100px]">
                    <div>
                        <div className="space-y-2.5">
                            <div className="inline-block rounded-full border border-border bg-gradient-to-r from-[#CACEFF]/10 to-gray-300/10 px-2 py-1 text-sm/[18px] font-medium text-primary md:px-3.5 md:py-2.5">
                                Contact support team
                            </div>
                            <h1 className="text-2xl font-bold -tracking-wide text-primary md:text-4xl/[45px] 2xl:text-6xl/[75px]">
                                Get in touch with us. <br />
                                We&apos;re here to assist you.
                            </h1>
                            <p className="w-full max-w-[500px] text-sm/5 font-medium lg:text-base">
                                Send your questions or concerns through the
                                form, and our team will assist you as soon as
                                possible.
                            </p>
                        </div>
                        <div className="flex flex-col gap-5 sm:flex-row sm:gap-10 xl:gap-20">
                            {/* <div className="space-y-3 sm:space-y-5">
                                <div className="grid size-9 place-content-center rounded-xl bg-white shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.08)] sm:size-[46px]">
                                    <Mail className="size-5 text-primary" />
                                </div>
                                <div>
                                    <label className="mb-1 block font-semibold sm:mb-2.5">
                                        Email address
                                    </label>
                                    <Link
                                        href="mailto:contact@sbthemes.com"
                                        className="font-semibold text-primary transition hover:opacity-80 md:text-lg/[22px]"
                                    >
                                        contact@sbthemes.com
                                    </Link>
                                </div>
                                <div>
                                    <label className="mb-1 block font-semibold sm:mb-2.5">
                                        Assistance hours:
                                    </label>
                                    <p className="font-medium text-primary md:text-lg/[22px]">
                                        Monday - Friday 6 am to 8 pm
                                    </p>
                                </div>
                            </div> */}
                            {/* <div className="space-y-3 sm:space-y-5">
                                <div className="grid size-9 place-content-center rounded-xl bg-white shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.08)] sm:size-[46px]">
                                    <Phone className="size-5 text-primary" />
                                </div>
                                <div>
                                    <label className="mb-1 block font-semibold sm:mb-2.5">
                                        Contact number
                                    </label>
                                    <Link
                                        href="tel:+1 713-615-2790"
                                        className="font-semibold text-primary transition hover:opacity-80 md:text-lg/[22px]"
                                    >
                                        +1 713-615-2790
                                    </Link>
                                </div>
                                <div>
                                    <label className="mb-1 block font-semibold sm:mb-2.5">
                                        Assistance hours:
                                    </label>
                                    <p className="font-medium text-primary md:text-lg/[22px]">
                                        Monday - Friday 6 am to 8 pm
                                    </p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <ContactForm />
                </div>
            </div>

            <ClientReviews />
        </>
    )
}
