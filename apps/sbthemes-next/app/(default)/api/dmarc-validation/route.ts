import { NextRequest, NextResponse } from 'next/server'
import dns from 'dns'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request?.nextUrl?.toString())
    const url = searchParams.get('url') || ''

    const domain =
        url.startsWith('http://') || url.startsWith('https://')
            ? new URL(url).hostname
            : url

    const dmarcDomain = `_dmarc.${domain}`

    try {
        //to get DMARC records
        const addresses = await new Promise<string[][]>((resolve, reject) => {
            dns.resolveTxt(dmarcDomain, (err, addresses) => {
                if (err) reject(err)
                else resolve(addresses)
            })
        })

        if (!addresses?.length) {
            return NextResponse.json({
                status: 'FAILED',
                domain: domain,
                dmarcDomain: dmarcDomain,
                error: 'DMARC result not found',
            })
        }

        return NextResponse.json({
            status: 'SUCCESS',
            domain: domain,
            dmarcDomain: dmarcDomain,
            dmarcResult: addresses?.[0],
        })
    } catch (error: any) {
        return Response.json({
            status: 'FAILED',
            domain: domain,
            dmarcDomain: error?.hostname,
            error: 'DMARC result not found',
            code: error?.code,
        })
    }
}
