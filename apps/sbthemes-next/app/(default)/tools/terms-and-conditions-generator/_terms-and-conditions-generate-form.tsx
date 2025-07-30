'use client'

import React, { useState } from 'react'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import DatePicker from '@/components/ui/date-picker'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

const TermsAndConditionsGenerateForm = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        websiteURL: '',
        effectiveDate: '',
        registrationRequired: '',
        limitLiability: '',
        governingLaw: '',
        courtLocation: '',
        privacyPolicyLink: '',
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
            'generated-terms-and-conditions-section',
        )

        // if (!isFormValid())
        window.scrollTo({
            top: templatesDiv?.offsetTop,
            behavior: 'smooth',
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const privacyPolicyHtml = `<p>Terms and Conditions<br>Effective Date: ${formData.effectiveDate}</p>
<p>Welcome to ${formData.companyName}! By accessing and using our website, located at ${formData.websiteURL}, you agree to comply with and be bound by the following terms and conditions of use. Please read these terms carefully.</p>
<h3>1. Acceptance of Terms</h3>
<p>By accessing our website, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree to these terms, you should not use our website.</p>
<h3>2. Changes to the Terms</h3>
<p>We reserve the right to modify or replace these terms at any time. Any changes will be effective immediately upon posting on the website. Your continued use of the website after such changes constitutes your acceptance of the new terms.</p>
<h3>3. User Accounts</h3>
<p>To access certain features of our website, you may be required to create an account. When creating an account, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account login credentials and for all activities that occur under your account.</p>
<ul>
    <li><strong>Account Registration</strong>: You must provide a valid email address and create a secure password.</li>
    <li><strong>Account Responsibility</strong>: You agree not to share your account credentials with anyone else.</li>
</ul>
<h3>4. Prohibited Activities</h3>
<p>When using our website, you agree not to:</p>
<ul>
    <li>Violate any applicable local, national, or international law or regulation.</li>
    <li>Infringe on any intellectual property rights or proprietary rights.</li>
    <li>Transmit any harmful or malicious code, viruses, or spam.</li>
    <li>Engage in unauthorized access to any part of the website.</li>
    <li>Misrepresent yourself or use another person’s information.</li>
</ul>
<h3>5. Intellectual Property</h3>
<p>All content on this website, including text, images, logos, and graphics, is the intellectual property of ${formData.companyName} or its licensors. You may not reproduce, distribute, or create derivative works from any part of the website without our express written permission.</p>
<h3>6. Limitation of Liability</h3>
<p>To the fullest extent permitted by law, ${formData.companyName} shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of your use or inability to use the website, even if we have been advised of the possibility of such damages.</p>
<h3>7. Disclaimer of Warranties</h3>
<p>Our website is provided on an "as-is" and "as-available" basis. We make no warranties, express or implied, regarding the operation of the website, its accuracy, or the completeness of the content.</p>
<ul>
    <li><strong>No Warranty</strong>: We do not guarantee that the website will be error-free or uninterrupted.</li>
    <li><strong>Third-Party Content</strong>: We do not assume responsibility for any third-party content available through the website.</li>
</ul>
<h3>8. Governing Law</h3>
<p>These terms are governed by and construed in accordance with the laws of ${formData.governingLaw} without regard to its conflict of law principles. You agree to submit to the personal jurisdiction of the courts located in ${formData.courtLocation}.</p>
<h3>9. Termination of Use</h3>
<p> We reserve the right to terminate or suspend your access to the website, without notice, for conduct that we believe violates these terms or is otherwise harmful to our website or users.</p>
<h3>10. Indemnification</h3>
<p>You agree to indemnify, defend, and hold harmless ${formData.companyName}, its affiliates, officers, directors, employees, and agents from any claims, damages, losses, liabilities, or expenses arising out of your use of the website or violation of these terms.</p>
<h3>11. Privacy Policy</h3>
<p>Your use of our website is also subject to our ${formData.privacyPolicyLink}. Please review the Privacy Policy to understand how we collect, use, and safeguard your personal information.</p>
<h3>12. Contact Information</h3>
<p>If you have any questions or concerns about these terms, you can contact us at:</p>
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
                        <div>
                            <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                Effective date{' '}
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
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Do users need to register for an account to use
                            certain features of your website (Yes/No)?
                        </label>
                        <RadioGroup
                            className="py-2 text-sm"
                            value={formData.registrationRequired}
                            onValueChange={(value) =>
                                setFormData({
                                    ...formData,
                                    registrationRequired: value,
                                })
                            }
                        >
                            <label className="inline-flex items-center gap-3">
                                <RadioGroupItem value="Yes" />
                                Yes
                            </label>
                            <label className="inline-flex items-center gap-3">
                                <RadioGroupItem value="No" />
                                No
                            </label>
                        </RadioGroup>
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            What activities do you want to prohibit on your
                            website (e.g., illegal activities, misuse of
                            intellectual property)?
                        </label>
                        <Textarea
                            rows={4}
                            placeholder="Example: illegal activities, misuse of intellectual property."
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Do you offer any warranties for the website (e.g.,
                            &quot;as-is&quot; without warranties)?
                        </label>
                        <Textarea
                            rows={4}
                            placeholder="Example:  'as-is' without warranties."
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            What jurisdiction governs the terms and any legal
                            disputes?
                        </label>
                        <Textarea
                            rows={4}
                            value={formData.governingLaw}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    governingLaw: e.target.value,
                                })
                            }
                            placeholder="Enter jurisdiction location"
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Where will legal disputes be handled (jurisdiction
                            location)?
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
                            placeholder="Enter jurisdiction location"
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Do you want to limit your liability in case of
                            damages caused by using your website (Yes/No)?
                        </label>
                        <RadioGroup
                            className="py-2 text-sm"
                            value={formData.limitLiability}
                            onValueChange={(value) =>
                                setFormData({
                                    ...formData,
                                    limitLiability: value,
                                })
                            }
                        >
                            <label className="inline-flex items-center gap-3">
                                <RadioGroupItem value="Yes" />
                                Yes
                            </label>
                            <label className="inline-flex items-center gap-3">
                                <RadioGroupItem value="No" />
                               No
                            </label>
                        </RadioGroup>
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            How will changes to the terms be communicated (e.g.,
                            by updating the website)?
                        </label>
                        <Textarea
                            rows={4}
                            placeholder="Example:  by updating the website."
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            How will you handle the termination or suspension of
                            user accounts?
                        </label>
                        <Textarea
                            rows={4}
                            placeholder="Enter account termination process"
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            What is your contact information for users to
                            address inquiries or concerns?
                        </label>
                        <Textarea
                            rows={4}
                            value={formData.contactInfo}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    contactInfo: e.target.value,
                                })
                            }
                            placeholder="Enter contact info for inquiries"
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Do you want to include an indemnification clause
                            where users must indemnify the company for certain
                            actions?
                        </label>
                        <Textarea
                            rows={4}
                            placeholder="Enter text here.."
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Do you have a link to your Privacy Policy?
                        </label>
                        <Textarea
                            rows={4}
                            value={formData.privacyPolicyLink}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    privacyPolicyLink: e.target.value,
                                })
                            }
                            placeholder="Enter link to Privacy Policy"
                            className="min-h-16"
                        />
                    </div>

                    <div className="text-center">
                        <Button
                            type="submit"
                            className="lg:min-w-80"
                            onClick={scrollToTemplates}
                        >
                            Generate Terms and Conditions
                        </Button>
                    </div>
                </form>
            </div>
            <div
                className="py-14 sm:py-16 lg:py-[102px]"
                id="generated-terms-and-conditions-section"
            >
                <div className="rounded-2xl border border-border bg-gray-100 p-4">
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-2 md:items-center">
                        <h2 className="inline-block bg-gradient-to-r from-primary to-gray bg-clip-text text-lg font-semibold tracking-tight text-transparent lg:text-xl/9">
                            Generated Terms and Conditions:
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

export default TermsAndConditionsGenerateForm
