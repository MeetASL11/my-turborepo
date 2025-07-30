import { NextRequest, NextResponse } from 'next/server'
import dns, { RecordWithTtl } from 'dns'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request?.nextUrl?.toString())
    const url = searchParams.get('url') || ''
    const domain =
        url.startsWith('http://') || url.startsWith('https://')
            ? new URL(url).hostname
            : url

    try {
        const addresses = await new Promise<string[]>((resolve, reject) => {
            dns.resolveNs(domain, (err, addresses) => {
                if (err) reject(err)
                else resolve(addresses)
            })
        })

        const ttlRecords = await new Promise<RecordWithTtl[]>(
            (resolve, reject) => {
                dns.resolve4(domain, { ttl: true }, (err, addresses) => {
                    if (err) reject(err)
                    else resolve(addresses)
                })
            },
        )

        return NextResponse.json({
            status: 'SUCCESS',
            domain: domain,
            result: addresses,
            ttlRecords: ttlRecords,
        })
    } catch (error: any) {
        return Response.json({
            status: 'FAILED',
            domain: domain,
        })
    }
}
