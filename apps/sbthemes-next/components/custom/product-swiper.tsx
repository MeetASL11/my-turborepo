'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

export default function ProductSwiper({ swiperData }: any) {
    return (
        <>
            <Swiper
                pagination={{
                    dynamicBullets: false,
                    clickable: true,
                }}
                modules={[Pagination, Navigation]}
                spaceBetween={56}
                speed={400}
                loop={true}
                className="product-swiper relative !-mr-4 !pb-10 !pr-4 lg:!-mr-10 lg:!pb-14 lg:!pr-10"
                navigation={{
                    nextEl: '.product-detail-next',
                    prevEl: '.product-detail-prev',
                }}
            >
                {swiperData?.map(
                    (
                        item: {
                            src: string
                            alt: string
                            href?: string
                        },
                        index: number,
                    ) => (
                        <SwiperSlide key={index}>
                            {!!item.href ? (
                                <Link href={item.href} target="_blank">
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        width={800}
                                        height={481}
                                        className="rounded-xl shadow-[10px_16px_20px_0_rgba(68,68,68,0.1)]"
                                    />
                                </Link>
                            ) : (
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    width={800}
                                    height={481}
                                    className="rounded-xl shadow-[10px_16px_20px_0_rgba(68,68,68,0.1)]"
                                />
                            )}
                        </SwiperSlide>
                    ),
                )}
                <div className="absolute inset-x-0 top-1/2 z-10 -mt-6 mr-4 flex -translate-y-1/2 justify-between gap-2 px-2 sm:px-5 lg:mr-10">
                    <button
                        type="button"
                        className="product-detail-prev grid size-[24px] shrink-0 place-content-center rounded-full bg-white text-primary transition hover:opacity-80"
                    >
                        <ChevronLeft className="size-6 shrink-0" />
                    </button>
                    <button
                        type="button"
                        className="product-detail-next grid size-[24px] shrink-0 place-content-center rounded-full bg-white text-primary transition hover:opacity-80"
                    >
                        <ChevronRight className="size-6 shrink-0" />
                    </button>
                </div>
            </Swiper>
        </>
    )
}
