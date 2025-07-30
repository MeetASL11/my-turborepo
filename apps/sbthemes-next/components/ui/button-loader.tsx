import { cn } from '@/lib/utils'

interface IProps {
    message: string
    style?: 'relative' | 'absolute'
    className?: string
}

export default function ButtonLoader({ message, style = 'absolute', className }: IProps) {
    return (
        <div aria-label="Loading..." role="status" className={cn({ 'absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center': style === 'absolute' }, className)}>
            <svg className="h-5 w-5 animate-spin" stroke="currentColor" viewBox="0 0 256 256">
                <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
            </svg>
            {message && <span>{message || 'Loading...'}</span>}
        </div>
    )
}
