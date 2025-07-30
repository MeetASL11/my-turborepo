import { NextRequest, NextResponse } from 'next/server'
import tls, { DetailedPeerCertificate, TLSSocket } from 'tls'

function removeCircularReferences(obj: any) {
    const seen = new WeakSet()
    return JSON.stringify(obj, function (key, value) {
        if (value !== null && typeof value === 'object') {
            if (seen.has(value)) {
                return // Skip circular reference
            }
            seen.add(value)
        }
        return value
    })
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request?.nextUrl?.toString())
    const url = searchParams.get('url') || ''

    const domain =
        url.startsWith('http://') || url.startsWith('https://')
            ? new URL(url).hostname
            : url

    const options = {
        host: domain,
        port: 443,
        servername: domain,
        rejectUnauthorized: false,
        requestCert: true,
    }

    try {
        const certificateDetails: DetailedPeerCertificate = await new Promise(
            (resolve, reject) => {
                const socket: TLSSocket = tls.connect(
                    {
                        ...options,
                    },
                    () => {
                        const certificate = socket.getPeerCertificate(true)

                        socket.destroy()
                        resolve(certificate)
                    },
                )

                socket.on('error', (err) => {
                    reject(err)
                })
            },
        )

        const jsonString = removeCircularReferences(certificateDetails)

        return NextResponse.json({
            certificate: jsonString,
            domain: domain,
            port: 443,
        })
    } catch (error) {
        return NextResponse.json({
            error: error,
        })
    }
}
