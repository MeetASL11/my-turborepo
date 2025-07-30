'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

const userAgents = [
    {
        name: 'Google',
        icon: 'mdi mdi-google',
        user_agents: [
            {
                name: 'Googlebot Smartphone',
                token: 'Googlebot',
                string: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
            },
            {
                name: 'Googlebot',
                token: 'Googlebot',
                string: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/86.0.0.0 Safari/537.36',
            },
            {
                name: 'Googlebot News',
                token: 'Googlebot-News',
                string: 'Googlebot-News',
            },
            {
                name: 'Googlebot Images',
                token: 'Googlebot-Image',
                string: 'Googlebot-Image/1.0',
            },
            {
                name: 'Googlebot Video',
                token: 'Googlebot-Video',
                string: 'Googlebot-Video/1.0',
            },
            {
                name: 'Google StoreBot (Mobile)',
                token: 'Storebot-Google',
                string: 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012; Storebot-Google/1.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36',
            },
            {
                name: 'Google StoreBot (Desktop)',
                token: 'Storebot-Google',
                string: 'Mozilla/5.0 (X11; Linux x86_64; Storebot-Google/1.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
            },
            {
                name: 'Google-InspectionTool (Mobile)',
                token: 'Google-InspectionTool',
                string: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.0.0 Mobile Safari/537.36 (compatible; Google-InspectionTool/1.0)',
            },
            {
                name: 'Google-InspectionTool (Desktop)',
                token: 'Google-InspectionTool',
                string: 'Mozilla/5.0 (compatible; Google-InspectionTool/1.0)',
            },
            {
                name: 'GoogleOther',
                token: 'GoogleOther',
                string: 'GoogleOther',
            },
            {
                name: 'Google-Extended',
                token: 'Google-Extended',
                string: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/86.0.0.0 Safari/537.36',
            },
            {
                name: 'AdsBot Mobile Web',
                token: 'AdsBot-Google-Mobile',
                string: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1 (compatible; AdsBot-Google-Mobile; +http://www.google.com/mobile/adsbot.html)',
            },
            {
                name: 'AdsBot',
                token: 'AdsBot-Google',
                string: 'AdsBot-Google (+http://www.google.com/adsbot.html)',
            },
            {
                name: 'AdSense',
                token: 'Mediapartners-Google',
                string: 'Mediapartners-Google',
            },
        ],
    },
    {
        name: 'Bing',
        icon: 'mdi mdi-microsoft-bing',
        user_agents: [
            {
                name: 'Bingbot',
                token: 'Bingbot',
                string: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
            },
            {
                name: 'Bingbot Smartphone',
                token: 'Bingbot',
                string: 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
            },
            {
                name: 'MSNBot',
                token: 'MSNBot',
                string: 'msnbot/2.0b (+http://search.msn.com/msnbot.htm)',
            },
            {
                name: 'MSNBot-Media',
                token: 'MSNBot-Media',
                string: 'msnbot-media/1.1 (+http://search.msn.com/msnbot.htm)',
            },
            {
                name: 'AdIdxBot',
                token: 'AdIdxBot',
                string: 'adidxbot/1.1 (+http://search.msn.com/msnbot.htm)',
            },
            {
                name: 'BingPreview',
                token: 'BingPreview',
                string: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534+ (KHTML, like Gecko) BingPreview/1.0b',
            },
        ],
    },
    {
        name: 'Other Search Engines',
        icon: 'mdi mdi-web',
        user_agents: [
            {
                name: 'Yahoo!',
                token: 'Slurp',
                string: 'Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)',
            },
            {
                name: 'DuckDuckGo',
                token: 'DuckDuckBot',
                string: 'DuckDuckBot/1.0; (+http://duckduckgo.com/duckduckbot.html)',
            },
            {
                name: 'Baidu',
                token: 'Baiduspider',
                string: 'Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)',
            },
            {
                name: 'Baidu - Render (Desktop)',
                token: 'Baiduspider',
                string: 'Mozilla/5.0 (compatible; Baiduspider-render/2.0; +http://www.baidu.com/search/spider.html)',
            },
            {
                name: 'Baidu - Render (Mobile)',
                token: 'Baiduspider',
                string: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 (compatible; Baiduspider-render/2.0; +http://www.baidu.com/search/spider.html)',
            },
            {
                name: 'Yandex',
                token: 'Yandexbot',
                string: 'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)',
            },
            {
                name: 'Applebot',
                token: 'Applebot',
                string: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Safari/605.1.15 (Applebot/0.1)',
            },
            {
                name: 'Applebot Smartphone',
                token: 'Applebot',
                string: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15Z (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1 (Applebot/0.1)',
            },
        ],
    },
    {
        name: 'Social Media',
        icon: 'mdi mdi-share-variant',
        user_agents: [
            {
                name: 'Facebook',
                token: 'FacebookExternalHit',
                string: 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
            },
            {
                name: 'Twitter',
                token: 'Twitterbot',
                string: 'Twitterbot/1.0',
            },
            {
                name: 'LinkedIn',
                token: 'LinkedInBot',
                string: 'LinkedInBot/1.0 (compatible; Mozilla/5.0; Jakarta Commons-HttpClient/3.1 +http://www.linkedin.com)',
            },
        ],
    },
    {
        name: 'SEO Tools',
        icon: 'mdi mdi-tools',
        user_agents: [
            {
                name: 'TechnicalSEO.com',
                token: 'TechnicalSEOdotCom',
                string: 'TechnicalSEO.com Spider Bot/2.0',
            },
            {
                name: 'Screaming Frog',
                token: 'Screaming Frog SEO Spider',
                string: 'Screaming Frog SEO Spider/1.0',
            },
            {
                name: 'Screaming Frog (Mobile)',
                token: 'Screaming Frog SEO Spider',
                string: 'Screaming Frog SEO Spider/1.0 Mobile',
            },
            {
                name: 'Botify',
                token: 'Botify',
                string: 'Mozilla/5.0 (compatible; botify; http://botify.com)',
            },
            {
                name: 'Botify (Mobile)',
                token: 'Botify',
                string: 'Mozilla/5.0 Mobile (compatible; botify; http://botify.com)',
            },
            {
                name: 'OnCrawl',
                token: 'OnCrawl',
                string: 'Mozilla/5.0 (compatible; OnCrawl/1.0; +http://www.oncrawl.com/)',
            },
            {
                name: 'OnCrawl (Mobile)',
                token: 'OnCrawl',
                string: 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12F70 Safari/600.1.4 (compatible; OnCrawl; +http://www.oncrawl.com/)',
            },
            {
                name: 'Moz (Campaign/Diagnostics)',
                token: 'rogerbot',
                string: 'rogerbot/1.0 (http://moz.com/help/pro/what-is-rogerbot-, rogerbot-crawler+shiny@moz.com)',
            },
            {
                name: 'Moz (Mozscape/Freshscape)',
                token: 'DotBot',
                string: 'Mozilla/5.0 (compatible; DotBot/1.1; http://www.opensiteexplorer.org/dotbot, help@moz.com)',
            },
            {
                name: 'Majestic',
                token: 'MJ12bot',
                string: 'Mozilla/5.0 (compatible; MJ12bot/v1.4.5; http://www.majestic12.co.uk/bot.php?+)',
            },
            {
                name: 'Ahrefs',
                token: 'AhrefsBot',
                string: 'Mozilla/5.0 (compatible; AhrefsBot/5.0; +http://ahrefs.com/robot/)',
            },
            {
                name: 'Alexa',
                token: 'ia_archiver',
                string: 'ia_archiver (+http://www.alexa.com/site/help/webmasters; crawler@alexa.com)',
            },
            {
                name: 'PageSpeed Insights (Mobile)',
                token: 'N/A',
                string: 'Mozilla/5.0 (Linux; Android 7.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.175 Mobile Safari/537.36 Chrome-Lighthouse',
            },
            {
                name: 'PageSpeed Insights (Desktop)',
                token: 'N/A',
                string: 'Mozilla/5.0 (Mcintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.175 Safari/537.36 Chrome-Lighthouse',
            },
        ],
    },
    {
        name: 'AI Crawlers',
        icon: 'mdi mdi-robot',
        user_agents: [
            {
                name: 'OpenAI',
                token: 'GPTBot',
                string: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.0; +https://openai.com/gptbot)',
            },
            {
                name: 'ChatGPT',
                token: 'ChatGPT-User',
                string: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot',
            },
            {
                name: 'SearchGPT',
                token: 'OAI-SearchBot',
                string: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot',
            },
            {
                name: 'Common Crawl',
                token: 'CCBot',
                string: 'CCBot/2.0',
            },
            {
                name: 'Amazon',
                token: 'Amazonbot',
                string: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/600.2.5 (KHTML, like Gecko) Version/8.0.2 Safari/600.2.5 (Amazonbot/0.1; +https://developer.amazon.com/support/amazonbot)',
            },
            {
                name: 'Meta (Facebook)',
                token: 'FacebookBot',
                string: 'Mozilla/5.0 (compatible; FacebookBot/1.0; +https://developers.facebook.com/docs/sharing/webmasters/facebookbot/)',
            },
            {
                name: 'Meta External Agent (Facebook)',
                token: 'meta-externalagent',
                string: 'meta-externalagent/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)',
            },
            {
                name: 'Perplexity',
                token: 'PerplexityBot',
                string: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)',
            },
            {
                name: 'You.com',
                token: 'YouBot',
                string: 'Mozilla/5.0 (compatible; YouBot/1.0; +https://about.you.com/youbot/)',
            },
            {
                name: 'Anthropic',
                token: 'anthropic-ai',
                string: 'anthropic',
            },
            {
                name: 'Claude (Anthropic)',
                token: 'Claude-Web',
                string: 'claude',
            },
            {
                name: 'ClaudeBot (Anthropic)',
                token: 'ClaudeBot',
                string: 'claudebot',
            },
            {
                name: 'Cohere',
                token: 'cohere-ai',
                string: 'cohere',
            },
            {
                name: 'Webz.io (Omgilibot)',
                token: 'Omgilibot',
                string: 'omgili',
            },
            {
                name: 'Webz.io (omgili)',
                token: 'omgili',
                string: 'omgili',
            },
            {
                name: 'Diffbot',
                token: 'Diffbot',
                string: 'Mozilla/5.0 (compatible; Onespot-ScraperBot/1.0; +https://www.onespot.com/identifying-traffic.html)',
            },
            {
                name: 'ByteDance (TikTok)',
                token: 'Bytespider',
                string: 'Mozilla/5.0 (Linux; Android 5.0) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36 (compatible; Bytespider; spider-feedback@bytedance.com)',
            },
            {
                name: 'Google-Extended (AI Crawlers)',
                token: 'Google-Extended',
                string: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/86.0.0.0 Safari/537.36',
            },
            {
                name: 'Applebot-Extended',
                token: 'Applebot-Extended',
                string: 'Mozilla/5.0 (Device; OS_version) AppleWebKit/WebKit_version (KHTML, like Gecko)Version/Safari_version [Mobile/Mobile_version] Safari/WebKit_version (Applebot/Applebot_version; +http://www.apple.com/go/applebot)',
            },
        ],
    },
    {
        name: 'Browsers',
        icon: 'mdi mdi-application',
        user_agents: [
            {
                name: 'Chrome (Android Mobile)',
                token: 'N/A',
                string: 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Mobile Safari/537.36',
            },
            {
                name: 'Chrome (Windows Desktop)',
                token: 'N/A',
                string: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36',
            },
            {
                name: 'Safari (iPhone)',
                token: 'N/A',
                string: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
            },
        ],
    },
    {
        name: 'Misc.',
        icon: 'mdi mdi-asterisk',
        user_agents: [
            {
                name: 'All (robots.txt)',
                token: '*',
                string: 'TechnicalSEO.com Spider Bot/2.0',
            },
        ],
    },
]

type IPreview = {
    url: string
    userAgent: string
    crawlable: boolean
    robotsTxt: string
    testUrl: string
}

type IForm = {
    url: string
    userAgent: string
}

const RobotsTxtValidator = () => {
    const [preview, setPreview] = useState<IPreview | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const urlRegex = /^(https?:\/\/[^\s/$.?#].[^\s]*\/robots\.txt)$/

    const validateRobotsUrl = (value: string) => {
        if (!urlRegex.test(value)) {
            return 'URL must point to robots.txt'
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
            userAgent: 'Googlebot',
        },
    })

    const validateRobotsTxt = (
        robotsTxt: string,
        userAgent: string,
        url: string,
    ) => {
        const lines = robotsTxt.split('\n')
        const matchingRules: { allow: string[]; disallow: string[] } = {
            allow: [],
            disallow: [],
        }
        let currentUserAgent = null

        // Normalize the URL for comparison
        const parsedUrl = new URL(url)
        const path = parsedUrl.pathname

        // Iterate through lines in robots.txt
        for (const line of lines) {
            const trimmedLine = line.trim()

            if (trimmedLine.startsWith('User-agent:')) {
                // If it's a user-agent line, set the currentUserAgent
                const agent = trimmedLine.split(':')[1]?.trim()
                if (agent === '*' || agent === userAgent) {
                    currentUserAgent = agent
                } else {
                    currentUserAgent = null
                }
            }

            // Only process Allow/Disallow rules if the correct user-agent is set
            if (currentUserAgent) {
                if (trimmedLine.startsWith('Disallow:')) {
                    const disallowPath = trimmedLine.split(':')[1]?.trim()
                    if (disallowPath) {
                        matchingRules.disallow.push(disallowPath)
                    }
                }
                if (trimmedLine.startsWith('Allow:')) {
                    const allowPath = trimmedLine.split(':')[1]?.trim()
                    if (allowPath) {
                        matchingRules.allow.push(allowPath)
                    }
                }
            }
        }

        // Function to check if a URL matches a rule path
        const isPathMatched = (rulePath: string) => {
            return path.startsWith(rulePath)
        }

        // Determine if the path is allowed or disallowed based on the rules
        let isDisallowed = false
        let isAllowed = false

        // Check Disallow rules
        for (const disallowPath of matchingRules.disallow) {
            if (isPathMatched(disallowPath)) {
                isDisallowed = true
                break
            }
        }

        // Check Allow rules
        for (const allowPath of matchingRules.allow) {
            if (isPathMatched(allowPath)) {
                isAllowed = true
                break
            }
        }

        // Apply rule precedence: if both allow and disallow match, allow takes precedence
        if (isAllowed) {
            return true // Allowed explicitly
        }

        return !isDisallowed // If not allowed, return true unless explicitly disallowed
    }

    const getRobotsTxt = async (formData: IForm) => {
        try {
            setIsLoading(true)
            const { data } = await axios.get(formData?.url)
            const userAgent = userAgents
                ?.flatMap((agent) => agent.user_agents)
                ?.find(
                    (userAgent) => userAgent.name === formData?.userAgent,
                )?.token
            const domain = new URL(formData?.url)
            const crawlable = validateRobotsTxt(
                data,
                userAgent as string,
                domain?.origin,
            )
            setPreview({
                url: formData?.url,
                userAgent: formData?.userAgent,
                crawlable: crawlable,
                robotsTxt: data,
                testUrl: domain?.origin,
            })
        } catch (error) {
            toast({
                title: 'Error validating robots.txt.',
                variant: 'error',
            })
            setPreview(null)
        }
        setIsLoading(false)
    }

    return (
        <div className="container">
            <div className="mx-auto my-5 w-full max-w-7xl space-y-8 rounded-2xl border border-border bg-gray-100 p-4 sm:px-5 sm:py-8 lg:mt-14 lg:px-10 lg:py-12">
                <form
                    className="space-y-8"
                    onSubmit={handleSubmit(getRobotsTxt)}
                >
                    <div className="grid gap-5 lg:grid-cols-2">
                        <div className="space-y-1">
                            <div>
                                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                    Robots.txt URL{' '}
                                    <span className="text-secondary">*</span>
                                </label>
                                <Input
                                    type="url"
                                    placeholder="URL (Paste here the url)"
                                    className="w-full"
                                    {...register('url', {
                                        required: true,
                                        validate: validateRobotsUrl,
                                    })}
                                />
                            </div>
                            {errors.url && (
                                <p className="text-xs text-danger sm:px-3 sm:text-sm">
                                    {errors.url.message}
                                </p>
                            )}
                            <label className="inline-block text-xs text-gray sm:px-3 sm:text-sm">
                                Example: https://sbthemes.com/robots.txt
                            </label>
                        </div>
                        <div className="space-y-1">
                            <div>
                                <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                    Select user agent{' '}
                                    <span className="text-secondary">*</span>
                                </label>
                                <Controller
                                    name="userAgent"
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <Select
                                            value={value}
                                            onValueChange={onChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select userAgent" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {userAgents.map(
                                                    (agent, key) => {
                                                        return (
                                                            <SelectGroup
                                                                key={key}
                                                            >
                                                                <SelectLabel className="font-bold">
                                                                    {agent.name}
                                                                </SelectLabel>
                                                                {agent.user_agents.map(
                                                                    (
                                                                        userAgent,
                                                                        userAgentKey,
                                                                    ) => {
                                                                        return (
                                                                            <SelectItem
                                                                                key={
                                                                                    userAgentKey
                                                                                }
                                                                                value={
                                                                                    userAgent.name
                                                                                }
                                                                            >
                                                                                {
                                                                                    userAgent.name
                                                                                }{' '}
                                                                                (
                                                                                {
                                                                                    userAgent.token
                                                                                }

                                                                                )
                                                                            </SelectItem>
                                                                        )
                                                                    },
                                                                )}
                                                            </SelectGroup>
                                                        )
                                                    },
                                                )}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
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
                        <div>
                            <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                Paste or write your robots.txt file code
                            </label>
                            <Textarea
                                rows={10}
                                value={preview.robotsTxt}
                                onChange={(e) => {
                                    const crawlable = validateRobotsTxt(
                                        e.target.value,
                                        preview.userAgent,
                                        preview.testUrl,
                                    )
                                    setPreview(() => {
                                        return {
                                            ...preview,
                                            robotsTxt: e.target.value,
                                            crawlable: crawlable,
                                        }
                                    })
                                }}
                            />
                        </div>
                        <div>
                            <label className="mb-2.5 block text-sm/[18px] font-medium text-primary">
                                Enter the URL to test
                            </label>
                            <Input
                                type="url"
                                value={preview.testUrl}
                                onChange={(e) => {
                                    const crawlable = validateRobotsTxt(
                                        preview.robotsTxt,
                                        preview.userAgent,
                                        e.target.value,
                                    )
                                    setPreview(() => {
                                        return {
                                            ...preview,
                                            testUrl: e.target.value,
                                            crawlable: crawlable,
                                        }
                                    })
                                }}
                            />
                        </div>

                        {preview.robotsTxt.trim() !== '' &&
                            preview.testUrl.trim() !== '' && (
                                <div
                                    className={cn(
                                        'rounded-xl p-2 text-white',
                                        preview.crawlable
                                            ? 'bg-success'
                                            : 'bg-danger',
                                    )}
                                >
                                    {preview.crawlable
                                        ? 'Crawlable'
                                        : 'Blocked'}
                                </div>
                            )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default RobotsTxtValidator
