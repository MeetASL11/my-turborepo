export const gtPageView = (url: string) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_TAG, {
            page_path: url,
        })
    }
}

export const gtEvent = ({ action, category, label, value }: any) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        if (process.env.NODE_ENV === 'development') {
            console.log({
                action: action,
                event_category: category,
                event_label: label,
                value: parseFloat(value),
            })
        }
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: parseFloat(value),
        })
    }
}

export const gtCartEvent = ({ action, ...rest }: any) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        if (process.env.NODE_ENV === 'development') {
            console.log({
                action: action,
                ...rest,
            })
        }
        window.gtag('event', action, rest)
    }
}
