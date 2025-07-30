export interface IThumbnail {
    src: string
    alt: string
    title?: string
}

export interface IReviews {
    count: number
    rating: number
}

export interface IPlan {
    type: string
    variant_id: number
    price?: number | string
    original_price?: number | string
    description: string[]
}

export interface IProduct {
    id: string
    version?: string
    name: string
    shortName?: string
    slug: string
    category: number[]
    short_description: string
    meta_description: string
    description: string
    status: string
    thumb_url: IThumbnail
    large_thumb_url: IThumbnail[]
    tags_array: string[]
    tech_stack_array: string[]
    libraries?: string[]
    from_price: number
    to_price: number
    to_original_price: number
    reviews?: IReviews
    plans: {
        free?: IPlan
        pro?: IPlan
    }
    preview_links?: { label: string; link: string }[]
    isPopular?: boolean
    isNew?: boolean
}
export interface ITool {
    id: number
    icon: any
    slug: string
    title: string
    description: string
    category?: number
    metaTitle?: string
    metaDescription?: string
}
