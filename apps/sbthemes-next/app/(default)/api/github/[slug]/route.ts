// API get
export async function GET(request: Request, { params }: any) {
    try {
        if (params.slug !== 'jigs1996') {
            return new Response('User not found', { status: 404 })
        }
        return new Response(
            JSON.stringify({
                login: 'jigs1996',
                id: 28808327,
                node_id: 'MDQ6VXNlcjI4ODA4MzI3',
                avatar_url:
                    'https://avatars.githubusercontent.com/u/28808327?v=4',
                gravatar_id: '',
                url: 'https://api.github.com/users/jigs1996',
                html_url: 'https://github.com/jigs1996',
                followers_url:
                    'https://api.github.com/users/jigs1996/followers',
                following_url:
                    'https://api.github.com/users/jigs1996/following{/other_user}',
                gists_url:
                    'https://api.github.com/users/jigs1996/gists{/gist_id}',
                starred_url:
                    'https://api.github.com/users/jigs1996/starred{/owner}{/repo}',
                subscriptions_url:
                    'https://api.github.com/users/jigs1996/subscriptions',
                organizations_url: 'https://api.github.com/users/jigs1996/orgs',
                repos_url: 'https://api.github.com/users/jigs1996/repos',
                events_url:
                    'https://api.github.com/users/jigs1996/events{/privacy}',
                received_events_url:
                    'https://api.github.com/users/jigs1996/received_events',
                type: 'User',
                user_view_type: 'public',
                site_admin: false,
                name: 'Jignesh Sanghani',
                company: '@appstonelabgit',
                blog: 'https://jignesh.dev',
                location: 'India',
                email: null,
                hireable: true,
                bio: 'Full stack developer',
                twitter_username: 'jignesh19961020',
                public_repos: 17,
                public_gists: 3,
                followers: 10,
                following: 16,
                created_at: '2017-05-19T13:39:25Z',
                updated_at: '2025-02-12T12:43:37Z',
            }),
            {
                headers: { 'Content-Type': 'application/json' },
            },
        )
    } catch (error) {
        console.error('Error fetching URL:', error)
        return new Response('Error fetching URL', { status: 500 })
    }
}
