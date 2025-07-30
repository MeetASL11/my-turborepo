const URL = process.env.NEXT_PUBLIC_APP_URL || ''
const lastMod = new Date().toISOString()

function generateSiteMap(): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${URL}</loc>
        <lastmod>${lastMod}</lastmod>
    </url>
    <url>
        <loc>${URL}/subscription</loc>
        <lastmod>${lastMod}</lastmod>
    </url>
    <url>
        <loc>${URL}/free-templates</loc>
        <lastmod>${lastMod}</lastmod>
    </url>
    <url>
        <loc>${URL}/themes</loc>
        <lastmod>${lastMod}</lastmod>
    </url>
    <url>
        <loc>${URL}/templates</loc>
        <lastmod>${lastMod}</lastmod>
    </url>
    <url>
        <loc>${URL}/templates/html5</loc>
        <lastmod>${lastMod}</lastmod>
    </url>
    <url>
        <loc>${URL}/templates/react</loc>
        <lastmod>${lastMod}</lastmod>
    </url>
    <url>
        <loc>${URL}/templates/nextjs</loc>
        <lastmod>${lastMod}</lastmod>
    </url>
    <url>
        <loc>${URL}/templates/vuejs</loc>
        <lastmod>${lastMod}</lastmod>
    </url>
    <url>
        <loc>${URL}/templates/nuxt</loc>
        <lastmod>${lastMod}</lastmod>
    </url>
    <url>
        <loc>${URL}/templates/angularjs</loc>
        <lastmod>${lastMod}</lastmod>
    </url>
    <url>
        <loc>${URL}/contact</loc>
        <lastmod>${lastMod}</lastmod>
    </url>
    <url>
        <loc>${URL}/blog</loc>
        <lastmod>${lastMod}</lastmod>
    </url>
    <url>
        <loc>${URL}/tools</loc>
        <lastmod>${lastMod}</lastmod>
    </url>
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
