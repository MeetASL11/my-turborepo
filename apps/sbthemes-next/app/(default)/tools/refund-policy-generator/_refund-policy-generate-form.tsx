'use client'

import { useState } from 'react'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import DatePicker from '@/components/ui/date-picker'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

const RefundPolicyGenerateForm = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        effectiveDate: '',
        refundRequestPeriod: '',
        refundRequestProcess: '',
        processingTime: '',
        courtLocation: '',
        privacyPolicyLink: '',
        contactInfo: '',
    })
    const [html, setHtml] = useState('')
    const [isPreview, setIsPreview] = useState(true)

    const isFormValid = () => {
        return (
            formData.companyName &&
            formData.effectiveDate &&
            formData.refundRequestPeriod
        )
    }

    const scrollToTemplates = () => {
        if (!isFormValid()) return
        const templatesDiv = document.getElementById('generated-refund-section')

            window.scrollTo({
                top: templatesDiv?.offsetTop,
                behavior: 'smooth',
            })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const privacyPolicyHtml = `
<p>Refund Policy<br>Effective Date: ${formData.effectiveDate}</p>
<p>At ${formData.companyName}, we strive to ensure that our customers are satisfied with their purchases. However, if you are not entirely satisfied with your order, our refund policy outlines the terms under which you may request a refund.</p>
<h3>1. Eligibility for Refunds</h3>
<p>To be eligible for a refund, you must meet the following criteria:</p>
<ul>
    <li>The item must be unused, in its original packaging, and in the same condition that you received it.</li>
    <li>The refund request must be made within ${formData.refundRequestPeriod} of receiving your order.</li>
    <li>Proof of purchase is required (e.g., receipt or order confirmation).</li>
</ul>
<h3>2. Non-Refundable Items</h3>
<p>Certain items are non-refundable, including:</p>
<ul>
    <li>Gift cards</li>
    <li>Downloadable software products</li>
    <li>Items marked as final sale</li>
    <li>If an item is non-refundable, it will be clearly indicated at the time of purchase.</li>
</ul>
<h3>3. Refund Process</h3>
<p>To initiate a refund, please follow these steps:</p>
<ul>
    <li>Contact our customer service team at ${formData.contactInfo} with your order details.</li>
    <li>Provide a description of the issue and any relevant proof of purchase.</li>
    <li>Our team will review your request and notify you of the outcome.</li>
</ul>
<h3>4. Refund Method</h3>
<p>If your refund is approved, it will be processed and automatically applied to your original payment method within ${formData.processingTime}. Please note that the time it takes for the refund to appear in your account may vary depending on your payment provider.</p>
<h3>5. Shipping Costs</h3>
<p>Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
<h3>6. Exchanges</h3>
<p>If you wish to exchange an item for a different one, please contact our customer service team. Depending on availability, we will guide you through the exchange process.</p>
<h3>7. Changes to This Refund Policy</h3>
<p>We reserve the right to update this refund policy at any time. Any changes will be effective immediately upon posting on our website. Your continued use of our services after changes are made constitutes your acceptance of the new policy.</p>
<h3>8. Contact Us</h3>
<p>If you have any questions about our refund policy, please contact us at:</p>
<p>${formData.contactInfo}</p>
<p>Privacy Policy: ${formData.privacyPolicyLink}</p>`

        setHtml(privacyPolicyHtml)
    }

    const copyToClipboard = () => {
        if (isPreview) {
            const plainText = document.createElement('div')
            plainText.innerHTML = html

            toast({
                title: 'Copied preview to clipboard!',
                variant: 'success',
            })

            navigator.clipboard.writeText(plainText.innerText)
        } else {
            toast({
                title: 'Copied HTML to clipboard!',
                variant: 'success',
            })

            navigator.clipboard.writeText(html)
        }
    }
    return (
        <div className="container my-10 items-start lg:my-14 xl:max-w-7xl">
            <div className="rounded-2xl border border-border bg-gray-100 p-4 lg:p-8 xl:col-span-2">
                <form
                    className="space-y-3.5 lg:space-y-5"
                    onSubmit={handleSubmit}
                >
                    <div className="grid gap-3.5 lg:grid-cols-3 lg:gap-5">
                        <div>
                            <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                Company&apos;s name{' '}
                                <span className="text-secondary">*</span>
                            </label>
                            <Input
                                type="text"
                                value={formData.companyName}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        companyName: e.target.value,
                                    })
                                }
                                placeholder="Enter company name"
                                className="w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                What is your effective date for this refund
                                policy?
                                <span className="text-secondary">*</span>
                            </label>

                            <DatePicker
                                triggerInputProps={{
                                    placeholder: 'Enter effective date',
                                    className: 'w-full',
                                    required: true,
                                }}
                                placeholder="End Date"
                                value={formData.effectiveDate}
                                onChange={(date) => {
                                    setFormData({
                                        ...formData,
                                        effectiveDate: format(
                                            new Date(date as string),
                                            'dd LLL yyyy',
                                        ),
                                    })
                                }}
                            />
                        </div>
                        <div>
                            <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                What is the refund request period (e.g., 30
                                days)?
                                <span className="text-secondary">*</span>
                            </label>
                            <Input
                                type="text"
                                placeholder="Enter refund request period"
                                value={formData.refundRequestPeriod}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        refundRequestPeriod: e.target.value,
                                    })
                                }
                                className="w-full"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            What items are considered non-refundable?
                        </label>
                        <Textarea
                            rows={4}
                            placeholder="Enter the items that are considered non-refundable."
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            What is the process for requesting a refund?
                        </label>
                        <Textarea
                            rows={4}
                            placeholder="Enter refund request process"
                            value={formData.refundRequestProcess}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    refundRequestProcess: e.target.value,
                                })
                            }
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            What is the customer service contact information for
                            refund inquiries?
                        </label>
                        <Textarea
                            rows={4}
                            placeholder="Refund inquiries contact info"
                            value={formData.contactInfo}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    contactInfo: e.target.value,
                                })
                            }
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            What is the processing time for refunds (e.g., 7-10
                            business days)?
                        </label>
                        <Textarea
                            rows={4}
                            placeholder="Enter refund processing time"
                            value={formData.processingTime}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    processingTime: e.target.value,
                                })
                            }
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Are shipping costs refundable?
                        </label>
                        <Textarea
                            rows={4}
                            value={formData.courtLocation}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    courtLocation: e.target.value,
                                })
                            }
                            placeholder="Enter text here.."
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            How should exchanges be handled?
                        </label>
                        <Textarea
                            rows={4}
                            placeholder="Enter exchange process"
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            How will users be notified of changes to the refund
                            policy?
                        </label>
                        <Textarea
                            rows={4}
                            placeholder="Enter the notification of refund policy changes"
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            What is the contact information for customers with
                            questions about the refund policy?
                        </label>
                        <Textarea
                            rows={4}
                            placeholder="Enter Contact info for refund inquiries"
                            className="min-h-16"
                        />
                    </div>

                    <div className="text-center">
                        <Button
                            type="submit"
                            className="lg:min-w-80"
                            onClick={scrollToTemplates}
                        >
                            Generate Refund Policy
                        </Button>
                    </div>
                </form>
            </div>
            <div
                className="py-14 sm:py-16 lg:py-[102px]"
                id="generated-refund-section"
            >
                <div className="rounded-2xl border border-border bg-gray-100 p-4">
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-2 md:items-center">
                        <h2 className="text-xl font-semibold text-black">
                            Generated Refund policy:
                        </h2>
                        <Button
                            type="button"
                            className="px-1.5 py-1.5 text-xs md:p-2.5 md:text-sm/5"
                            onClick={copyToClipboard}
                            disabled={!html}
                        >
                            Copy
                            <span className="sr-only">Code copy</span>
                        </Button>
                    </div>
                    {html && (
                        <div className="-mb-px flex items-center justify-center">
                            <button
                                type="button"
                                className={cn(
                                    'grid place-content-center rounded-t-xl border-x border-t border-transparent bg-transparent px-4 py-1.5 text-lg font-semibold leading-5 md:min-w-16 md:py-2.5 md:leading-6',
                                    {
                                        'border-border bg-white': isPreview,
                                    },
                                )}
                                onClick={() => setIsPreview(true)}
                            >
                                Preview
                            </button>
                            <button
                                type="button"
                                className={cn(
                                    'grid place-content-center rounded-t-xl border-x border-t border-transparent bg-transparent px-4 py-1.5 text-lg font-semibold leading-5 md:min-w-16 md:py-2.5 md:leading-6',
                                    {
                                        'border-border bg-white': !isPreview,
                                    },
                                )}
                                onClick={() => setIsPreview(false)}
                            >
                                HTML
                            </button>
                        </div>
                    )}
                    <div className="min-h-[400px] overflow-x-auto rounded-xl border border-border bg-white p-4">
                        {isPreview ? (
                            <div
                                className="prose max-w-full"
                                dangerouslySetInnerHTML={{ __html: html }}
                            />
                        ) : (
                            <div>
                                <pre>{html}</pre>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RefundPolicyGenerateForm
