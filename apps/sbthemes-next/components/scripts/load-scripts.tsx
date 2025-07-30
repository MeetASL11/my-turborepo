'use client'
import React from 'react'
import Script from 'next/script'

import GoogleAnalyticsEvent from '@/components/google-analytics-event'
import { GoogleAnalytics } from '@next/third-parties/google'

const LoadScripts = () => {
    if (typeof window === 'undefined') return null
    if (localStorage.getItem('SbthemesInternalUser') === 'true') return null
    return (
        <>
            <Script id="microsoft-clarity">
                {`(function (c, l, a, r, i, t, y) { c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) }; t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i + "?ref=bwt"; y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y); })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_KEY}");`}
            </Script>
            <GoogleAnalyticsEvent />
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GCODE || ''} />
        </>
    )
}

export default LoadScripts
