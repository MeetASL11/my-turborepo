import helper from '@/lib/helper'

const URL = process.env.NEXT_PUBLIC_APP_URL || ''
const lastMod = new Date().toISOString()

function generateSiteMap(): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    ${helper.toolData.map(
        (tool) =>
            `
            <url>
            <loc>${URL}/tools/${tool.slug}</loc>
            <lastmod>${lastMod}</lastmod>
            </url>
        `,
    )}
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
