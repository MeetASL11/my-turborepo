import { NextRequest, NextResponse } from 'next/server'
import dns from 'dns'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request?.nextUrl?.toString())
    const url = searchParams.get('url') || ''
    try {
        const domain =
            url.startsWith('http://') || url.startsWith('https://')
                ? new URL(url).hostname
                : url

        //to get ip address type
        const ip = await new Promise<any>((resolve, reject) => {
            dns.lookup(domain, (err, address, family) => {
                if (err) reject(err)
                else resolve({ address, family })
            })
        })

        //to get CNAME
        const addresses = await new Promise<string[]>((resolve, reject) => {
            dns.resolveCname(domain, (err, addresses) => {
                if (err) reject(err)
                else resolve(addresses)
            })
        })

        //To get ttl
        let records: any[] = []
        if (ip?.family === 4) {
            records = await new Promise<any[]>((resolve, reject) => {
                dns.resolve4(domain, { ttl: true }, (err, addresses) => {
                    if (err) reject(err)
                    else resolve(addresses)
                })
            })
        } else {
            records = await new Promise<any[]>((resolve, reject) => {
                dns.resolve6(domain, { ttl: true }, (err, addresses) => {
                    if (err) reject(err)
                    else resolve(addresses)
                })
            })
        }

        if (!addresses?.length) {
            return NextResponse.json({
                status: 'FAILED',
                type: 'CNAME',
                domain: domain,
                ttl: records?.[0],
                result: {
                    result: false,
                    key: 'DNS Record Published',
                    description: 'DNS Record not found',
                },
            })
        }

        return NextResponse.json({
            status: 'SUCCESS',
            type: 'CNAME',
            domain: domain,
            canonicalName: addresses?.[0],
            ttl: records?.[0],
            result: {
                key: 'DNS Record Published',
                description: 'DNS Record Found',
                result: true,
            },
        })
    } catch (error: any) {
        return Response.json({
            status: 'FAILED',
            domain: error?.hostname,
            result: {
                result: false,
                key: 'DNS Record Published',
                description: 'DNS Record not found',
            },
        })
    }
}
