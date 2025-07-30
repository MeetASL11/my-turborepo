'use client'
import { useState } from 'react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

export default function Newsletter() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setEmail(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email) {
            toast({
                title: 'Email is required!',
                variant: 'error',
            })
            return
        }

        try {
            setIsLoading(true)
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL}`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        text: JSON.stringify(
                            {
                                Source: 'sbthemes.com',
                                Type: 'Newsletter',
                                Email: email,
                            },
                            null,
                            4,
                        ),
                    }),
                },
            )

            setEmail('')
            setIsLoading(false)

            if (response.ok) {
                toast({
                    title: 'Subscribed! Thank you!',
                    variant: 'success',
                })
            } else {
                toast({
                    title: 'Something went wrong. Please try again later.',
                    variant: 'error',
                })
            }
        } catch (error) {
            setIsLoading(false)
        }
    }

    return (
        <div className="container">
            <div className="relative overflow-hidden rounded-xl bg-gray-100 px-3 py-8 sm:py-12 md:px-5 lg:py-20 xl:px-[100px]">
                <Image
                    src="/images/newsletter-shape.jpg"
                    width={285}
                    height={190}
                    className="absolute bottom-0 right-0 hidden h-auto w-40 md:block xl:w-[285px]"
                    alt="Shape"
                />
                <div className="relative flex flex-wrap justify-center gap-3 overflow-hidden pb-10 sm:gap-3 lg:-mx-3.5 lg:-my-5 lg:flex-nowrap lg:justify-between lg:!px-3.5 lg:!py-5 lg:pb-0">
                    <div className="grid size-14 shrink-0 place-content-center rounded-[20px] border-2 border-white bg-gray-100 shadow-[0_10px_20px_0_rgba(68,68,68,0.06)] lg:mt-[100px] lg:-rotate-[5deg] xl:size-[70px]">
                        <Image
                            src="/images/nodejs.svg"
                            alt="Nodejs"
                            width={42}
                            height={42}
                            className="size-8 xl:size-[42px]"
                        />
                    </div>
                    <div className="grid size-14 shrink-0 place-content-center rounded-[20px] border-2 border-white bg-gray-100 shadow-[0_10px_20px_0_rgba(68,68,68,0.06)] lg:mt-20 lg:-rotate-[3deg] xl:size-[70px]">
                        <Image
                            src="/images/js.svg"
                            alt="js"
                            width={42}
                            height={42}
                            className="size-8 xl:size-[42px]"
                        />
                    </div>
                    <div className="grid size-14 shrink-0 place-content-center rounded-[20px] border-2 border-white bg-gray-100 shadow-[0_10px_20px_0_rgba(68,68,68,0.06)] lg:mt-[60px] lg:-rotate-3 xl:size-[70px]">
                        <Image
                            src="/images/wordpress.svg"
                            alt="wordpress"
                            width={42}
                            height={42}
                            className="size-8 xl:size-[42px]"
                        />
                    </div>
                    <div className="grid size-14 shrink-0 place-content-center rounded-[20px] border-2 border-white bg-gray-100 shadow-[0_10px_20px_0_rgba(68,68,68,0.06)] lg:mt-10 lg:-rotate-2 xl:size-[70px]">
                        <Image
                            src="/images/tailwind.svg"
                            alt="tailwind"
                            width={42}
                            height={42}
                            className="size-8 xl:size-[42px]"
                        />
                    </div>
                    <div className="grid size-14 shrink-0 place-content-center rounded-[20px] border-2 border-white bg-gray-100 shadow-[0_10px_20px_0_rgba(68,68,68,0.06)] lg:mt-5 lg:-rotate-1 xl:size-[70px]">
                        <Image
                            src="/images/figma2.svg"
                            alt="figma"
                            width={42}
                            height={42}
                            className="h-auto w-[33px]"
                        />
                    </div>
                    <div className="grid size-14 shrink-0 place-content-center rounded-[20px] border-2 border-white bg-gray-100 shadow-[0_10px_20px_0_rgba(68,68,68,0.06)] xl:size-[70px]">
                        <Image
                            src="/images/bootstrap.svg"
                            alt="bootstrap"
                            width={42}
                            height={42}
                            className="size-8 xl:size-[42px]"
                        />
                    </div>
                    <div className="grid size-14 shrink-0 place-content-center rounded-[20px] border-2 border-white bg-gray-100 shadow-[0_10px_20px_0_rgba(68,68,68,0.06)] xl:size-[70px]">
                        <Image
                            src="/images/html.svg"
                            alt="html"
                            width={42}
                            height={42}
                            className="size-8 xl:size-[42px]"
                        />
                    </div>
                    <div className="grid size-14 shrink-0 place-content-center rounded-[20px] border-2 border-white bg-gray-100 shadow-[0_10px_20px_0_rgba(68,68,68,0.06)] lg:mt-5 lg:rotate-1 xl:size-[70px]">
                        <Image
                            src="/images/nuxt.svg"
                            alt="nuxt"
                            width={42}
                            height={42}
                            className="h-auto w-[32px]"
                        />
                    </div>
                    <div className="grid size-14 shrink-0 place-content-center rounded-[20px] border-2 border-white bg-gray-100 shadow-[0_10px_20px_0_rgba(68,68,68,0.06)] lg:mt-10 lg:rotate-2 xl:size-[70px]">
                        <Image
                            src="/images/angular2.svg"
                            alt="angular"
                            width={42}
                            height={42}
                            className="h-auto w-[31px]"
                        />
                    </div>
                    <div className="grid size-14 shrink-0 place-content-center rounded-[20px] border-2 border-white bg-gray-100 shadow-[0_10px_20px_0_rgba(68,68,68,0.06)] lg:mt-[60px] lg:rotate-3 xl:size-[70px]">
                        <Image
                            src="/images/react.svg"
                            alt="react"
                            width={42}
                            height={42}
                            className="size-8 xl:size-[42px]"
                        />
                    </div>
                    <div className="grid size-14 shrink-0 place-content-center rounded-[20px] border-2 border-white bg-gray-100 shadow-[0_10px_20px_0_rgba(68,68,68,0.06)] lg:mt-20 lg:rotate-[3deg] xl:size-[70px]">
                        <Image
                            src="/images/vuejs.svg"
                            alt="vuejs"
                            width={42}
                            height={42}
                            className="h-auto w-[33px]"
                        />
                    </div>
                    <div className="grid size-14 shrink-0 place-content-center rounded-[20px] border-2 border-white bg-gray-100 shadow-[0_10px_20px_0_rgba(68,68,68,0.06)] lg:mt-[100px] lg:rotate-[5deg] xl:size-[70px]">
                        <Image
                            src="/images/nextjs.svg"
                            alt="nextjs"
                            width={42}
                            height={42}
                            className="h-auto w-[33px]"
                        />
                    </div>
                </div>
                <div className="relative mx-auto w-full max-w-[567px] text-center md:-mt-2">
                    <h2 className="mb-4 inline-block bg-gradient-to-r from-primary to-gray bg-clip-text text-xl font-bold tracking-tight text-transparent lg:text-3xl/9">
                        Stay updated with our weekly newsletter
                    </h2>
                    <div className="mx-auto mb-[30px] text-sm/5 font-medium lg:text-base/[26px]">
                        <p>
                            No Spam. Only high quality content and updates of
                            our products.
                        </p>
                        <p>Join 20,000+ other creators in our community</p>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="mx-auto flex w-full max-w-[399px] gap-2.5"
                    >
                        <Input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full"
                        />
                        <Button
                            type="submit"
                            size={'small'}
                            loading={isLoading}
                            className="px-5"
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
