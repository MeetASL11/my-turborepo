'use client'
import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const EmbedPage = () => {
    const defaultValue = `<div class="vacuum-compare" data-vacuumwar-compare data-products="B0DRJ7PBZG,B0DGXRQQ3H,B0DPMN3YPY"></div>
<div class="vacuum-compare" data-vacuumwar-compare data-products="B0B9Q98B7V3,B0DKY86R22,B0CQCTFVKN"></div>`
    const [url, setUrl] = useState(defaultValue)

    const [savedUrl, setSavedUrl] = useState('')

    const handleSave = () => {
        setSavedUrl(url)
    }

    useEffect(() => {
        ;(function (window) {
            const baseUrl = 'https://vacuumwars-front.s2.ohso.dev/embed/'

            // Loop through each compare widget
            document
                .querySelectorAll('[data-vacuumwar-compare]')
                .forEach((container, index) => {
                    const productsAttr =
                        container.getAttribute('data-products') || ''
                    const productList = productsAttr
                        .split(',')
                        .map((p) => p.trim())
                        .filter(Boolean)

                    if (productList.length === 0) return

                    const params = productList
                        .map(
                            (p, i) =>
                                `product${i + 1}=${encodeURIComponent(p)}`,
                        )
                        .join('&')

                    const iframe = document.createElement('iframe')
                    iframe.setAttribute('src', `${baseUrl}?${params}`)
                    iframe.setAttribute('width', '100%')
                    /* @ts-ignore */
                    iframe.setAttribute('frameBorder', 0)
                    iframe.style.display = 'block'
                    iframe.style.border = 'none'
                    iframe.style.margin = '0 auto'
                    iframe.style.maxWidth = '100%'
                    /* @ts-ignore */
                    iframe.dataset.compareIframeId = index

                    container.appendChild(iframe)
                })

            // Listen for height update messages
            window.addEventListener('message', function (event) {
                // Optional: restrict by origin
                // if (event.origin !== baseUrl) return;

                const data = event.data?.vacuumwarCompare
                if (data?.type === 'pageHeight') {
                    document
                        .querySelectorAll('iframe[data-compare-iframe-id]')
                        .forEach((iframe) => {
                            /* @ts-ignore */
                            if (iframe.contentWindow === event.source) {
                                /* @ts-ignore */
                                iframe.style.height = data.height + 'px'
                            }
                        })
                }
            })
        })(window)
    }, [savedUrl])

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-5 p-5">
                <Textarea
                    placeholder="Enter code"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <Button type="button" onClick={handleSave}>
                    Save
                </Button>

                {savedUrl && (
                    <div
                        className="w-full"
                        dangerouslySetInnerHTML={{ __html: savedUrl }}
                    ></div>
                )}
            </div>
        </>
    )
}

export default EmbedPage
