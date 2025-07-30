'use client'

import React, { useState } from 'react'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import DatePicker from '@/components/ui/date-picker'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

const PrivacyPolicyGenerateForm = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        websiteURL: '',
        effectiveDate: '',
        personalData: '',
        dataCollectionMethods: '',
        dataPurpose: '',
        legalBasis: '',
        cookiesTech: '',
        thirdParties: '',
        dataRetention: '',
        internationalTransfer: '',
        securityMeasures: '',
        childrenPrivacy: '',
        userRights: '',
        dataBreach: '',
        optOut: '',
        policyChanges: '',
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

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const privacyPolicyHtml = `<p>Privacy Policy<br>Effective Date: ${formData.effectiveDate}</p>
<p>At ${formData.companyName}, accessible from ${formData.websiteURL}, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that are collected, how it is used, and the rights you have regarding your personal data.</p>
<h3 id="1-information-we-collect">1. Information We Collect</h3>
<p>We collect different types of personal data to provide and improve our services, including:</p>
<ul>
    <li><strong>Personal Identification Information</strong>: ${formData.personalData}(for example, name, email address, phone number, etc.)</li>
    <li><strong>Technical Information</strong>: IP address, browser type, device information, operating system, and referral source.</li>
    <li><strong>Usage Data</strong>: Pages visited, time spent on the website, navigation paths, and interaction details.</li>
    <li><strong>Location Data</strong>: Geographic location based on IP address or other location-tracking technologies.</li>
    <li><strong>Cookies and Tracking Data</strong>: Information collected through cookies and similar tracking technologies.</li>
</ul>
<p>This information is collected through ${formData.dataCollectionMethods}, such as forms on our website, cookies, analytics tools, and direct user input.</p>
<h3 id="2-how-we-use-your-information">2. How We Use Your Information</h3>
<p>We use the information we collect for the following purposes:</p>
<p>${formData.dataPurpose}</p>
<ul>
    <li>To operate and maintain our website.</li>
    <li>To improve the user experience and tailor our content.</li>
    <li>To provide customer service and support.</li>
    <li>To analyze how visitors use our site, enabling us to optimize its performance.</li>
    <li>To manage your account and provide requested services.</li>
    <li>To communicate with you via newsletters, promotions, or surveys (if consented).</li>
    <li>To comply with legal requirements and enforce our terms and conditions.</li>
</ul>
<h3 id="legal-basis-for-processing-gdpr-compliance-">Legal Basis for Processing (GDPR Compliance)</h3>
<p>If you are located in the European Economic Area (EEA), the legal basis for processing your data includes:</p>
<ul>
    <li><strong>Consent</strong>: When you have given your explicit consent.</li>
    <li><strong>Contractual Obligations</strong>: Processing necessary to fulfill a contract.</li>
    <li><strong>Legitimate Interests</strong>: Where processing is in our legitimate interests, such as improving our services.</li>
    <li><strong>Legal Obligations</strong>: Processing required to comply with legal obligations.</li>
</ul>
<p>Our legal basis for data processing specifically includes ${formData.legalBasis}.</p>
<h3 id="3-cookies-and-tracking-technologies">3. Cookies and Tracking Technologies</h3>
<p>We use cookies and similar tracking technologies to enhance your browsing experience, analyze usage, and provide targeted advertisements. The types of cookies we use include:</p>
<ul>
    <li><strong>Essential Cookies</strong>: Necessary for the website to function properly.</li>
    <li><strong>Analytical Cookies</strong>: To track usage and performance of the website.</li>
    <li><strong>Advertising Cookies</strong>: To deliver relevant ads based on your browsing habits.</li>
</ul>
<p>Our use of cookies and similar technologies is governed by ${formData.cookiesTech}. You can choose to disable cookies via your browser settings. However, this may limit some functionalities of our website.</p>
<h3 id="4-sharing-your-information">4. Sharing Your Information</h3>
<p>We do not sell or rent your personal data to third parties. However, we may share your information with:</p>
<ul>
    <li><strong>Service Providers</strong>: Such as cloud hosting services, payment processors, and analytics providers.</li>
    <li><strong>Third-Party Partners</strong>: For marketing and promotional purposes, with your consent.</li>
    <li><strong>Legal Authorities</strong>: If required by law or to protect our rights and comply with legal proceedings.</li>
    <li><strong>Business Transfers</strong>: In case of a merger, acquisition, or sale of our assets.</li>
</ul>
<p>The third-party service providers we work with include ${formData.thirdParties}, and they adhere to strict data protection requirements.</p>
<h3 id="5-data-retention">5. Data Retention</h3>
<p>We retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy, or as required by law. Specifically, we retain data for:</p>
<p>${formData.dataRetention}</p>
<p>Once your personal data is no longer required, we will securely delete or anonymize it.</p>
<h3 id="6-international-data-transfers">6. International Data Transfers</h3>
<p>We may transfer your personal data to, and process it in, countries other than the country in which you are resident. If data is transferred outside of the European Economic Area (EEA), we ensure appropriate safeguards are in place, such as:</p>
<ul>
    <li>Standard Contractual Clauses approved by the European Commission.</li>
    <li>Adequacy Decisions confirming that certain countries provide a sufficient level of data protection.</li>
</ul>
<p>Our international data transfer policies apply when ${formData.internationalTransfer} is involved.</p>
<h3 id="7-security-of-your-information">7. Security of Your Information</h3>
<p>We employ a variety of security measures to protect your personal data from unauthorized access, use, or disclosure. These measures include:</p>
<ul>
    <li><strong>Encryption</strong>: Data is encrypted both at rest and during transmission.</li>
    <li><strong>Access Control</strong>: Strict limitations on who can access personal data.</li>
    <li><strong>Regular Security Audits</strong>: Regular assessments to identify and fix vulnerabilities.</li>
</ul>
<p>Our security measures specifically include ${formData.securityMeasures}.</p>
<p>While we strive to protect your personal information, no method of transmission over the Internet or method of electronic storage is completely secure.</p>
<h3 id="8-children-s-privacy">8. Children&#39;s Privacy</h3>
<p>We do not knowingly collect personal data from children under the age of 13. If we discover that we have unintentionally collected personal data from a child under 13, we will promptly delete it. Parents and guardians may contact us to request the removal of their child’s data.</p>
<p>${formData.childrenPrivacy}</p>
<h3 id="9-your-data-protection-rights">9. Your Data Protection Rights</h3>
<p>If you are a resident of the EEA or California (under the CCPA), you have the following rights:</p>
<p>${formData.userRights}</p>
<ul>
    <li><strong>Access</strong>: You have the right to request copies of your personal data.</li>
    <li><strong>Rectification</strong>: You can request that we correct any inaccuracies in your personal data.</li>
    <li><strong>Erasure</strong>: You can request that we delete your personal data, subject to certain exceptions.</li>
    <li><strong>Restriction of Processing</strong>: You can request that we restrict the processing of your data under certain conditions.</li>
    <li><strong>Data Portability</strong>: You have the right to request that we transfer your data to another organization.</li>
    <li><strong>Object to Processing</strong>: You can object to the processing of your personal data, including for direct marketing purposes.</li>
</ul>
<p>To exercise any of these rights, please contact us at ${formData.contactInfo}.</p>
<h3 id="10-data-breach-procedures">10. Data Breach Procedures</h3>
<p>In the event of a data breach, we will:</p>
<ul>
    <li>Notify affected users as soon as possible.</li>
    <li>Report the breach to relevant authorities within 72 hours (if applicable).</li>
    <li>Take immediate action to mitigate any further unauthorized access or damage.</li>
</ul>
<p>Our data breach procedures are defined as ${formData.dataBreach}.</p>
<h3 id="11-opt-out-of-data-collection-and-marketing">11. Opt-Out of Data Collection and Marketing</h3>
<p>You can opt out of the following:</p>
<ul>
    <li><strong>Email Marketing</strong>: By clicking the unsubscribe link in any promotional emails.</li>
    <li><strong>Targeted Advertising</strong>: By managing your cookie preferences.</li>
    <li><strong>Data Collection</strong>: You may contact us to request the deletion of your data.</li>
</ul>
<p>You may opt out of the following processes: ${formData.optOut}.</p>
<h3 id="12-changes-to-this-privacy-policy">12. Changes to this Privacy Policy</h3>
<p>We may update this Privacy Policy from time to time. When we do, we will revise the &quot;Effective Date&quot; at the top of this page. If any material changes are made, we will notify you through ${formData.policyChanges}.</p>
<p>We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your personal data.</p>
<h3 id="13-contact-us">13. Contact Us</h3>
<p>If you have any questions or concerns about this Privacy Policy, or if you would like to exercise any of your data protection rights, please contact us at:</p>
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
                            {/* <Input
                                type="text"
                                value={formData.effectiveDate}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        effectiveDate: e.target.value,
                                    })
                                }
                                placeholder="Enter effective date"
                                className="w-full"
                                required
                            /> */}
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
                            What types of personal data do you collect from
                            users?
                        </label>
                        <Textarea
                            rows={4}
                            value={formData.personalData}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    personalData: e.target.value,
                                })
                            }
                            placeholder="Enter types of personal data"
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            How do you collect personal data (e.g., website
                            forms, cookies, analytics tools)?
                        </label>
                        <Textarea
                            rows={4}
                            value={formData.dataCollectionMethods}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    dataCollectionMethods: e.target.value,
                                })
                            }
                            placeholder="Example:  website forms, cookies, analytics tools."
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            What are the purposes of collecting personal data
                            (e.g., marketing, service improvement, customer
                            support)?
                        </label>
                        <Textarea
                            rows={4}
                            value={formData.dataPurpose}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    dataPurpose: e.target.value,
                                })
                            }
                            placeholder="Example:  marketing, service improvement, customer support."
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            What is the legal basis for processing personal data
                            (for GDPR compliance)?
                        </label>
                        <Textarea
                            rows={4}
                            value={formData.legalBasis}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    legalBasis: e.target.value,
                                })
                            }
                            placeholder="e.g., consent, contract necessity, legitimate interests, etc."
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            What types of cookies or tracking technologies do
                            you use?
                        </label>
                        <Textarea
                            rows={4}
                            value={formData.cookiesTech}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    cookiesTech: e.target.value,
                                })
                            }
                            placeholder="Enter types of cookies/tracking"
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Do you share personal data with third parties? If
                            yes, what types of third parties do you share data
                            with (e.g., service providers, marketing partners)?
                        </label>
                        <Textarea
                            rows={4}
                            value={formData.thirdParties}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    thirdParties: e.target.value,
                                })
                            }
                            placeholder="Enter question key for third-party services"
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            What is the retention period for user data?
                        </label>
                        <Textarea
                            rows={4}
                            value={formData.dataRetention}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    dataRetention: e.target.value,
                                })
                            }
                            placeholder="Enter retention period"
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Do you transfer personal data internationally? If
                            yes, to which countries?
                        </label>
                        <Textarea
                            rows={4}
                            value={formData.internationalTransfer}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    internationalTransfer: e.target.value,
                                })
                            }
                            placeholder="Your text here.."
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            What security measures do you use to protect
                            personal data (e.g., encryption, access control)?
                        </label>
                        <Textarea
                            rows={4}
                            value={formData.securityMeasures}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    securityMeasures: e.target.value,
                                })
                            }
                            placeholder="Example:  encryption, access control."
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            Do you collect personal data from children under 13
                            years old? If yes, what parental consent procedures
                            do you follow?
                        </label>
                        <Textarea
                            rows={4}
                            value={formData.childrenPrivacy}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    childrenPrivacy: e.target.value,
                                })
                            }
                            placeholder="Enter here question key for children's privacy compliance"
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            What user rights do you acknowledge (e.g., access,
                            deletion, correction of data)?
                        </label>
                        <Textarea
                            rows={4}
                            value={formData.userRights}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    userRights: e.target.value,
                                })
                            }
                            placeholder="Example:  access, deletion, correction of data."
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            What is your procedure in case of a data breach?
                        </label>
                        <Textarea
                            rows={4}
                            value={formData.dataBreach}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    dataBreach: e.target.value,
                                })
                            }
                            placeholder="Enter retention period"
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            How can users opt out of data collection or
                            marketing communications?
                        </label>
                        <Textarea
                            rows={4}
                            value={formData.optOut}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    optOut: e.target.value,
                                })
                            }
                            placeholder="Enter Opt-out options"
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            How will you notify users of changes to your privacy
                            policy (e.g., via email, website update)?
                        </label>
                        <Textarea
                            rows={4}
                            value={formData.policyChanges}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    policyChanges: e.target.value,
                                })
                            }
                            placeholder="e.g., email, website update"
                            className="min-h-16"
                        />
                    </div>
                    <div>
                        <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                            What is your contact information for privacy-related
                            inquiries?
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
                            placeholder="Enter contact info for privacy inquiries"
                            className="min-h-16"
                        />
                    </div>
                    <div className="text-center">
                        <Button
                            type="submit"
                            className="lg:min-w-80"
                            onClick={scrollToTemplates}
                        >
                            Generate Privacy Policy
                        </Button>
                    </div>
                </form>
            </div>
            <div
                className="py-14 sm:py-16 lg:py-[102px]"
                id="generated-privacy-section"
            >
                <div className="rounded-2xl border border-border bg-gray-100 p-4">
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-2 md:items-center">
                        <h2 className="text-xl font-semibold text-black">
                            Generated privacy policy:
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

export default PrivacyPolicyGenerateForm
