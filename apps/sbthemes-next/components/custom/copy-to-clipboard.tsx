'use client'
import { toast } from '@/components/ui/use-toast'

const CopyToClipboard = ({
    text,
    children,
    ...props
}: {
    text: string
    children?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const copyToClipboard = () => {
        let copyText = text

        navigator.clipboard.writeText(copyText).then(() => {
            toast({
                title: 'Copied.',
                variant: 'success',
            })
        })
    }
    return (
        <button type="button" onClick={copyToClipboard} {...props}>
            {children}
        </button>
    )
}

export default CopyToClipboard
