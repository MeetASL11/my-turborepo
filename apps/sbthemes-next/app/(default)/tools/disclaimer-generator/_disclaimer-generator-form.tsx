'use client'

import React, { useState } from 'react'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import DatePicker from '@/components/ui/date-picker'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

const DisclaimerGenerateForm = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        websiteURL: '',
        effectiveDate: '',
        contactInfo: '',
    })
    const [html, setHtml] = useState('')
    const [isPreview, setIsPreview] = useState(true)

    const isFormValid = () => {
        return (
            formData.companyName &&
            formData.websiteURL &&
            formData.effectiveDate
        )
    }

    const scrollToTemplates = () => {
        if (!isFormValid()) return
        const templatesDiv = document.getElementById(
            'generated-privacy-section',
        )

        window.scrollTo({
            top: templatesDiv?.offsetTop,
            behavior: 'smooth',
        })
    }

    const handleSubmit = () => {
        const privacyPolicyHtml = `<p>Disclaimer<br>Effective Date: ${formData.effectiveDate}</p>
<p>The information provided by ${formData.companyName} on our website, located at ${formData.websiteURL}, is for general informational purposes only. All information on the site is provided in good faith, and while we strive to keep the information up to date and accurate, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information on the website.</p>
<h3>1. No Professional Advice</h3>
<p>The content on this website is not intended to be a substitute for professional advice, including legal, financial, or medical advice. You should consult with a qualified professional for any specific issues or concerns you may have.</p>
<h3>2. External Links</h3>
<p>Our website may contain links to third-party websites that are not controlled or maintained by ${formData.companyName} [place here placeholder for company name]. We do not endorse or assume any responsibility for the content, privacy policies, or practices of any third-party sites. Your use of these links is at your own risk.</p>
<h3>3. Limitation of Liability</h3>
<p>In no event shall ${formData.companyName}, its officers, directors, employees, or agents be liable for any loss, injury, claim, liability, or damage of any kind arising out of or in connection with your use of the website or reliance on any information provided on the website.</p>
<h3>4. No Endorsement</h3>
<p>The views and opinions expressed on the website are those of the authors and do not necessarily reflect the official policy or position of ${formData.companyName}. Any content provided by our authors or contributors is of their opinion and is not intended to malign any religion, ethnic group, club, organization, company, individual, or anyone or anything.</p>
<h3>5. Changes to This Disclaimer</h3>
<p>We reserve the right to update this disclaimer at any time. Any changes will be effective immediately upon posting on our website. Your continued use of the website after changes are made constitutes your acceptance of the new disclaimer.</p>
<h3>6. Contact Us</h3>
<p>If you have any questions about this disclaimer, please contact us at:</p>
<p>${formData.contactInfo}</p>`
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
        <div className="container my-5 lg:my-14 xl:max-w-7xl">
            <div className="rounded-2xl border border-border bg-gray-100 p-4 lg:p-8 xl:col-span-2">
                <form
                    className="space-y-3.5 lg:space-y-5"
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit()
                    }}
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
                                What is the effective date for this disclaimer?
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
                                Website URL{' '}
                                <span className="text-secondary">*</span>
                            </label>
                            <Input
                                type="text"
                                value={formData.websiteURL}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        websiteURL: e.target.value,
                                    })
                                }
                                placeholder="Enter website URL"
                                className="w-full"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Do you provide professional advice, or is your
                            content for informational purposes only?
                        </label>
                        <Textarea
                            rows={4}
                            placeholder="Enter content advisory status"
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Do you link to any external websites? If so, how do
                            you want to handle those links?
                        </label>
                        <Textarea
                            rows={4}
                            placeholder="Enter text here.."
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            What limitations of liability do you want to
                            include?
                        </label>
                        <Textarea
                            rows={4}
                            placeholder="Enter limitations of liability"
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            How will you communicate the views expressed on your
                            site (e.g., opinions of authors)?
                        </label>
                        <Textarea
                            rows={4}
                            placeholder="Enter communication of site views"
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            How will changes to the disclaimer be communicated?
                        </label>
                        <Textarea
                            rows={4}
                            placeholder="Enter communicating disclaimer changes"
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            What is the contact information for questions about
                            the disclaimer?
                        </label>
                        <Textarea
                            rows={4}
                            placeholder="Enter contact info for disclaimer questions"
                            className="min-h-16"
                        />
                    </div>

                    <div className="text-center">
                        <Button
                            type="submit"
                            className="lg:min-w-80"
                            onClick={scrollToTemplates}
                        >
                            Generate Disclaimer
                        </Button>
                    </div>
                </form>
            </div>
            <div
                className="py-14 sm:py-14 lg:py-[102px]"
                id="generated-privacy-section"
            >
                <div className="rounded-2xl border border-border bg-gray-100 p-4">
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-2 md:items-center">
                        <h2 className="text-xl font-semibold text-black">
                            Generated Disclaimer:
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

export default DisclaimerGenerateForm
