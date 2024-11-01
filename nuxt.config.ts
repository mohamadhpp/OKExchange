// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools:
    {
        enabled: true
    },

    modules:
    [
        '@vueuse/nuxt',
        '@pinia/nuxt'
    ],

    nitro:
    {
        experimental:
        {
            websocket: true
        }
    },

    ssr: true,

    routeRules:
    {
        '/trade/*':
        {
            ssr: false
        }
    },

    runtimeConfig:
    {
        public:
        {
            siteApi: process.env.SITE_API_BASE_URL,
            marketApi: process.env.MARKET_API_BASE_URL,
            tickerWs: process.env.TICKER_WS_URL
        }
    },

    css:
    [
        '~/assets/fonts/font.css',
        '~/assets/css/main.css'
    ],

    postcss:
    {
        plugins:
        {
            tailwindcss: {},
            autoprefixer: {}
        }
    }
});