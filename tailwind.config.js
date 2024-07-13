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
                primary: "rgb(90 75 210)"
            }
        }
    },

    plugins:
    [
        require('flowbite/plugin')
    ]
});