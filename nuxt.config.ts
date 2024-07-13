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
            SITE_API_BASE_URL: process.env.SITE_API_BASE_URL
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