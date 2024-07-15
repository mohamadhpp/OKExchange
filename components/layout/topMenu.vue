<script setup lang="ts">

//#region Define Page

useScriptTag("/material/scripts/popover.js")

//#endregion

</script>


<template>

    <nav class="bg-white border-gray-200 font-yekanbakh">
        <div class="flex flex-row-reverse flex-wrap items-center justify-between py-3.5 px-5">

            <div class="flex flex-row-reverse items-center gap-4 md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
                <NuxtLink to="/" class="block py-2 px-3 text-gray-900 border-b border-gray-100 md:border-0 md:hover:text-primary-900 md:p-0">
                    ورود
                </NuxtLink>

                <NuxtLink to="/" class="block flex flex-row-reverse items-center gap-3 p-1.5 ps-9 rounded-full text-white bg-primary">
                    <img src="~/assets/icons/top-menu/profile.svg"
                         class="w-8"
                         title="ثبت نام"
                         alt="ثبت نام"
                    />

                    ثبت نام
                </NuxtLink>

                <NuxtLink to="/">
                    <img src="~/assets/icons/top-menu/download.webp"
                         class="w-9"
                         data-popover-target="popover-download"
                         alt="دانلود اپلیکیشن"
                         title="دانلود اپلیکیشن"
                    />
                </NuxtLink>

                <div class="absolute invisible z-[999] flex w-[400px] px-4 flex-row-reverse items-center gap-2 overflow-hidden whitespace-normal break-words rounded-xl border border-blue-gray-50 bg-white p-0 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
                     aria-labelledby=":r3a:-label"
                     data-popover-placement="bottom-end"
                     aria-describedby="popover-download"
                     id="popover-download"
                     data-popover-mount="opacity-100"
                     data-popover-unmount="opacity-0"
                     data-popover-transition="transition-opacity ease-in-out duration-300"
                     data-popover="popover-download"
                     role="dialog"
                >
                    <div class="w-full p-4 pe-1 flex flex-col items-end gap-3 leading-7">
                        <p dir="rtl" class="block text-md antialiased font-yekanbakh text-right text-blue-gray-900">
                            برای دانلود مستقیم اپلیکیشن
                            <span class="text-primary">
                            کیو آر کد
                        </span>
                            مقابل را اسکن کنید.
                        </p>

                        <NuxtLink class="select-none rounded-lg border border-primary py-2 px-3 text-center align-middle text-base font-yekanbakh uppercase text-primary transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                  to="/"
                        >
                            دانلود اپلیکیشن
                        </NuxtLink>
                    </div>

                    <img src="~/assets/images/qr-code-download.png"
                         alt="کیو آر کد دانلود اپلیکیشن"
                         title="کیو آر کد دانلود اپلیکیشن"
                         class="h-full"
                    />
                </div>
            </div>

            <div id="mega-menu" dir="rtl" class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 gap-16">
                <NuxtLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="~/assets/logo/okex.png" class="h-9" alt="اوکی اکسچنج" title="اوکی اکسچنج" />
                </NuxtLink>

                <ul class="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                    <li>
                        <NuxtLink to="/" class="block py-2 px-3 text-gray-900 border-b border-gray-100 md:border-0 md:hover:text-primary-900 md:p-0" aria-current="page">
                            بازار حرفه‌ای
                        </NuxtLink>
                    </li>

                    <li>
                        <NuxtLink to="/" class="block py-2 px-3 text-gray-900 border-b border-gray-100 md:border-0 md:hover:text-primary-900 md:p-0" aria-current="page">
                            تبادل سریع
                        </NuxtLink>
                    </li>

                    <li>
                        <button id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" class="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 md:w-auto md:border-0 md:hover:text-primary-900 md:p-0">
                            خرید و فروش ارز دیجیتال

                            <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </button>

                        <div id="mega-menu-dropdown" class="absolute z-10 grid hidden w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md">
                            <div class="p-4 pb-0 text-gray-900 md:pb-4">
                                <ul class="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                                    <li>
                                        <a href="#" class="text-gray-500">
                                            About Us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="text-gray-500">
                                            Library
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="text-gray-500">
                                            Resources
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="text-gray-500">
                                            Pro Version
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="p-4 pb-0 text-gray-900 md:pb-4">
                                <ul class="space-y-4">
                                    <li>
                                        <a href="#" class="text-gray-500">
                                            Blog
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="text-gray-500">
                                            Newsletter
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="text-gray-500">
                                            Playground
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="text-gray-500">
                                            License
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="p-4">
                                <ul class="space-y-4">
                                    <li>
                                        <a href="#" class="text-gray-500">
                                            Contact Us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="text-gray-500">
                                            Support Center
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="text-gray-500">
                                            Terms
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>

                    <li>
                        <NuxtLink to="/" class="block py-2 px-3 text-gray-900 border-b border-gray-100 md:border-0 md:hover:text-primary-900 md:p-0" aria-current="page">
                            تماس باما
                        </NuxtLink>
                    </li>

                    <li>
                        <NuxtLink to="/" class="block py-2 px-3 text-gray-900 border-b border-gray-100 md:border-0 md:hover:text-primary-900 md:p-0" aria-current="page">
                            درباره ما
                        </NuxtLink>
                    </li>

                    <li>
                        <NuxtLink to="/faq" class="block py-2 px-3 text-gray-900 border-b border-gray-100 md:border-0 md:hover:text-primary-900 md:p-0" aria-current="page">
                            سوالات متداول
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

</template>

<style scoped>

#popover-download
{
    transform: translate(15px, 65px) !important;
}

</style>