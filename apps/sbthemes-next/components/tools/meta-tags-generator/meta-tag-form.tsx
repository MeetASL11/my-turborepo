'use client'
import React, { useEffect, useState } from 'react'
import { CodeXml } from 'lucide-react'
import { useForm, useWatch } from 'react-hook-form'

import ArticleProperty from '@/components/tools/meta-tags-generator/article-property'
import BookProperty from '@/components/tools/meta-tags-generator/book-property'
import GeneralInformationProperty from '@/components/tools/meta-tags-generator/general-information-property'
import ImageProperty from '@/components/tools/meta-tags-generator/image-property'
import OptionalProperty from '@/components/tools/meta-tags-generator/optional-property'
import ProfileProperty from '@/components/tools/meta-tags-generator/profile-property'
import TwitterProperty from '@/components/tools/meta-tags-generator/twitter-property'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import helper from '@/lib/helper'

export type IForm = {
    page_type: string
    title: string
    description: string
    page_url: string
    site_keywords: string
    include_robots_index: string
    follow_robots_links: string
    content_type: string
    language: string
    page_revisit_day: string
    author_name: string
    image_url: string
    image_alt: string
    width: string
    height: string
    twitter_card_type: string
    twitter_site_account: string
    twitter_creator_account: string
    article_publishing_date: string
    article_modification_date: string
    article_expiration_date: string
    article_author: string
    article_section: string
    article_tag: string
    book_author: string
    book_isbn: string
    book_release_date: string
    book_tag: string
    first_name: string
    last_name: string
    username: string
    gender: string
}

const defaultValue: IForm = {
    page_type: 'website',
    title: '',
    description: '',
    page_url: '',
    site_keywords: '',
    include_robots_index: 'yes',
    follow_robots_links: 'yes',
    content_type: 'utf',
    language: 'en',
    page_revisit_day: '',
    author_name: '',
    image_url: '',
    image_alt: '',
    width: '',
    height: '',
    twitter_card_type: 'summary_large_image',
    twitter_site_account: '',
    twitter_creator_account: '',
    article_publishing_date: '',
    article_modification_date: '',
    article_expiration_date: '',
    article_author: '',
    article_section: '',
    article_tag: '',
    book_author: '',
    book_isbn: '',
    book_release_date: '',
    book_tag: '',
    first_name: '',
    last_name: '',
    username: '',
    gender: '',
}

