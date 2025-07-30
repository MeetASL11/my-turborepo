'use client'

import React, { useEffect, useState } from 'react'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import TemplateCard from '@/components/custom/template-card'
import helper from '@/lib/helper'
import { IProduct } from '@/types/product'

import 'swiper/css'

export default function ProductCardSwiper({ swiperData }: any) {
    const templates: IProduct[] = helper.getProducts()

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <>
            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={40}
                slidesPerView={1}
                speed={500}
                loop={true}
                className="!grid !overflow-visible !pb-16 lg:!pb-20"
                navigation={{
                    nextEl: '.product-detail-next',
                    prevEl: '.product-detail-prev',
                }}
                breakpoints={{
                    1600: {
                        slidesPerView: 3.7,
                        spaceBetween: 45,
                    },
                    1024: {
                        slidesPerView: 3.5,
                        spaceBetween: 30,
                    },
                    768: {
                        slidesPerView: 2.3,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 2.1,
                        spaceBetween: 20,
                    },
                }}
            >
                {templates.map((template: IProduct) => (
                    <SwiperSlide key={template.id}>
                        <TemplateCard template={template} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}
