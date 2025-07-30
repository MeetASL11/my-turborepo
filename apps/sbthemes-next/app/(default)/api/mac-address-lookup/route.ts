import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

const BASE_URL = 'https://api.maclookup.app/v2/macs'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request?.nextUrl?.toString())
    const macAddress = searchParams.get('macAddress') || ''

    try {
        const { data } = await axios.get(`${BASE_URL}/${macAddress}`)
        return Response.json({
            data: data,
        })
    } catch (error) {
        return Response.json({
            error: error,
        })
    }
}
