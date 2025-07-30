import helper from '@/lib/helper'

const URL = process.env.NEXT_PUBLIC_APP_URL || ''
const lastMod = new Date().toISOString()

function generateSiteMap(): string {
    const products = helper.getProducts()
    const urls = products?.map((item: any) => {
        return `<url>
        <loc>${URL}/themes/${item?.slug}</loc>
        <lastmod>${lastMod}</lastmod>
    </url>`
    })

    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
    </urlset>`
}

export function GET(): Response {
    const body = generateSiteMap()

    return new Response(body, {
        status: 200,
        headers: {
            'content-type': 'application/xml',
        },
    })
}
