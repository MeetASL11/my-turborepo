'use client'
import React, { useState } from 'react'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ManageSubscription() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: any) => {
        setIsLoading(true)
        e.preventDefault()
        const { data } = await axios.post('/api/manage-subscription', {
            email,
        })
        console.log(data)
        setIsLoading(false)
    }

    return (
        <div className="bg-gray-100 pb-[30px] pt-24 sm:pt-28 lg:pt-36">
            <div className="container flex min-h-[400px] flex-col items-center justify-center gap-10">
                <h1 className="text-2xl font-bold">Manage Subscription</h1>
                <div className="flex w-full max-w-xl flex-col items-center gap-4 text-center">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        loading={isLoading}
                    >
                        Receive manege subscription link
                    </Button>
                </div>
            </div>
        </div>
    )
}
