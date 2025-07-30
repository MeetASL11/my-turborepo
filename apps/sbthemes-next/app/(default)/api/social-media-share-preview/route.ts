import { NextRequest } from 'next/server'
import axios from 'axios'
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request?.nextUrl?.toString())
        const url = searchParams.get('url')
        if (!url) {
            return Response.json({
                success: false,
                message: 'url is required.',
                data: [],
            })
        }

        const response = await axios.get(url)
        const html = response.data

        return Response.json({
            success: true,
            message: 'success',
            data: html,
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: 'not a valid url.',
            data: [],
            error: error,
        })
    }
}
