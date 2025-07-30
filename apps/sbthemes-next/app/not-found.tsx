import Image from 'next/image'
import Link from 'next/link'
import { House } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <div className="flex min-h-screen md:min-h-[calc(100vh-100px)] flex-col items-center justify-center gap-10 lg:gap-[50px] md:rounded-[40px] bg-gradient-to-r from-[#CACEFF]/10 to-gray-300/10 lg:flex-row md:m-[50px] p-10">
            <Image
                src="/images/404-icon.png"
                alt="404"
                width={340}
                height={340}
                className="h-auto w-32 sm:w-40 lg:w-[340px]"
            />
            <div className='max-w-[250px] w-full text-center lg:text-left'>
                <h2 className='text-primary text-3xl lg:text-[40px]/[50px] font-extrabold -tracking-wide mb-2.5'>Oops!</h2>
                <p className='lg:text-lg/[26px] font-medium mb-[30px]'>We couldn&apos;t find the page you were looking for</p>
                <Link href="/">
                    <Button type="button">
                        <House className="size-4 shrink-0" />
                        Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    )
}
