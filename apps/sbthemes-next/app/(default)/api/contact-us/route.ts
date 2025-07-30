import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

export async function POST(req: NextRequest) {
    const body = await req?.json()

    if (!body?.name) {
        return NextResponse.json({
            success: false,
            message: 'Name is required.',
        })
    } else if (!body?.email) {
        return NextResponse.json({
            success: false,
            message: 'Email is required.',
        })
    } else if (!body?.subject) {
        return NextResponse.json({
            success: false,
            message: 'Subject is required.',
        })
    } else if (!body?.message) {
        return NextResponse.json({
            success: false,
            message: 'Message is required.',
        })
    }

    try {
        const transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE?.toLowerCase() === 'true',
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        } as SMTPTransport.Options)

        const mailOptions = {
            from: process.env.MAIL_FROM,
            to: process.env.MAIL_TO && process.env.MAIL_TO.split(','),
            subject: 'Contact from the website',
            html: `<html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #ffffff;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
						margin: 0 auto;
                        padding: 20px;
                        background-color: #fff;
                    }
                    h1 {
                        color: #333;
                    }
                    p {
                        font-size: 16px;
                        line-height: 1.5;
                        color: #555;
                    }
                    table {
          				border-radius:8px;
                        width: 100%;
                        border-collapse: collapse;

                    }
                    th, td {
                        padding: 15px;
                        text-align: left;
                    }

                    .footer {
                        margin-top: 20px;
                        text-align: start;
                        color: #777;
                    }

                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Contact Form Submission</h1>
                    <p>Dear Admin,</p>
                    <p>A user has reached out to you through the website with the following information:</p>
                    <table>
                        <tr>
                            <th>Name</th>
                            <td>: ${body?.name}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>: ${body?.email}</td>
                        </tr>
                        <tr>
                            <th>Subject</th>
                            <td>: ${body?.subject}</td>
                        </tr>
                        <tr>
                            <th>Message</th>
                            <td class="message">:${body?.message}</td>
                        </tr>
                    </table>
                    <p class="footer">Best regards</p>
                </div>
            </body>
            </html>
        `,
        }

        if (!body?.recaptcha1 && !body?.recaptcha2)
            transport.sendMail(mailOptions)

        return NextResponse.json({ success: true })
    } catch (e) {
        return NextResponse.json({ success: false })
    }
}
