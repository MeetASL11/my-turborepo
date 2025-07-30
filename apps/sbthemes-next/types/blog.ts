export type IBlog = {
    id: number | string
    image: string
    label: string
    date: string
    name: string
    description: string

    slug?: string
    stage?: string
    title?: string
    featureImage?: string
    createdAt?: string
    publishedAt?: string
    updatedAt?: string
    frontShowDate?: string
    metaDescription?: string
    content?: {
        text: string
        html: string
    }
    category?: {
        id: string
        title: string
        slug: string
    }[]
}
