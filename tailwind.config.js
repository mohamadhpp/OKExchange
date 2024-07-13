/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/html/utils/withMT";

export default withMT(
{
    content:
    [
        "./components/**/*.{js,vue,ts}",
        "./node_modules/flowbite/**/*.{js,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue"
    ],

    theme:
    {
        extend:
        {
            colors:
            {
                "primary": "rgb(90, 75, 210)",
                "primary-900": "rgb(90, 75, 210, 0.9)",
                "primary-800": "rgb(90, 75, 210, 0.8)",
                "primary-700": "rgb(90, 75, 210, 0.7)",
                "primary-600": "rgb(90, 75, 210, 0.6)",
                "primary-500": "rgb(90, 75, 210, 0.5)",
                "primary-400": "rgb(90, 75, 210, 0.4)",
                "primary-300": "rgb(90, 75, 210, 0.3)",
                "primary-200": "rgb(90, 75, 210, 0.2)",
                "primary-100": "rgb(90, 75, 210, 0.1)"
            }
        }
    },

    plugins:
    [
        require('flowbite/plugin')
    ]
});