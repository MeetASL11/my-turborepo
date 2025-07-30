const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ''
const lastMod = new Date().toISOString()

async function getBlogs() {
    const orderBy = 'createdAt_DESC'

    const page = 1
    const limit = 1000
    const skip = (page - 1) * limit
    const first = limit

    try {
        const headers = {
            'content-type': 'application/json',
        }
        const requestBody = {
            query: `query ($skip: Int, $first: Int, $stage: Stage!, $orderBy: BlogOrderByInput) {
                page: blogsConnection(skip: $skip, first: $first, stage: $stage, orderBy: $orderBy) {
                    edges {
                          node {
                            id
                            slug
                            stage
                            title
                            featureImage
                            createdAt
                            metaDescription
                            category {
                              id
                              title
                              slug
                            }
                          }
                        }
                        pageInfo {
                          pageSize
                        }
                        aggregate {
                          count
                        }
                    }
                }
              `,
            variables: {
                skip: Number(skip),
                first: Number(first),
                stage: 'PUBLISHED',
                orderBy: orderBy,
            },
        }
        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(requestBody),
        }
        const res = await fetch(process.env.HYGRAPH_URL as string, {
            ...options,
            cache: 'no-store',
        })
        const response = await res.json()

        return response
    } catch (error) {}
}

async function generateSiteMap(skip: number, first: number) {
    try {
        const blogs = await getBlogs()
        const urls = blogs?.data?.page?.edges?.map((post: any) => {
            return `<item><guid>${baseUrl}/post/${post?.node?.slug}</guid>
    <title>${post?.node?.title}</title>
    <link>${baseUrl}/post/${post?.node?.slug}</link>
    <description>${post?.node?.metaDescription}</description>
    <pubDate>${post?.node?.createdAt}</pubDate>
    <author>sbthemes</author>
    <category>${post?.node?.category?.map((x: any) => x.title).join(', ')}</category>
  </item>`
        })

        return `<?xml version="1.0" encoding="UTF-8"?>
        <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>sbthemes</title>
      <link>${baseUrl}/blog</link>
      <description>Build professional websites faster with our HTML5, React, Next.js, Vue.js, Nuxt, AngularJS and Tailwind CSS themes.</description>
      <language>en-us</language>
      <managingEditor>sbthemes@dev.appstonelab.com (sbthemes)</managingEditor>
      <webMaster>sbthemes@dev.appstonelab.com (sbthemes)</webMaster>
      <lastBuildDate>${new Date().toISOString()}</lastBuildDate>
      <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
      ${urls?.join('')}
         </channel>
  </rss>
`
    } catch (error) {
        console.log(error)
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || 1

    const limit = 6
    const skip = (Number(page) - 1) * limit
    const first = limit

    const body = await generateSiteMap(skip, first)

    return new Response(body, {
        status: 200,
        headers: {
            'content-type': 'application/xml',
        },
    })
}
