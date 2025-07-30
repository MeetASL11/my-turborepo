import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const ExploreTemplatesButton = () => {
    // const scrollToTemplates = () => {
    //     const templatesDiv = document.getElementById('website-templates')
    //     window.scrollTo({
    //         top: templatesDiv?.offsetTop,
    //         behavior: 'smooth',
    //     })
    // }
    return (
        <Button asChild type="button" size="large">
            <Link href="/templates" className="inline-block">
                Explore templates
                <ArrowUpRight className="size-[18px] shrink-0" />
            </Link>
        </Button>
    )
}
