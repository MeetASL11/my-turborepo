'use client'

import { useEffect } from 'react'

import { gtEvent } from '@/lib/gevent'

export default function GoogleAnalyticsEvent() {
    useEffect(() => {
        /* if (typeof window !== 'undefined') {
            try {
                LogRocket.init(process.env.NEXT_PUBLIC_LOG_ROCKET_ID);
            } catch {}
        } */

        setTimeout(() => {
            if (
                typeof window !== 'undefined' &&
                typeof window.gtag === 'function' &&
                process.env.NODE_ENV === 'production'
            ) {
                // google ads tracking
                console.log('Google Analytics')
                // window.gtag('config', 'AW-772261341')
                window.gtag('config', 'AW-16558824371')
            }
        }, 1000)

        const handleClick = (event: any) => {
            const { target } = event
            const gtData = target.getAttribute('data-gt-event')
            if (gtData) {
                const [category, action, label, value] = gtData.split('|')
                gtEvent({ category, action, label, value })
            }
        }

        setTimeout(() => {
            document.addEventListener('click', handleClick, true)
        }, 100)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])
    return <></>
}
