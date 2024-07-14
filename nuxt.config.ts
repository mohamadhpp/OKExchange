// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools:
    {
        enabled: true
    },

    modules:
    [
        '@vueuse/nuxt',
        "@nuxt/content",
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
        '/':
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