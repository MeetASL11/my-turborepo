'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

type IPreview = {
    url: string
    sitemapPlainText: string
    testUrl: string
    validationResult: {
        XMLDeclaration: {
            result: boolean
            error: string
        }
        FileEncoding: {
            result: boolean
            error: string
        }
        XMLStructure: {
            result: boolean
            error: string
        }
        RequiredTags: {
            result: boolean
            error: string
        }
        ContentFormatting: {
            result: boolean
            error: string
        }
        BasicGuidelines: {
            result: boolean
            error: string
        }
    }
    pages: {
        url: string
        lastmod: string
    }[]
}

type IForm = {
    url: string
}

const SitemapValidator = () => {
    const [preview, setPreview] = useState<IPreview | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const urlRegex =
        /^(https?:\/\/[^\s/$.?#].[^\s]*(\/(sitemap(_index)?\.xml|sitemap\/.*\.xml)(\?.*)?))$/

    const validateSitemapUrl = (value: string) => {
        if (!urlRegex.test(value)) {
            return 'URL must point to a valid sitemap'
        }
        return true
    }

    const {
        register,
        control,
        reset,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>({
        defaultValues: {
            url: '',
        },
    })

    const validateSitemap = (sitemapPlainText: string) => {
        let validationResult = {
            XMLDeclaration: {
                result: false,
                error: '',
            },
            FileEncoding: {
                result: false,
                error: '',
            },
            XMLStructure: {
                result: false,
                error: '',
            },
            RequiredTags: {
                result: false,
                error: '',
            },
            ContentFormatting: {
                result: true, // Default to true, will update if any formatting issue is found
                error: '',
            },
            BasicGuidelines: {
                result: true, // Default to true, will update if any guideline issue is found
                error: '',
            },
        }

        try {
            // 1. Check for XML Declaration
            const xmlDeclarationMatch = sitemapPlainText.match(
                /^<\?xml\s+version="1.0"\s+encoding="([A-Za-z0-9-]+)"\?>/,
            )
            if (xmlDeclarationMatch) {
                validationResult.XMLDeclaration.result = true

                // 2. Check if the encoding is UTF-8 or something valid
                const encoding = xmlDeclarationMatch[1]
                if (encoding.toLowerCase() === 'utf-8') {
                    validationResult.FileEncoding.result = true
                } else {
                    validationResult.FileEncoding.error = `Invalid encoding: ${encoding}. Expected UTF-8.`
                }
            } else {
                validationResult.XMLDeclaration.error =
                    'Missing or malformed XML declaration.'
            }

            // 3. Parse the XML to check structure
            const parser = new DOMParser()
            const xmlDoc = parser.parseFromString(sitemapPlainText, 'text/xml')

            const parseError = xmlDoc.querySelector('parsererror')
            if (!parseError) {
                validationResult.XMLStructure.result = true

                // 4. Check for Required Tags
                const hasUrlset =
                    xmlDoc.getElementsByTagName('urlset').length > 0
                const hasSitemapindex =
                    xmlDoc.getElementsByTagName('sitemapindex').length > 0
                if (hasUrlset || hasSitemapindex) {
                    validationResult.RequiredTags.result = true
                } else {
                    validationResult.RequiredTags.error =
                        'Missing required <urlset> or <sitemapindex> tag.'
                }

                // 5. Content Formatting Checks
                const urlTags = xmlDoc.getElementsByTagName('url')
                for (let i = 0; i < urlTags.length; i++) {
                    const locTag = urlTags[i].getElementsByTagName('loc')[0]
                    if (!locTag || !locTag.textContent?.trim()) {
                        validationResult.ContentFormatting.result = false
                        validationResult.ContentFormatting.error =
                            'Empty or malformed <loc> tag found.'
                        break
                    }
                }

                // 6. Basic Guidelines Check (Sitemap Guidelines)
                // - No more than 50,000 URLs per sitemap
                // - No URL exceeds 2,048 characters
                if (urlTags.length > 50000) {
                    validationResult.BasicGuidelines.result = false
                    validationResult.BasicGuidelines.error =
                        'Sitemap exceeds the maximum of 50,000 URLs.'
                }
                for (let i = 0; i < urlTags.length; i++) {
                    const locTag = urlTags[i].getElementsByTagName('loc')[0]
                    if (
                        locTag &&
                        locTag.textContent &&
                        locTag.textContent.length > 2048
                    ) {
                        validationResult.BasicGuidelines.result = false
                        validationResult.BasicGuidelines.error =
                            'A URL exceeds the maximum length of 2,048 characters.'
                        break
                    }
                }
            } else {
                validationResult.XMLStructure.error =
                    'Invalid XML structure or parsing error.'
            }
        } catch (error) {
            console.error('Error while validating the sitemap:', error)
            // Set error message in case of unexpected exceptions
            validationResult.XMLStructure.error =
                'An unexpected error occurred during validation.'
        }

        return validationResult
    }

    const getSitemapPages = (sitemapPlainText: string) => {
        // Create a parser for the XML
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(sitemapPlainText, 'text/xml')

        const pages: {
            url: string
            lastmod: string
        }[] = []

        // Check if the XML parsing was successful
        if (xmlDoc.getElementsByTagName('parsererror').length) {
            throw new Error('Error parsing XML')
        }

        // Get all sitemap entries
        const sitemapEntries = Array.from(
            xmlDoc.getElementsByTagName('sitemap'),
        )

        sitemapEntries.forEach((sitemapEntry) => {
            const url =
                sitemapEntry.getElementsByTagName('loc')[0]?.textContent || ''
            const lastmod =
                sitemapEntry.getElementsByTagName('lastmod')[0]?.textContent ||
                ''

            pages.push({
                url: url,
                lastmod: lastmod,
            })
        })

        // Get all URL entries
        const urlEntries = Array.from(xmlDoc.getElementsByTagName('url'))

        urlEntries.forEach((urlEntry) => {
            const url =
                urlEntry.getElementsByTagName('loc')[0]?.textContent || ''
            const lastmod =
                urlEntry.getElementsByTagName('lastmod')[0]?.textContent || ''

            pages.push({
                url: url,
                lastmod: lastmod,
            })
        })

        return pages
    }

    const getSitemap = async (formData: IForm) => {
        try {
            setIsLoading(true)
            const { data } = await axios.get(formData?.url)

            const domain = new URL(formData?.url)
            const validationResult = validateSitemap(data)
            const pages = getSitemapPages(data)
            console.log(`pages ------->`, pages)
            setPreview({
                url: formData?.url,
                sitemapPlainText: data,
                testUrl: domain?.origin,
                validationResult: validationResult,
                pages: pages,
            })
        } catch (error) {
            toast({
                title: 'Error validating sitemap.',
                variant: 'error',
            })
            setPreview(null)
        }
        setIsLoading(false)
    }

    return (
        <div className="container">
            <div className="mx-auto my-5 w-full max-w-7xl space-y-8 rounded-2xl border border-border bg-gray-100 p-4 sm:px-5 sm:py-8 lg:mt-14 lg:px-10 lg:py-12">
                <form className="space-y-8" onSubmit={handleSubmit(getSitemap)}>
                    <div className="grid gap-5">
                        <div className="space-y-1">
                            <div>
                                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                    Sitemap URL{' '}
                                    <span className="text-secondary">*</span>
                                </label>
                                <Input
                                    type="url"
                                    placeholder="URL (Paste here the url)"
                                    className="w-full"
                                    {...register('url', {
                                        required: true,
                                        validate: validateSitemapUrl,
                                    })}
                                />
                            </div>
                            {errors.url && (
                                <p className="text-xs text-danger sm:px-3 sm:text-sm">
                                    {errors.url.message}
                                </p>
                            )}
                            <label className="inline-block text-xs text-gray sm:px-3 sm:text-sm">
                                Example: https://sbthemes.com/sitemap.xml
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                        <Button type="submit" loading={isLoading}>
                            Validate
                        </Button>
                    </div>
                </form>

                {/* Preview */}
                {preview && (
                    <div className="space-y-5">
                        {preview.validationResult && (
                            <div>
                                <h2 className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                    Test result
                                </h2>
                                <div className="overflow-hidden rounded-2xl border border-border">
                                    <Table className="bg-white">
                                        <TableHeader>
                                            <TableRow className="!border-b border-border text-left">
                                                <TableHead>
                                                    Validation
                                                </TableHead>
                                                <TableHead>Result</TableHead>
                                                <TableHead>Error</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    XML declaration
                                                </TableCell>
                                                <TableCell
                                                    className={cn(
                                                        !preview
                                                            .validationResult
                                                            .XMLDeclaration
                                                            .result &&
                                                            'text-danger',
                                                    )}
                                                >
                                                    {preview.validationResult
                                                        .XMLDeclaration.result
                                                        ? 'Valid'
                                                        : 'Invalid'}
                                                </TableCell>
                                                <TableCell
                                                    className={cn(
                                                        preview.validationResult
                                                            .XMLDeclaration
                                                            .error &&
                                                            'text-danger',
                                                    )}
                                                >
                                                    {preview.validationResult
                                                        .XMLDeclaration.error ||
                                                        'None'}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    File encoding
                                                </TableCell>
                                                <TableCell
                                                    className={cn(
                                                        !preview
                                                            .validationResult
                                                            .FileEncoding
                                                            .result &&
                                                            'text-danger',
                                                    )}
                                                >
                                                    {preview.validationResult
                                                        .FileEncoding.result
                                                        ? 'Valid (UTF-8)'
                                                        : 'Invalid'}
                                                </TableCell>
                                                <TableCell
                                                    className={cn(
                                                        preview.validationResult
                                                            .FileEncoding
                                                            .error &&
                                                            'text-danger',
                                                    )}
                                                >
                                                    {preview.validationResult
                                                        .FileEncoding.error ||
                                                        'None'}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    XML structure
                                                </TableCell>
                                                <TableCell
                                                    className={cn(
                                                        !preview
                                                            .validationResult
                                                            .XMLStructure
                                                            .result &&
                                                            'text-danger',
                                                    )}
                                                >
                                                    {preview.validationResult
                                                        .XMLStructure.result
                                                        ? 'Valid'
                                                        : 'Invalid'}
                                                </TableCell>
                                                <TableCell
                                                    className={cn(
                                                        preview.validationResult
                                                            .XMLStructure
                                                            .error &&
                                                            'text-danger',
                                                    )}
                                                >
                                                    {preview.validationResult
                                                        .XMLStructure.error ||
                                                        'None'}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    Required tags
                                                </TableCell>
                                                <TableCell
                                                    className={cn(
                                                        !preview
                                                            .validationResult
                                                            .RequiredTags
                                                            .result &&
                                                            'text-danger',
                                                    )}
                                                >
                                                    {preview.validationResult
                                                        .RequiredTags.result
                                                        ? 'Present'
                                                        : 'Missing'}
                                                </TableCell>
                                                <TableCell
                                                    className={cn(
                                                        preview.validationResult
                                                            .RequiredTags
                                                            .error &&
                                                            'text-danger',
                                                    )}
                                                >
                                                    {preview.validationResult
                                                        .RequiredTags.error ||
                                                        'None'}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    Content formatting
                                                </TableCell>
                                                <TableCell
                                                    className={cn(
                                                        !preview
                                                            .validationResult
                                                            .ContentFormatting
                                                            .result &&
                                                            'text-danger',
                                                    )}
                                                >
                                                    {preview.validationResult
                                                        .ContentFormatting
                                                        .result
                                                        ? 'Valid'
                                                        : 'Invalid'}
                                                </TableCell>
                                                <TableCell
                                                    className={cn(
                                                        preview.validationResult
                                                            .ContentFormatting
                                                            .error &&
                                                            'text-danger',
                                                    )}
                                                >
                                                    {preview.validationResult
                                                        .ContentFormatting
                                                        .error || 'None'}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    Basic guidelines
                                                </TableCell>
                                                <TableCell
                                                    className={cn(
                                                        !preview
                                                            .validationResult
                                                            .BasicGuidelines
                                                            .result &&
                                                            'text-danger',
                                                    )}
                                                >
                                                    {preview.validationResult
                                                        .BasicGuidelines.result
                                                        ? 'Valid'
                                                        : 'Invalid'}
                                                </TableCell>
                                                <TableCell
                                                    className={cn(
                                                        preview.validationResult
                                                            .ContentFormatting
                                                            .error &&
                                                            'text-danger',
                                                    )}
                                                >
                                                    {preview.validationResult
                                                        .ContentFormatting
                                                        .error || 'None'}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        )}

                        {!!preview.pages.length && (
                            <div>
                                <h2 className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                    URLs
                                </h2>
                                <div className="overflow-hidden rounded-2xl border border-border">
                                    <Table className="bg-white">
                                        <TableHeader>
                                            <TableRow className="!border-b border-border text-left">
                                                <TableHead>URL</TableHead>
                                                <TableHead>
                                                    Last modified
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {preview.pages.map((page) => (
                                                <TableRow key={page.url}>
                                                    <TableCell>
                                                        <Link
                                                            href={
                                                                page?.url || ''
                                                            }
                                                            className="text-blue hover:underline"
                                                            target="_blank"
                                                        >
                                                            {page?.url || ''}
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell>
                                                        {page.lastmod}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SitemapValidator
