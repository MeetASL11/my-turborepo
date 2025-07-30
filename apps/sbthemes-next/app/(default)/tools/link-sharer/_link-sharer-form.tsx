'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Code, MoveRight } from 'lucide-react'

import IconFacebook from '@/components/icons/icon-facebook'
import IconLinkedin from '@/components/icons/icon-linkedin'
import IconMail from '@/components/icons/icon-mail'
import IconPinterest from '@/components/icons/icon-pinterest'
import IconShape from '@/components/icons/icon-shape'
import IconWhatsappFill from '@/components/icons/icon-whatsapp-fill'
import IconXSocial from '@/components/icons/icon-x-social'
import { Button } from '@/components/ui/button'
import CopyToClipboard from '@/components/ui/copy-to-clipboard'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

const links = [
    {
        name: 'All',
        isInput: true,
        isTextarea: true,
        isThumbnail: false,
        id: 'all',
        isSubject: false,
        isCc: false,
        isBcc: false,
    },
    {
        name: 'Facebook',
        isInput: true,
        isTextarea: false,
        id: 'facebook',
        isThumbnail: false,
        isSubject: false,
        isCc: false,
        isBcc: false,
    },
    {
        name: 'twitter',
        isInput: true,
        isTextarea: true,
        id: 'twitter',
        isThumbnail: false,
        isSubject: false,
        isCc: false,
        isBcc: false,
    },
    {
        name: 'Linkedin',
        isInput: true,
        isTextarea: false,
        id: 'linkedin',
        isThumbnail: false,
        isSubject: false,
        isCc: false,
        isBcc: false,
    },
    {
        name: 'Pinterest',
        isInput: true,
        isTextarea: true,
        id: 'pinterest',
        isThumbnail: true,
        isSubject: false,
        isCc: false,
        isBcc: false,
    },
    {
        name: 'whatsapp',
        isInput: true,
        isTextarea: false,
        isThumbnail: false,
        id: 'whatsapp',
        isSubject: false,
        isCc: false,
        isBcc: false,
    },
    {
        name: 'Mail',
        isInput: true,
        isTextarea: true,
        isThumbnail: false,
        id: 'mail',
        isSubject: true,
        isCc: true,
        isBcc: true,
    },
]
const LinkSharerForm = () => {
    const [isActive, setIsActive] = useState('all')
    const currentLinkItem = links?.find((link) => link?.id === isActive)
    const [url, setUrl] = useState('')
    const [subject, setSubject] = useState('')
    const [carbonCopy, setCarbonCopy] = useState('')
    const [bcc, setBcc] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [textarea, setTextarea] = useState('')
    const [facebook, setFacebook] = useState(
        'https://www.facebook.com/sharer/sharer.php?u=',
    )
    const [twitter, setTwitter] = useState(
        'https://twitter.com/intent/tweet?url=&text=',
    )
    const [linkedin, setLinkedin] = useState(
        'https://www.linkedin.com/shareArticle?mini=true&url=',
    )
    const [pinterest, setPinterest] = useState(
        'https://pinterest.com/pin/create/button/?url=&media=&description=',
    )
    const [mail, setMail] = useState(
        'mailto:info@example.com?&subject=&cc=&bcc=&body=%0A',
    )
    const [whatsapp, setWhatsapp] = useState(
        'https://api.whatsapp.com/send?text=',
    )

    const Save = () => {
        if (!url?.trim()) {
            toast({
                title: 'Please fill the URL field',
                variant: 'error',
            })
            return
        }
        toast({
            title: 'Link generated!',
            variant: 'success',
        })
        setFacebook('https://www.facebook.com/sharer/sharer.php?u=' + url)
        setTwitter(
            'https://twitter.com/intent/tweet?url=' + url + '&text=' + textarea,
        )
        setPinterest(
            'https://pinterest.com/pin/create/button/?url=' +
            url +
            '&media=' +
            thumbnail +
            '&description=' +
            textarea,
        )
        setLinkedin(
            'https://www.linkedin.com/shareArticle?mini=true&url=' + url,
        )
        setMail(
            'mailto:info@example.com?&subject=' +
            subject +
            '&cc=' +
            carbonCopy +
            '&bcc=' +
            bcc +
            '&body=' +
            url +
            '%0A' +
            textarea,
        )
        setWhatsapp('https://api.whatsapp.com/send?text=' + url)
    }

    return (
        <div className="container flex grid-cols-2 flex-col gap-10 py-5 lg:py-14 xl:grid xl:gap-16">
            <div>
                <div className="mb-5 text-center">
                    <h2 className="inline-block bg-gradient-to-r text-xl font-semibold tracking-tight text-black lg:text-[28px]/9">
                        Select social media
                    </h2>
                </div>
                <div className="space-y-4">
                    <div className="flex flex-wrap justify-center gap-1 whitespace-nowrap md:gap-2 lg:gap-4">
                        <button
                            type="button"
                            className={cn(
                                'grid min-w-12 place-content-center rounded-xl border border-transparent bg-white px-2 py-1.5 text-lg font-semibold leading-5 hover:bg-gray-100 md:min-w-16 md:border-2 md:py-2.5 md:leading-6',
                                {
                                    'border-border bg-gray-100':
                                        isActive === 'all',
                                },
                            )}
                            onClick={() => setIsActive('all')}
                        >
                            All
                        </button>
                        <button
                            type="button"
                            className={cn(
                                'grid min-w-12 place-content-center rounded-xl border border-transparent bg-white px-2 py-1.5 text-lg font-semibold leading-5 hover:bg-gray-100 md:min-w-16 md:border-2 md:py-2.5 md:leading-6',
                                {
                                    'border-border bg-gray-100':
                                        isActive === 'facebook',
                                },
                            )}
                            onClick={() => setIsActive('facebook')}
                        >
                            <IconFacebook className="size-5 shrink-0 text-[#316FF6] md:size-6" />
                        </button>
                        <button
                            type="button"
                            className={cn(
                                'grid min-w-12 place-content-center rounded-xl border border-transparent bg-white px-2 py-1.5 text-lg font-semibold leading-5 hover:bg-gray-100 md:min-w-16 md:border-2 md:py-2.5 md:leading-6',
                                {
                                    'border-border bg-gray-100':
                                        isActive === 'twitter',
                                },
                            )}
                            onClick={() => setIsActive('twitter')}
                        >
                            <IconXSocial className="size-5 shrink-0 text-black md:size-6" />
                        </button>
                        <button
                            type="button"
                            className={cn(
                                'grid min-w-12 place-content-center rounded-xl border border-transparent bg-white px-2 py-1.5 text-lg font-semibold leading-5 hover:bg-gray-100 md:min-w-16 md:border-2 md:py-2.5 md:leading-6',
                                {
                                    'border-border bg-gray-100':
                                        isActive === 'linkedin',
                                },
                            )}
                            onClick={() => setIsActive('linkedin')}
                        >
                            <IconLinkedin className="size-5 shrink-0 text-[#0077B5] md:size-6" />
                        </button>
                        <button
                            type="button"
                            className={cn(
                                'grid min-w-12 place-content-center rounded-xl border border-transparent bg-white px-2 py-1.5 text-lg font-semibold leading-5 hover:bg-gray-100 md:min-w-16 md:border-2 md:py-2.5 md:leading-6',
                                {
                                    'border-border bg-gray-100':
                                        isActive === 'pinterest',
                                },
                            )}
                            onClick={() => setIsActive('pinterest')}
                        >
                            <IconPinterest className="size-5 shrink-0 text-[#FF0000] md:size-6" />
                        </button>
                        <button
                            type="button"
                            className={cn(
                                'grid min-w-12 place-content-center rounded-xl border border-transparent bg-white px-2 py-1.5 text-lg font-semibold leading-5 hover:bg-gray-100 md:min-w-16 md:border-2 md:py-2.5 md:leading-6',
                                {
                                    'border-border bg-gray-100':
                                        isActive === 'whatsapp',
                                },
                            )}
                            onClick={() => setIsActive('whatsapp')}
                        >
                            <IconWhatsappFill className="size-5 shrink-0 text-[#25D366] md:size-6" />
                        </button>
                        <button
                            type="button"
                            className={cn(
                                'grid min-w-12 place-content-center rounded-xl border border-transparent bg-white px-2 py-1.5 text-lg font-semibold leading-5 hover:bg-gray-100 md:min-w-16 md:border-2 md:py-2.5 md:leading-6',
                                {
                                    'border-border bg-gray-100':
                                        isActive === 'mail',
                                },
                            )}
                            onClick={() => setIsActive('mail')}
                        >
                            <IconMail className="size-5 shrink-0 text-gray md:size-6" />
                        </button>
                    </div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            Save()
                        }}
                        className="space-y-5 rounded-xl border border-border bg-gray-100 p-3 sm:p-5"
                    >
                        {!!currentLinkItem?.isInput && (
                            <div className="space-y-1">
                                <Input
                                    placeholder="URL (Paste here the url you want to share)"
                                    className="w-full"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                                <label className="inline-block text-xs text-gray sm:px-3 sm:text-sm">
                                    Example: https://sbthemes.com
                                </label>
                            </div>
                        )}

                        {!!currentLinkItem?.isThumbnail && (
                            <div className="space-y-1">
                                <Input
                                    placeholder="Thumbnail Image URL (optional)"
                                    className="w-full"
                                    value={thumbnail}
                                    onChange={(e) =>
                                        setThumbnail(e.target.value)
                                    }
                                />
                            </div>
                        )}
                        {!!currentLinkItem?.isSubject && (
                            <div className="space-y-1">
                                <Input
                                    placeholder="Subject"
                                    className="w-full"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                            </div>
                        )}
                        {!!currentLinkItem?.isCc && (
                            <div className="space-y-1">
                                <Input
                                    placeholder="CC (carbon copy)"
                                    className="w-full"
                                    value={carbonCopy}
                                    onChange={(e) =>
                                        setCarbonCopy(e.target.value)
                                    }
                                />
                            </div>
                        )}
                        {!!currentLinkItem?.isBcc && (
                            <div className="space-y-1">
                                <Input
                                    placeholder="BCC (blind carbon copy)"
                                    className="w-full"
                                    value={bcc}
                                    onChange={(e) => setBcc(e.target.value)}
                                />
                            </div>
                        )}

                        {!!currentLinkItem?.isTextarea && (
                            <Textarea
                                rows={6}
                                placeholder="Text (Optional) (Twitter & Pinterest only)"
                                value={textarea}
                                onChange={(e) => setTextarea(e.target.value)}
                            />
                        )}

                        <div className="text-center">
                            <Button
                                type="submit"
                                className="min-w-44"
                                disabled={!url?.trim()}
                            >
                                Generate Links
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="space-y-5">
                <div className="mb-5 text-center">
                    <h2 className="inline-block bg-gradient-to-r text-xl font-semibold tracking-tight text-black lg:text-[28px]/9">
                        Get your links!
                    </h2>
                </div>
                <div className="space-y-5">
                    {(isActive === 'all' || isActive === 'facebook') && (
                        <div className="flex items-center gap-2">
                            <div className="relative inline-block shrink-0 text-white">
                                <IconShape className="size-8 transition md:size-[50px] [&_path]:stroke-border" />
                                <IconFacebook className="absolute left-1/2 top-1/2 size-4 shrink-0 -translate-x-1/2 -translate-y-1/2 text-[#316FF6] md:size-5" />
                            </div>
                            <Input
                                placeholder="Url"
                                className="w-full p-2 md:p-3"
                                onChange={(e) => setFacebook(e.target.value)}
                                value={facebook}
                            />
                            <div className="flex gap-1.5 md:gap-2">
                                <CopyToClipboard
                                    text={facebook?.trim()}
                                    tooltipContent="Copy URL"
                                />
                                <CopyToClipboard
                                    text={`<a href="${facebook?.trim()}">Share</a>`}
                                    icon={<Code className="size-3 md:size-4" />}
                                    tooltipContent="Copy Link HTML"
                                />
                                <RedirectURLTag text={facebook?.trim()}>
                                    <Button
                                        type="button"
                                        variant="outline-shadow"
                                        className="px-1.5 py-2 md:p-2.5"
                                        disabled={!facebook?.trim()}
                                    >
                                        <MoveRight className="size-3 md:size-4" />
                                        <span className="sr-only">
                                            rightarrow
                                        </span>
                                    </Button>
                                </RedirectURLTag>
                            </div>
                        </div>
                    )}
                    {(isActive === 'all' || isActive === 'twitter') && (
                        <div className="flex items-center gap-2">
                            <div className="relative inline-block shrink-0 text-white">
                                <IconShape className="size-8 transition md:size-[50px] [&_path]:stroke-border" />
                                <IconXSocial className="absolute left-1/2 top-1/2 size-4 shrink-0 -translate-x-1/2 -translate-y-1/2 text-black md:size-5" />
                            </div>
                            <Input
                                placeholder="Url"
                                className="w-full p-2 md:p-3"
                                onChange={(e) => setTwitter(e.target.value)}
                                value={twitter}
                            />
                            <div className="flex gap-1.5 md:gap-2">
                                <CopyToClipboard
                                    text={twitter?.trim()}
                                    tooltipContent="Copy URL"
                                />
                                <CopyToClipboard
                                    text={`<a href="${twitter?.trim()}">Share</a>`}
                                    icon={<Code className="size-3 md:size-4" />}
                                    tooltipContent="Copy Link HTML"
                                />
                                <RedirectURLTag text={twitter?.trim()}>
                                    <Button
                                        type="button"
                                        variant="outline-shadow"
                                        className="px-1.5 py-2 md:p-2.5"
                                        disabled={!twitter?.trim()}
                                    >
                                        <MoveRight className="size-3 md:size-4" />
                                        <span className="sr-only">
                                            rightarrow
                                        </span>
                                    </Button>
                                </RedirectURLTag>
                            </div>
                        </div>
                    )}
                    {(isActive === 'all' || isActive === 'linkedin') && (
                        <div className="flex items-center gap-2">
                            <div className="relative inline-block shrink-0 text-white">
                                <IconShape className="size-8 transition md:size-[50px] [&_path]:stroke-border" />
                                <IconLinkedin className="absolute left-1/2 top-1/2 size-4 shrink-0 -translate-x-1/2 -translate-y-1/2 text-[#0077B5] md:size-5" />
                            </div>
                            <Input
                                placeholder="Url"
                                className="w-full p-2 md:p-3"
                                onChange={(e) => setLinkedin(e.target.value)}
                                value={linkedin}
                            />
                            <div className="flex gap-1.5 md:gap-2">
                                <CopyToClipboard
                                    text={linkedin?.trim()}
                                    tooltipContent="Copy URL"
                                />
                                <CopyToClipboard
                                    text={`<a href="${linkedin?.trim()}">Share</a>`}
                                    icon={<Code className="size-3 md:size-4" />}
                                    tooltipContent="Copy Link HTML"
                                />
                                <RedirectURLTag text={linkedin?.trim()}>
                                    <Button
                                        type="button"
                                        variant="outline-shadow"
                                        className="px-1.5 py-2 md:p-2.5"
                                        disabled={!linkedin?.trim()}
                                    >
                                        <MoveRight className="size-3 md:size-4" />
                                        <span className="sr-only">
                                            rightarrow
                                        </span>
                                    </Button>
                                </RedirectURLTag>
                            </div>
                        </div>
                    )}
                    {(isActive === 'all' || isActive === 'pinterest') && (
                        <div className="flex items-center gap-2">
                            <div className="relative inline-block shrink-0 text-white">
                                <IconShape className="size-8 transition md:size-[50px] [&_path]:stroke-border" />
                                <IconPinterest className="absolute left-1/2 top-1/2 size-4 shrink-0 -translate-x-1/2 -translate-y-1/2 text-[#FF0000] md:size-5" />
                            </div>
                            <Input
                                placeholder="Url"
                                className="w-full p-2 md:p-3"
                                onChange={(e) => setPinterest(e.target.value)}
                                value={pinterest}
                            />
                            <div className="flex gap-1.5 md:gap-2">
                                <CopyToClipboard
                                    text={pinterest?.trim()}
                                    tooltipContent="Copy URL"
                                />
                                <CopyToClipboard
                                    text={`<a href="${pinterest?.trim()}">Share</a>`}
                                    icon={<Code className="size-3 md:size-4" />}
                                    tooltipContent="Copy Link HTML"
                                />
                                <RedirectURLTag text={pinterest?.trim()}>
                                    <Button
                                        type="button"
                                        variant="outline-shadow"
                                        className="px-1.5 py-2 md:p-2.5"
                                        disabled={!pinterest?.trim()}
                                    >
                                        <MoveRight className="size-3 md:size-4" />
                                        <span className="sr-only">
                                            rightarrow
                                        </span>
                                    </Button>
                                </RedirectURLTag>
                            </div>
                        </div>
                    )}
                    {(isActive === 'all' || isActive === 'whatsapp') && (
                        <div className="flex items-center gap-2">
                            <div className="relative inline-block shrink-0 text-white">
                                <IconShape className="size-8 transition md:size-[50px] [&_path]:stroke-border" />
                                <IconWhatsappFill className="absolute left-1/2 top-1/2 size-4 shrink-0 -translate-x-1/2 -translate-y-1/2 text-[#25D366] md:size-5" />
                            </div>
                            <Input
                                placeholder="Url"
                                className="w-full p-2 md:p-3"
                                onChange={(e) => setWhatsapp(e.target.value)}
                                value={whatsapp}
                            />
                            <div className="flex gap-1.5 md:gap-2">
                                <CopyToClipboard
                                    text={whatsapp?.trim()}
                                    tooltipContent="Copy URL"
                                />
                                <CopyToClipboard
                                    text={`<a href="${whatsapp?.trim()}">Share</a>`}
                                    icon={<Code className="size-3 md:size-4" />}
                                    tooltipContent="Copy Link HTML"
                                />
                                <RedirectURLTag text={whatsapp?.trim()}>
                                    <Button
                                        type="button"
                                        variant="outline-shadow"
                                        className="px-1.5 py-2 md:p-2.5"
                                        disabled={!whatsapp?.trim()}
                                    >
                                        <MoveRight className="size-3 md:size-4" />
                                        <span className="sr-only">
                                            rightarrow
                                        </span>
                                    </Button>
                                </RedirectURLTag>
                            </div>
                        </div>
                    )}
                    {(isActive === 'all' || isActive === 'mail') && (
                        <div className="flex items-center gap-2">
                            <div className="relative inline-block shrink-0 text-white">
                                <IconShape className="size-8 transition md:size-[50px] [&_path]:stroke-border" />
                                <IconMail className="absolute left-1/2 top-1/2 size-4 shrink-0 -translate-x-1/2 -translate-y-1/2 text-gray md:size-5" />
                            </div>
                            <Input
                                placeholder="Url"
                                className="w-full p-2 md:p-3"
                                onChange={(e) => setMail(e.target.value)}
                                value={mail}
                            />
                            <div className="flex gap-1.5 md:gap-2">
                                <CopyToClipboard
                                    text={mail?.trim()}
                                    tooltipContent="Copy URL"
                                />
                                <CopyToClipboard
                                    text={`<a href="${mail?.trim()}">Share</a>`}
                                    icon={<Code className="size-3 md:size-4" />}
                                    tooltipContent="Copy Link HTML"
                                />
                                <RedirectURLTag text={mail?.trim()}>
                                    <Button
                                        type="button"
                                        variant="outline-shadow"
                                        className="px-1.5 py-2 md:p-2.5"
                                        disabled={!mail?.trim()}
                                    >
                                        <MoveRight className="size-3 md:size-4" />
                                        <span className="sr-only">
                                            rightarrow
                                        </span>
                                    </Button>
                                </RedirectURLTag>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LinkSharerForm

const RedirectURLTag = ({
    text,
    children,
}: {
    text: string | undefined
    children: React.ReactNode
}) => {
    if (!!text?.trim()) {
        return (
            <Link href={text} target="_blank" className="h-auto">
                {children}
            </Link>
        )
    }
    return <div>{children}</div>
}
