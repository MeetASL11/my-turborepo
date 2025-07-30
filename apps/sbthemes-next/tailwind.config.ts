import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '1rem',
        },
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1472px',
        },
        fontFamily: {
            'plus-jakarata': ['Plus Jakarta Sans', 'sans-serif'],
        },
        colors: {
            currentColor: 'currentColor',
            transparent: 'transparent',
            primary: '#020617',
            secondary: '#008080',
            gray: {
                DEFAULT: '#566072',
                100: '#F7F9FC',
                200: '#F5F6FA',
                300: '#C1BCFE',
                400: '#D9D9D9',
            },
            black: '#000000',
            white: '#FFFFFF',
            border: '#E2E8F0',
            danger: '#ff4d4f',
            warning: '#ffc107',
            success: '#28a745',
            blue: '#0000EE',
        },
        extend: {
            borderRadius: {
                xl: '10px',
            },
            boxShadow: {
                '3xl': '0 0 0 1px rgba(18,43,105,0.08),0 1px 2px 0 rgba(18,43,105,0.08),0 2px 6px 0 rgba(18,43,105,0.04)',
            },
            typography: (theme: any) => ({
                lg: {
                    css: {
                        lineHeight: '30px',
                        h1: {
                            fontSize: '28px',
                            fontWeight: 600,
                        },
                        h2: {
                            fontSize: '24px',
                            fontWeight: 600,
                        },
                        li: {
                            margin: '0 0 4px 0 !important',
                        },
                    },
                },
                DEFAULT: {
                    css: {
                        '--tw-prose-bullets': theme('colors.primary'),
                        '--tw-prose-counters': theme('colors.primary'),
                        color: theme('colors.gray'),
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: 400,
                        a: {
                            color: theme('colors.secondary'),
                            textDecoration: 'none',
                            transitionDuration: '300ms',
                            fontWeight: 500,
                            '&:hover': {
                                opacity: 0.8,
                            },
                        },
                        blockquote: {
                            borderLeftWidth: '4px',
                            borderLeftColor: 'black',
                            fontStyle: 'italic',
                            backgroundColor: '#009c651f',
                            padding: '16px',
                        },
                        h1: {
                            color: theme('colors.primary'),
                            fontSize: '26px ',
                            fontWeight: 600,
                            margin: '24px 0 16px 0 !important',
                        },
                        h2: {
                            color: theme('colors.primary'),
                            fontSize: '22px',
                            fontWeight: 600,
                            margin: '24px 0 16px 0 !important',
                        },
                        h3: {
                            color: theme('colors.primary'),
                            fontSize: '20px',
                            fontWeight: 600,
                            margin: '0 0 16px 0 !important',
                        },
                        h4: {
                            color: theme('colors.primary'),
                            fontSize: '18px',
                            fontWeight: 600,
                            margin: '0 0 16px 0 !important',
                        },
                        h5: {
                            color: theme('colors.primary'),
                            fontSize: '16px',
                            fontWeight: 600,
                            lineHeight: '20px',
                            margin: '0 0 16px 0',
                        },
                        h6: {
                            color: theme('colors.primary'),
                            fontSize: '14px',
                            fontWeight: 500,
                            margin: '0 0 16px 0',
                        },
                        p: {
                            fontSize: '16px',
                            marginTop: '0px !important',
                        },
                        'ol > li::marker': {
                            fontWeight: '600',
                            fontSize: '18px',
                            color: 'var(--tw-prose-bullets)',
                        },
                        'ul > li::marker': {
                            color: theme('colors.gray'),
                            fontWeight: '600',
                        },
                        li: {
                            fontSize: '16px',
                            paddingLeft: '0px !important',
                            margin: '0 0 8px 0 !important',
                        },
                    },
                },
            }),
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('tailwindcss-animate'),
    ],
}
export default config
