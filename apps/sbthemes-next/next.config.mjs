/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    async redirects() {
        return [
            {
                source: '/templates/html',
                destination: '/templates/html5',
                permanent: true,
            },
            {
                source: '/templates/tailwind',
                destination: '/templates/tailwind-css',
                permanent: true,
            },
            {
                source: '/templates/nuxtjs',
                destination: '/templates/nuxt',
                permanent: true,
            },
            {
                source: '/themes/konsole-gammer',
                destination: '/themes/konsole-gamer',
                permanent: true,
            },
        ]
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                    },
                ],
            },
        ]
    },
}

export default nextConfig
