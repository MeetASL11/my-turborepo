import { NextResponse } from 'next/server'

import {
    createCheckout,
    lemonSqueezySetup,
    NewCheckout,
} from '@lemonsqueezy/lemonsqueezy.js'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const variantId = searchParams.get('variant_id') || 0

    const storeId = process.env.LEMON_STORE_ID || 0

    if (variantId === 0) {
        return NextResponse.json({
            status: 'error',
            message: 'Variant id is required',
        })
    }

    try {
        lemonSqueezySetup({
            apiKey: process.env.LEMON_API_KEY,
        })

        const newCheckout: NewCheckout = {
            checkoutOptions: {
                dark: true,
                logo: false,
                embed: true,
                desc: false,
                media: false,
                subscriptionPreview: true,
            },
            checkoutData: {
                variantQuantities: [
                    {
                        variantId: parseInt(variantId),
                        quantity: 1,
                    },
                ],
            },
            expiresAt: null,
            preview: true,
            productOptions: {
                enabledVariants: [parseInt(variantId)],
            },
        }

        const {
            statusCode,
            error,
            data: checkoutData,
        } = await createCheckout(storeId, variantId, newCheckout)

        if (!checkoutData) {
            return NextResponse.json({
                status: 'error',
                message: 'Something went wrong. Please try again later.',
                error: error,
            })
        }

        return NextResponse.json({
            status: 'success',
            url: checkoutData?.data?.attributes?.url || null,
        })
    } catch (error) {
        return NextResponse.json({
            status: 'error',
            message: 'Something went wrong. Please try again later.',
            error: error,
        })
    }
}
