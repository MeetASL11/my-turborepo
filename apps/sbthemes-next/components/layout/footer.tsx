import Image from 'next/image'
import Link from 'next/link'

import IconShape from '@/components/icons/icon-shape'
import IconXSocial from '@/components/icons/icon-x-social'
import { Button } from '@/components/ui/button'
import NavLink from '@/components/ui/nav-link'

export default function Footer() {
    return (
        <footer className="mt-auto">
            <div className="container">
                <div className="flex flex-col gap-10 border-b border-primary/10 py-10 lg:flex-row lg:gap-20 lg:pb-14 lg:pt-20 xl:gap-40 2xl:gap-60">
                    <div className="w-full space-y-5 border-b border-border pb-8 lg:max-w-96 lg:border-b-0 lg:pb-0 xl:max-w-[450px]">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/images/logo.svg"
                                width={132}
                                height={36}
                                className="h-full w-[132px]"
                                alt="Logo"
                            />
                        </Link>
                        <p className="text-base font-medium lg:leading-[30px]">
                            Explore premium and free templates at sbthemes.
                            Elevate your online presence with ease. Your journey
                            to a stunning website begins here.
                        </p>

                        <NavLink
                            href="/subscription"
                            className="hidden lg:block"
                        >
                            <Button type="button">
                                All Templates – Just $99
                                <span className="">🔥</span>
                            </Button>
                        </NavLink>

                        <Link
                            href="https://x.com/sbthemes_com"
                            target="_blank"
                            aria-label="Visit our X profile"
                            className="group relative inline-block shrink-0 text-white"
                        >
                            <IconShape className="size-[50px] transition group-hover:text-gray-200 [&_path]:stroke-border" />
                            <IconXSocial className="absolute left-1/2 top-1/2 size-5 shrink-0 -translate-x-1/2 -translate-y-1/2 text-gray" />
                        </Link>
                    </div>
                    <div className="flex grow flex-col justify-between gap-8 sm:flex-row">
                        <div>
                            <h2 className="mb-5 text-sm/[18px] font-semibold uppercase tracking-widest text-primary lg:mb-[30px]">
                                Technologies
                            </h2>
                            <div className="flex flex-col items-start gap-3 font-medium leading-5 lg:gap-5">
                                <Link
                                    href="/templates/nextjs"
                                    className="inline-flex transition hover:text-secondary"
                                >
                                    Next.js templates
                                </Link>
                                <Link
                                    href="/templates/react"
                                    className="inline-flex transition hover:text-secondary"
                                >
                                    React templates
                                </Link>
                                <Link
                                    href="/templates/html5"
                                    className="inline-flex transition hover:text-secondary"
                                >
                                    HTML5 templates
                                </Link>
                                <Link
                                    href="/templates/tailwind-css"
                                    className="inline-flex transition hover:text-secondary"
                                >
                                    Tailwind CSS templates
                                </Link>
                                <Link
                                    href="/templates/vuejs"
                                    className="inline-flex transition hover:text-secondary"
                                >
                                    Vue.js templates
                                </Link>
                                <Link
                                    href="/templates/nuxt"
                                    className="inline-flex transition hover:text-secondary"
                                >
                                    Nuxt templates
                                </Link>
                                <Link
                                    href="/templates/angularjs"
                                    className="inline-flex transition hover:text-secondary"
                                >
                                    AngularJs templates
                                </Link>
                            </div>
                        </div>
                        <div>
                            <h2 className="mb-5 text-sm/[18px] font-semibold uppercase tracking-widest text-primary lg:mb-[30px]">
                                Company
                            </h2>
                            <div className="flex flex-col items-start gap-3 font-medium leading-5 lg:gap-5">
                                <Link
                                    href="/blog"
                                    className="inline-flex transition hover:text-secondary"
                                >
                                    Blog
                                </Link>
                                <Link
                                    href="/tools"
                                    className="inline-flex transition hover:text-secondary"
                                >
                                    Tools
                                </Link>
                                <Link
                                    href="/sitemap"
                                    className="inline-flex transition hover:text-secondary"
                                >
                                    Sitemap
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex transition hover:text-secondary"
                                >
                                    Help & Support
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex transition hover:text-secondary"
                                >
                                    Contact us
                                </Link>
                            </div>
                        </div>
                        <div>
                            <h2 className="mb-5 text-sm/[18px] font-semibold uppercase tracking-widest text-primary lg:mb-[30px]">
                                Legal
                            </h2>
                            <div className="flex flex-col items-start gap-3 font-medium leading-5 lg:gap-5">
                                <Link
                                    href="/terms-of-service"
                                    className="inline-flex transition hover:text-secondary"
                                >
                                    Terms of service
                                </Link>
                                <Link
                                    href="/privacy-policy"
                                    className="inline-flex transition hover:text-secondary"
                                >
                                    Privacy policy
                                </Link>
                                <Link
                                    href="/refund-policy"
                                    className="inline-flex transition hover:text-secondary"
                                >
                                    Refund policy
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-5 text-primary md:py-[30px]">
                    <p className="text-center text-sm/[18px] font-medium md:text-left">
                        &copy;{new Date().getFullYear()} sbthemes. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
