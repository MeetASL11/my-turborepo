import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <div className="-mt-[60px] sm:-mt-[68px] lg:-mt-[86px]">
                {children}
            </div>
            <Footer />

            <div className="sticky bottom-0 z-50 overflow-hidden bg-gradient-to-r from-black via-secondary to-secondary duration-300">
                {/* <Image
                    src="/images/line.gif"
                    width={600}
                    height={215}
                    alt="Discount image"
                    className="absolute inset-x-0 top-0 block h-0.5 w-full"
                ></Image> */}
                <Image
                    src="/images/star.png"
                    width={50}
                    height={50}
                    alt="Star image"
                    className="absolute -bottom-2 left-10 hidden w-7 animate-pulse sm:left-28 sm:block lg:left-[15%]"
                ></Image>
                <Image
                    src="/images/gift3.gif"
                    width={253}
                    height={215}
                    alt="Discount image"
                    className="absolute -top-0 left-40 hidden w-8 md:left-60 xl:left-[29%] xl:block"
                ></Image>
                <Image
                    src="/images/gift3.gif"
                    width={253}
                    height={215}
                    alt="Discount image"
                    className="absolute bottom-1 right-10 hidden w-8 sm:block md:right-20 xl:right-[16%]"
                ></Image>
                <Image
                    src="/images/star.png"
                    width={50}
                    height={50}
                    alt="Star image"
                    className="absolute -top-2 right-24 hidden w-8 animate-pulse sm:block md:right-40 xl:right-[28%]"
                ></Image>
                <Image
                    src="/images/gift3.gif"
                    width={253}
                    height={215}
                    alt="Discount image"
                    className="absolute -left-1.5 -top-0.5 block w-8 sm:left-0 lg:left-10"
                ></Image>
                {/* <Image
                    src="/images/bell1.gif"
                    width={50}
                    height={50}
                    alt="Star image"
                    className="absolute -left-1.5 -top-0.5 block w-12 sm:left-0 sm:w-14 lg:left-10"
                ></Image> */}
                <div className="relative text-center text-xs font-medium text-white sm:text-sm/tight lg:text-lg">
                    <Link href="/subscription" className="block px-6 py-1.5">
                        Unlimited Access to Every Templates —{' '}
                        <span className="text-base font-bold lg:text-xl/6">
                            Only $99
                        </span>{' '}
                        🎁
                    </Link>
                </div>
            </div>
        </div>
    )
}
