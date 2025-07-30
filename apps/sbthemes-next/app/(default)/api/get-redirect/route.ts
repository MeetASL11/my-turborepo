// api/get-redirect.ts
async function getRedirectUrl(url: string): Promise<any> {
    const response = await fetch(url, { redirect: 'manual' })

    const { status, headers, statusText } = response
    const location = headers.get('location')

    let redirectHostName = null
    if (location) {
        try {
            const redirectUrl = new URL(location, url)
            redirectHostName = redirectUrl.hostname
        } catch {}
    }

    if (status === 200) {
        return {
            status,
        }
    }

    return {
        status,
        location,
        statusText,
        redirectHostName,
    }
}

// API get
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')

    if (!url) {
        return new Response('URL parameter is required', { status: 400 })
    }

    try {
        const redirectData = await getRedirectUrl(url)

        return new Response(JSON.stringify(redirectData), {
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        console.error('Error fetching URL:', error)
        return new Response('Error fetching URL', { status: 500 })
    }
}
