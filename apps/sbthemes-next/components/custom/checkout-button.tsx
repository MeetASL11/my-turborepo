'use client'

import { ReactNode, useEffect, useState } from 'react'
import Script from 'next/script'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { gtCartEvent } from '@/lib/gevent'
import { cn } from '@/lib/utils'
import { IProduct } from '@/types/product'

interface IItem {
    variantId: number
    price: number | string
    title: string
    slug: string
}
interface IProps {
    children: ReactNode
    item: IItem
    size?: 'default' | 'large' | 'small'
    className?: string
    variant?: 'default' | 'outline-general' | 'outline-shadow'
}

declare global {
    interface Window {
        createLemonSqueezy: () => void
        LemonSqueezy: {
            /**
             * Initialises Lemon.js on your page.
             * @param options - An object with a single property, eventHandler, which is a function that will be called when Lemon.js emits an event.
             */
            Setup: (options: {
                eventHandler: (event: { event: string }) => void
            }) => void
            /**
             * Refreshes `lemonsqueezy-button` listeners on the page.
             */
            Refresh: () => void

            Url: {
                /**
                 * Opens a given Lemon Squeezy URL, typically these are Checkout or Payment Details Update overlays.
                 * @param url - The URL to open.
                 */
                Open: (url: string) => void

                /**
                 * Closes the current opened Lemon Squeezy overlay checkout window.
                 */
                Close: () => void
            }
            Affiliate: {
                /**
                 * Retrieve the affiliate tracking ID
                 */
                GetID: () => string

                /**
                 * Append the affiliate tracking parameter to the given URL
                 * @param url - The URL to append the affiliate tracking parameter to.
                 */
                Build: (url: string) => string
            }
        }
    }
}

const CheckoutButton = ({
    children,
    item,
    size = 'default',
    className,
    variant = 'default',
}: IProps) => {
    const [isPreparing, setIsPreparing] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const handleCheckout = async () => {
        setIsLoading(true)
        try {
            const reqFetch = await fetch(
                `/api/checkout?variant_id=${item.variantId}`,
            )
            const data = await reqFetch.json()

            if (data.status === 'error' || !data.url) {
                toast({
                    title: 'Something went wrong. Please try again later.',
                    variant: 'error',
                })
                setIsLoading(false)
                return
            }

            window.LemonSqueezy.Url.Open(data.url)

            gtCartEvent({
                action: 'begin_checkout',
                currency: 'USD',
                values: item.price,
                items: [
                    {
                        item_id: item.variantId,
                        item_name: item.title,
                        price: item.price,
                        quantity: 1,
                    },
                ],
            })

            // google ads tracking
            if (process.env.NODE_ENV === 'production') {
                gtCartEvent({
                    action: 'conversion',
                    send_to: 'AW-772261341/U-zMCI_fn_gZEN2Ln_AC',
                })
            }

            window.LemonSqueezy.Setup({
                eventHandler: (event: any) => {
                    if (event.event === 'Checkout.Success') {
                        const order =
                            event?.data?.order?.data?.attributes || null
                        if (order && order.status === 'paid') {
                            gtCartEvent({
                                action: 'purchase',
                                transaction_id: order.identifier,
                                currency: 'USD',
                                values: order.total_usd / 100,
                                tax: order.tax_usd / 100,
                                items: [
                                    {
                                        item_id: item.variantId,
                                        item_name: item.title,
                                        price: item.price,
                                        quantity: 1,
                                    },
                                ],
                            })

                            // google ads tracking
                            if (process.env.NODE_ENV === 'production') {
                                gtCartEvent({
                                    action: 'conversion',
                                    send_to:
                                        'AW-772261341/uZtOCIzfn_gZEN2Ln_AC',
                                    transaction_id: order.identifier,
                                })
                            }
                        }
                    }
                },
            })
        } catch (error) {
            toast({
                title: 'Something went wrong. Please try again later.',
                variant: 'error',
            })
        }
        setIsLoading(false)
    }

    useEffect(() => {
        const intervalTime = setInterval(() => {
            if (typeof window.createLemonSqueezy === 'function') {
                window.createLemonSqueezy()
                setIsPreparing(false)
                clearInterval(intervalTime)
            }
        }, 500)
        return () => {
            clearInterval(intervalTime)
        }
    }, [])

    return (
        <>
            <Script
                id="lemon"
                src="https://app.lemonsqueezy.com/js/lemon.js"
                defer
            ></Script>
            <div className="bg-white">
                <Button
                    onClick={handleCheckout}
                    disabled={isPreparing}
                    loading={isLoading}
                    type="button"
                    className={cn('w-full', className)}
                    variant={variant}
                    size={size}
                >
                    <div className="flex items-center justify-center gap-1.5">
                        {children}
                    </div>
                </Button>
            </div>
        </>
    )
}

export default CheckoutButton
