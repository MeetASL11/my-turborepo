import { NextRequest, NextResponse } from 'next/server'
import dns from 'dns'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request?.nextUrl?.toString())
    const url = searchParams.get('url') || ''
    const selector = searchParams.get('selector') || ''
    const domain =
        url.startsWith('http://') || url.startsWith('https://')
            ? new URL(url).hostname
            : url

    const dkimDomain = `${selector}._domainkey.${domain}`

    try {
        //to get DKIM records
        const addresses = await new Promise<string[][]>((resolve, reject) => {
            dns.resolveTxt(dkimDomain, (err, addresses) => {
                if (err) reject(err)
                else resolve(addresses)
            })
        })

        if (!addresses?.length) {
            return NextResponse.json({
                status: 'FAILED',
                domain: domain,
                dkimDomain: dkimDomain,
                selector: selector,
                dkimResult: 'DKIM result not found',
            })
        }

        return NextResponse.json({
            status: 'SUCCESS',
            domain: domain,
            selector: selector,
            dkimResult: addresses?.[0],
            dkimDomain: dkimDomain,
        })
    } catch (error: any) {
        return Response.json({
            status: 'FAILED',
            domain: domain,
            dkimDomain: error?.hostname,
            selector: selector,
            dkimResult: 'DKIM  result not found',
        })
    }
}
