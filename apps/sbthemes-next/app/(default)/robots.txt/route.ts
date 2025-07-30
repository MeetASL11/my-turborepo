const URL = process.env.NEXT_PUBLIC_APP_URL || "";

function generateSiteMap(): string {
    return `User-agent: *
Disallow: ${process.env.NEXT_PUBLIC_TEST_MODE === "true" ? "/" : ""}

Sitemap: ${URL}/sitemap.xml`;
}

export function GET(): Response {
    const body: string = generateSiteMap();

    return new Response(body);
}