function MetaTagForm() {
    const [metaTags, setMetaTags] = useState('')

    const { register, control, reset, watch } = useForm<IForm>({
        defaultValues: defaultValue,
    })

    const getLanguageLabel = (code: string | undefined) => {
        if (!code) return 'English'
        const name = helper.countryData?.find(
            (item) => item.code.toLowerCase() === code.toLowerCase(),
        )?.name

        return name
    }

    const getRobotsIndexInfo = (index: string | undefined) => {
        if (!index) return 'index'
        if (index === 'yes') return 'index'
        return 'noindex'
    }

    const getRobotsFollowLinkInfo = (follow: string | undefined) => {
        if (!follow) return 'follow'
        if (follow === 'yes') return 'follow'
        return 'nofollow'
    }

    const allValues = useWatch({ control })

    const pageType = watch('page_type')

    useEffect(() => {
        if (pageType)
            reset({
                ...defaultValue,
                page_type: pageType,
            })
    }, [reset, pageType])

    useEffect(() => {
        const metaTags = [
            `<!-- Primary Meta Tags -->`,
            `<meta name="language" content="${getLanguageLabel(allValues.language)}" />`,
            `<meta charset="${allValues.content_type}" />`,
            `<meta name="robots" content="${getRobotsIndexInfo(allValues.include_robots_index)}, ${getRobotsFollowLinkInfo(allValues.follow_robots_links)}" />`,
            !!allValues.site_keywords &&
                `<meta name="keywords" content="${allValues.site_keywords}" />`,
            !!allValues.title &&
                `<meta name="title" content="${allValues.title}" />`,
            !!allValues.page_url &&
                `<meta name="url" content="${allValues.page_url}" />`,
            !!allValues.description &&
                `<meta name="description" content="${allValues.description}" />`,
            !!allValues.image_url &&
                `<meta name="image" content="${allValues.image_url}" />`,
            !!allValues.image_alt &&
                `<meta name="image:alt" content="${allValues.image_alt}" />`,
            !!allValues.page_revisit_day &&
                `<meta name="revisit-after" content="${allValues.page_revisit_day} days" />`,
            !!allValues.author_name &&
                `<meta name="author" content="${allValues.author_name}" />`,
            ' ',

            allValues.page_type !== 'music' &&
                allValues.page_type !== 'video' &&
                `<!-- Open Graph / Facebook -->`,
            allValues.page_type !== 'music' &&
                allValues.page_type !== 'video' &&
                `<meta property="og:type" content="${allValues.page_type || 'website'}" />`,
            !!allValues.title &&
                `<meta property="og:title" content="${allValues.title}" />`,
            !!allValues.page_url &&
                `<meta name="og:url" content="${allValues.page_url}" />`,
            !!allValues.description &&
                `<meta name="og:description" content="${allValues.description}" />`,
            !!allValues.image_url &&
                `<meta name="og:image" content="${allValues.image_url}" />`,
            !!allValues.image_alt &&
                `<meta name="og:image:alt" content="${allValues.image_alt}" />`,
            !!allValues.width &&
                `<meta property="og:image:width" content="${allValues.width}" />`,
            !!allValues.height &&
                `<meta property="og:image:height" content="${allValues.height}" />`,
            !!allValues.article_publishing_date &&
                `<meta property="og:article:published_time" content="${allValues.article_publishing_date}" />`,
            !!allValues.article_modification_date &&
                `<meta property="og:article:modified_time" content="${allValues.article_modification_date}" />`,
            !!allValues.article_expiration_date &&
                `<meta property="og:article:expiration_time" content="${allValues.article_expiration_date}" />`,
            !!allValues.article_author &&
                `<meta property="og:article:author" content="${allValues.article_author}" />`,
            !!allValues.article_section &&
                `<meta property="og:article:section" content="${allValues.article_section}" />`,
            !!allValues.article_tag &&
                `<meta property="og:article:tag" content="${allValues.article_tag}" />`,
            !!allValues.book_author &&
                `<meta property="og:book:isbn" content="${allValues.book_author}" />`,
            !!allValues.book_isbn &&
                `<meta property="og:book:author" content="${allValues.book_isbn}" />`,
            !!allValues.book_release_date &&
                `<meta property="og:book:release_date" content="${allValues.book_release_date}" />`,
            !!allValues.book_tag &&
                `<meta property="og:book:tag" content="${allValues.book_tag}" />`,
            !!allValues.first_name &&
                `<meta property="og:profile:first_name" content="${allValues.first_name}" />`,
            !!allValues.last_name &&
                `<meta property="og:profile:last_name" content="${allValues.last_name}" />`,
            !!allValues.username &&
                `<meta property="og:profile:username" content="${allValues.username}" />`,
            !!allValues.gender &&
                `<meta property="og:profile:gender" content="${allValues.gender}" />`,
            ' ',

            `<!-- Twitter -->`,
            `<meta property="twitter:card" content="${allValues.twitter_card_type}" />`,
            !!allValues.title &&
                `<meta property="twitter:title" content="${allValues.title}" />`,
            !!allValues.description &&
                `<meta name="twitter:description" content="${allValues.description}" />`,
            !!allValues.image_url &&
                `<meta name="twitter:image" content="${allValues.image_url}" />`,
            !!allValues.image_alt &&
                `<meta name="twitter:image:alt" content="${allValues.image_alt}" />`,
            !!allValues.twitter_site_account &&
                `<meta name="twitter:site" content="${allValues.twitter_site_account}" />`,
            !!allValues.twitter_creator_account &&
                `<meta name="twitter:creator" content="${allValues.twitter_creator_account}" />`,
        ]

        const generatedMetaTags = metaTags.filter(Boolean).join('\n')
        setMetaTags(generatedMetaTags)
    }, [allValues])

    const copyToClipboard = () => {
        toast({
            title: 'Copied to clipboard!',
            variant: 'success',
        })

        navigator.clipboard.writeText(metaTags).then(() => {})
    }

    return (
        <div className="container my-5 grid-cols-2 gap-10 space-y-6 px-4 lg:my-14 lg:space-y-10 xl:grid xl:items-start xl:space-y-0">
            <form>
                <div className="space-y-8 rounded-xl bg-gray-100 px-4 py-5 ring-1 ring-border">
                    <h2 className="text-xl font-semibold text-primary">
                        General information
                    </h2>
                    <GeneralInformationProperty
                        register={register}
                        control={control}
                    />

                    <div className="text-xl font-semibold text-primary">
                        Image
                    </div>
                    <ImageProperty register={register} />

                    <div className="text-xl font-semibold text-primary">
                        Twitter
                    </div>
                    <TwitterProperty register={register} control={control} />

                    {allValues.page_type === 'article' && (
                        <>
                            <div className="text-xl">Article</div>
                            <ArticleProperty register={register} />
                        </>
                    )}

                    {allValues.page_type === 'book' && (
                        <>
                            <div className="text-xl">Book</div>
                            <BookProperty register={register} />
                        </>
                    )}

                    {allValues.page_type === 'profile' && (
                        <>
                            <div className="text-xl">Profile</div>
                            <ProfileProperty register={register} />
                        </>
                    )}

                    <h3 className="py-4 text-center font-semibold text-primary">
                        (Optional Meta Tags)
                    </h3>

                    <OptionalProperty register={register} control={control} />
                </div>
            </form>
            <div className="rounded-2xl border border-border bg-gray-100 p-4">
                <div className="mb-3 flex flex-wrap items-start justify-between gap-4 md:items-center">
                    <h2 className="text-xl font-semibold text-primary">
                        Generated Meta Tags:
                    </h2>
                    <Button
                        type="button"
                        onClick={copyToClipboard}
                        disabled={!metaTags}
                    >
                        <span>Copy</span>
                        <span className="sr-only">Code copy</span>
                    </Button>
                </div>
                <div className="min-h-40 overflow-x-auto rounded-xl border border-border bg-white px-3 py-4 text-sm shadow-sm md:p-5">
                    {metaTags && <pre>{metaTags}</pre>}
                </div>
            </div>
        </div>
    )
}

export default MetaTagForm
