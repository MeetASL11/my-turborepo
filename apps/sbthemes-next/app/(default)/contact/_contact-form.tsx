'use client'

import { useState } from 'react'
import axios from 'axios'
import { CircleUserRound, Mail, Type } from 'lucide-react'

import IconSubject from '@/components/icons/icon-subject'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

type IForm = {
    name: string
    email: string
    subject: string
    message: string
    recaptcha1: string
    recaptcha2: string
}

const ContactForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState<IForm>({
        name: '',
        email: '',
        subject: '',
        message: '',
        recaptcha1: '',
        recaptcha2: '',
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (
            !formData?.email ||
            !formData?.name ||
            !formData?.subject ||
            !formData?.message
        ) {
            toast({
                title: 'Please fill out all required fields!',
                variant: 'error',
            })
            return
        }

        try {
            setIsLoading(true)

            const { data } = await axios.post('/api/contact-us', formData)

            console.log('response:', data)

            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                recaptcha1: '',
                recaptcha2: '',
            })

            setIsLoading(false)

            if (data?.success) {
                toast({
                    title: 'Message sent! Thank you!',
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
        <div className="w-full shrink-0 overflow-hidden rounded-xl bg-white shadow-3xl lg:w-96 xl:w-[490px]">
            <h3 className="border-b border-border bg-gray-100 px-4 py-3 font-semibold text-primary">
                Contact form
            </h3>
            <form onSubmit={handleSubmit} className="relative space-y-4 p-4">
                <Input
                    type="text"
                    className="hidden"
                    name="recaptcha1"
                    value={formData.recaptcha1}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    className="absolute left-[4000px]"
                    name="recaptcha2"
                    value={formData.recaptcha2}
                    onChange={handleChange}
                />

                <div className="!mt-0">
                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                        Name
                        <span className="text-secondary">*</span>
                    </label>
                    <div className="relative">
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="w-full pl-10"
                        />
                        <CircleUserRound className="absolute left-4 top-1/2 size-4 -translate-y-1/2" />
                    </div>
                </div>
                <div>
                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                        Email
                        <span className="text-secondary">*</span>
                    </label>
                    <div className="relative">
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email address"
                            className="w-full pl-10"
                        />
                        <Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2" />
                    </div>
                </div>
                <div>
                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                        Subject
                        <span className="text-secondary">*</span>
                    </label>
                    <div className="relative">
                        <Input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Subject"
                            className="w-full pl-10"
                        />
                        <IconSubject className="absolute left-4 top-1/2 size-4 -translate-y-1/2" />
                    </div>
                </div>
                <div>
                    <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                        Message
                        <span className="text-secondary">*</span>
                    </label>
                    <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Enter your message here..."
                        rows={4}
                        className="min-h-[92px] w-full"
                    />
                </div>
                <Button type="submit" loading={isLoading}>
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default ContactForm
