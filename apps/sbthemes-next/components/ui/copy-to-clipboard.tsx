'use client'

import { useState } from 'react'
import { Copy } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

const CopyToClipboard = ({
    text,
    tooltipContent = 'Copy',
    btnClass = '',
    copyIconClass = '',
    icon = null,
}: {
    text: string
    tooltipContent?: string
    btnClass?: string
    copyIconClass?: string
    icon?: null | React.ReactNode
}) => {
    const [showCopyTooltip, setShowCopyTooltip] = useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text).then(() => {
            toast({
                title: 'Copied to clipboard!',
                variant: 'success',
            })
        })
    }

    return (
        <TooltipProvider>
            <Tooltip open={showCopyTooltip} onOpenChange={setShowCopyTooltip}>
                <TooltipTrigger onClick={copyToClipboard} asChild>
                    <Button
                        type="button"
                        variant="outline-shadow"
                        className={cn('bg-white hover:bg-black p-2.5 py-2', btnClass)}
                        onClick={() => setShowCopyTooltip(!showCopyTooltip)}
                        disabled={!text}
                    >
                        {icon ? (
                            icon
                        ) : (
                            <Copy className={cn(copyIconClass, 'size-4')} />
                        )}
                        <span className="sr-only">Copy</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-black text-white">
                    <div className="relative z-10">
                        <p>{tooltipContent}</p>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default CopyToClipboard
