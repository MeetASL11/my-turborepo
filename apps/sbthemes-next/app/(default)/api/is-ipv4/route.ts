import { NextRequest, NextResponse } from 'next/server'
import net from 'net'

export function GET(request: NextRequest) {
    const { searchParams } = new URL(request?.nextUrl?.toString())
    const ip = searchParams.get('ip') || ''

    // Check if IP is IPv4
    const isIPv4 = net.isIPv4(ip)
    return new NextResponse(
        JSON.stringify({
            isIPv4: isIPv4,
        }),
    )
}
