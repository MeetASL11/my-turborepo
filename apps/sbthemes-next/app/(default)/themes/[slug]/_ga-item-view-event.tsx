'use client'
import { useEffect } from 'react'

import { gtCartEvent } from '@/lib/gevent'
import { IProduct } from '@/types/product'

export default function GAItemViewEvent({ item }: { item: IProduct }) {
    useEffect(() => {
        if (
            typeof window !== 'undefined' &&
            typeof window.gtag === 'function'
        ) {
            gtCartEvent({
                action: 'view_item',
                currency: 'USD',
                value: item?.plans?.pro?.price || 0,
                items: [
                    {
                        item_id: item?.slug,
                        item_name: item?.name,
                        affiliation: 'sbthemes',
                        index: 0,
                        item_brand: 'sbthemes',
                        item_category: item?.tech_stack_array[0] || '',
                        item_category2: item?.tech_stack_array[1] || '',
                        item_category3: item?.tech_stack_array[2] || '',
                        item_category4: item?.tech_stack_array[3] || '',
                        item_category5: item?.tech_stack_array[4] || '',
                        price: item?.plans?.pro?.price || 0,
                        quantity: 1,
                    },
                ],
            })

            if (item.slug === 'nexadash') {
                gtCartEvent({
                    action: 'conversion',
                    send_to: 'AW-16558824371/FyymCIy0zPgZELO37tc9',
                })
            }
        }
    })
    return <></>
}
