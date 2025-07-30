// pages/api/amp-validator.ts
import amphtmlValidator from 'amphtml-validator'
import http from 'http'
import https from 'https'

async function fetchHtml(url: string): Promise<string> {
    if (!/^https?:\/\//i.test(url)) {
        url = `https://${url}`
    }

    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http

        const req = client.get(url, (response) => {
            if (
                response.statusCode &&
                response.statusCode >= 300 &&
                response.statusCode < 400
            ) {
                reject(new Error(`Redirected: ${response.headers.location}`))
                return
            }

            let html = ''
            response.on('data', (chunk) => {
                html += chunk
            })

            response.on('end', () => {
                resolve(html)
            })
        })

        req.on('error', (err) => {
            reject(err)
        })
    })
}

// API POST
export async function POST(request: Request) {
    const { urls } = await request.json()

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
        return new Response(JSON.stringify({ error: 'No URLs provided.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    const results = []

    for (const url of urls) {
        try {
            const html = await fetchHtml(url)
            const validator = await amphtmlValidator.getInstance()
            const result = validator.validateString(html)

            results.push({
                url,
                status: result.status,
                errors: result.errors.map(
                    (error: amphtmlValidator.ValidationError) => ({
                        message: error.message,
                        line: error.line,
                        col: error.col,
                        specUrl: error.specUrl || '',
                        code: error.code || '',
                    }),
                ),
            })
        } catch (error: any) {
            results.push({
                url,
                status: 'ERROR',
                errors: [
                    { message: `Error validating the URL: ${error.message}` },
                ],
            })
        }
    }

    return new Response(JSON.stringify(results), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
    })
}
