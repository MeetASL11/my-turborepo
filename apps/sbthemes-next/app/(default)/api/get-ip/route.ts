import { NextRequest, NextResponse } from 'next/server'
import dns from 'dns'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.nextUrl.toString())
    const domain = searchParams.get('domain')

    if (!domain) {
        return NextResponse.json({
            status: 'FAILED',
            message: 'Domain is required',
        })
    }

    try {
        const addresses = await dns.promises.resolve4(domain)

        return NextResponse.json({
            status: 'SUCCESS',
            ip: addresses?.[0],
        })
    } catch (error) {
        return NextResponse.json({
            status: 'FAILED',
            message: error,
        })
    }
}
