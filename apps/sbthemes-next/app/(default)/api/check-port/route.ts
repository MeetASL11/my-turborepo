import { NextRequest, NextResponse } from 'next/server'
import net from 'net'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request?.nextUrl?.toString())
    const ip = searchParams.get('ip') || ''
    const port = searchParams.get('port')

    try {
        const isPortOpen = await checkPort(ip, Number(port))
        return NextResponse.json({
            status: 'SUCCESS',
            ip,
            port,
            isPortOpen,
        })
    } catch (error) {
        return NextResponse.json({
            status: 'FAILED',
            error: error,
        })
    }
}

const checkPort = (ip: string, port: number) => {
    return new Promise((resolve) => {
        const socket = new net.Socket()

        socket.setTimeout(3000) // Set a timeout of 3 seconds
        socket
            .connect(port, ip, () => {
                socket.destroy()
                resolve(true) // Port is open
            })
            .on('error', () => {
                socket.destroy()
                resolve(false) // Port is closed
            })
            .on('timeout', () => {
                socket.destroy()
                resolve(false) // Connection timed out
            })
    })
}
