import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { email } = await request.json()

    if (!email) {
        return NextResponse.json({
            status: 'error',
            message: 'Email is required',
        })
    }

    console.log(email)

    try {
        return NextResponse.json({
            status: 'success',
            url: '',
        })
    } catch (error) {
        return NextResponse.json({
            status: 'error',
            message: 'Something went wrong. Please try again later.',
            error: error,
        })
    }
}
