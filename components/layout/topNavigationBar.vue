<script setup lang="ts">

import { watch } from 'vue';

const route = useRoute();

//#region Mobile menu

import { useWindowSize } from '@vueuse/core';

const window = useWindowSize();
const menuIsOpen = ref(false);

// Resize window
watch(window.width, () => { menuIsOpen.value = false });
watch(window.height, () => { menuIsOpen.value = false });

const menuItems = [
    {
        url: '/',
        title: 'صفحه اصلی',
        icon: 'main.svg'
    },

    {
        url: '/',
        title: 'دانلود اپلیکیشن اوکی اکسچنج',
        icon: 'download.svg'
    },

    {
        url: '/trade/BTC_USDT',
        title: 'بازار حرفه‌ای',
        icon: 'professional-market.svg'
    },

    {
        url: '/',
        title: 'تبادل سریع',
        icon: 'fast-exchange.svg'
    },

    {
        url: '/',
        title: 'خرید فروش ارز دیجیتال',
        icon: 'buy-and-sell.svg'
    },

    {
        url: '/',
        title: 'تماس با ما',
        icon: 'contact-us.svg'
    },

    {
        url: '/',
        title: 'درباره ما',
        icon: 'about-us.svg'
    },

    {
        url: '/',
        title: 'کسب درآمد',
        icon: 'earn-money.svg'
    },

    {
        url: '/',
        title: 'کمیسیون',
        icon: 'commission.svg'
    },

    {
        url: '/',
        title: 'قوانین و مقررات',
        icon: 'terms-conditions.svg'
    },

    {
        url: '/support/faq',
        title: 'سوالات متداول',
        icon: 'about-us.svg'
    }
];

//#endregion

//#region Define Page

useScriptTag("/material/scripts/popover.js");

//#endregion

</script>


<template>

    <nav class="bg-white border-gray-200 font-yekanbakh">
        <div class="flex flex-row-reverse flex-wrap items-center justify-between py-3.5 sm:px-5 px-3">

            <div class="flex flex-row-reverse items-center xl:gap-4 gap-2 lg:order-2 order-3 rtl:space-x-reverse">
                <NuxtLink to="/" class="lg:block hidden py-2 px-3 xl:text-base text-sm text-gray-900 border-b border-gray-100 md:border-0 md:hover:text-primary-900">
                    ورود
                </NuxtLink>

                <NuxtLink to="/"
                          class="flex flex-row-reverse items-center xl:gap-2 gap-1 xl:p-1.5 lg:p-1 p-2 xl:ps-5 lg:ps-3 xl:text-base lg:text-xs text-sm lg:text-white text-primary lg:rounded-full rounded-lg lg:bg-primary lg:border-0 border-[1px] border-primary"
                >
                    <img src="~/assets/icons/menu/profile.svg"
                         class="xl:w-7 w-5 lg:block hidden"
                         title="ثبت نام"
                         alt="ثبت نام"
                    />

                    ثبت نام
                </NuxtLink>

                <NuxtLink to="/">
                    <img src="~/assets/icons/menu/download.webp"
                         class="xl:w-8 w-6 lg:block hidden"
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

                        <NuxtLink class="select-none rounded-lg border border-primary py-2 px-3 text-center align-middle text-base font-yekanbakh uppercase text-primary focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                  to="/"
                        >
                            دانلود اپلیکیشن
                        </NuxtLink>
                    </div>

                    <img src="~/assets/images/menu/qr-code-download.png"
                         alt="کیو آر کد دانلود اپلیکیشن"
                         title="کیو آر کد دانلود اپلیکیشن"
                         class="h-full"
                    />
                </div>
            </div>

            <div id="mega-menu" dir="rtl" class="flex items-center justify-between w-auto xl:gap-8 gap-5 lg:order-1 order-2">
                <NuxtLink to="/" class="flex items-center">
                    <img src="~/assets/logo/okex.png" class="xl:h-8 lg:h-7 sm:h-8 h-7" alt="اوکی اکسچنج" title="اوکی اکسچنج" />
                </NuxtLink>

                <ul class="lg:flex hidden flex-col font-medium md:flex-row xl:space-x-6 space-x-4 rtl:space-x-reverse xl:text-base text-sm">
                    <li>
                        <NuxtLink to="/trade/BTC_USDT"
                                  class="block py-2 xl:px-3 border-b border-gray-100 md:border-0 md:p-0"
                                  :class="route.name === 'trade-symbol' ? 'text-primary-900' : 'text-gray-900 md:hover:text-primary-900'"
                                  aria-current="page"
                        >
                            بازار حرفه‌ای
                        </NuxtLink>
                    </li>

                    <li>
                        <NuxtLink to="/" class="block py-2 xl:px-3 text-gray-900 border-b border-gray-100 md:border-0 md:hover:text-primary-900 md:p-0" aria-current="page">
                            تبادل سریع
                        </NuxtLink>
                    </li>

                    <li>
                        <button class="flex items-center justify-between w-full py-2 xl:px-3 font-medium text-gray-900 md:p-0">
                            خرید و فروش ارز دیجیتال

                            <svg class="w-2.5 h-2.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </button>
                    </li>

                    <li>
                        <NuxtLink to="/" class="block py-2 xl:px-3 text-gray-900 border-b border-gray-100 md:border-0 md:hover:text-primary-900 md:p-0" aria-current="page">
                            تماس باما
                        </NuxtLink>
                    </li>

                    <li>
                        <NuxtLink to="/" class="block py-2 xl:px-3 text-gray-900 border-b border-gray-100 md:border-0 md:hover:text-primary-900 md:p-0" aria-current="page">
                            درباره ما
                        </NuxtLink>
                    </li>

                    <li>
                        <NuxtLink to="/support/faq"
                                  class="block py-2 xl:px-3 border-b border-gray-100 md:border-0  md:p-0 text-gray-900 md:hover:text-primary-900"
                                  aria-current="page"
                        >
                            سوالات متداول
                        </NuxtLink>
                    </li>
                </ul>
            </div>

            <button type="button" class="lg:hidden order-1">
                <img src="~/assets/icons/menu/bar.svg"
                     class="h-5"
                     alt="منو"
                     @click="menuIsOpen = true"
                />
            </button>
        </div>

        <div class="top-0 left-0 w-screen h-screen z-20 bg-white flex flex-col items-center p-5 gap-4 overflow-y-auto overflow-x-hidden no-scrollbar"
             :class="menuIsOpen ? 'fixed' : 'hidden'"
        >
            <div class="w-full flex flex-row-reverse items-center justify-between mb-5">
                <button type="button"
                        class="bg-gray-100 rounded-md"
                        @click="menuIsOpen = false"
                >
                    <img src="~/assets/icons/menu/close.svg"
                         class="w-10"
                         alt="بستن"
                    />
                </button>

                <div class="flex flex-row-reverse gap-14 items-center">
                    <NuxtLink to="/" >
                        ورود
                    </NuxtLink>

                    <NuxtLink to="/"
                              class="bg-primary rounded-xl text-white py-3 px-5"
                    >
                        ثبت نام
                    </NuxtLink>
                </div>
            </div>

            <NuxtLink class="w-full bg-gray-100 py-5 sm:px-4 px-3 rounded-xl flex flex-row-reverse items-center justify-between"
                      v-for="item in menuItems"
                      :to="item.url"
                      @click="menuIsOpen = false"
            >
                <span class="flex items-center sm:gap-3 gap-1">
                    <span class="sm:text-base text-sm">
                        {{ item.title }}
                    </span>

                    <img :src="useDynamicallyAssets(`/assets/icons/menu/${item.icon}`)"
                         class="w-6"
                         :alt="item.title"
                    />
                </span>

                <svg viewBox="0 0 24 24" class="stroke-current text-primary w-5">
                    <g data-name="vuesax/linear/arrow-left" transform="translate(-364 -252)">
                        <g>
                            <path d="M7.1,15.84.577,9.32a1.986,1.986,0,0,1,0-2.8L7.1,0" transform="translate(371.902 256.08)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                            <path data-name="Vector" d="M0,0H24V24H0Z" transform="translate(388 276) rotate(180)" fill="none" opacity="0"></path>
                        </g>
                    </g>
                </svg>
            </NuxtLink>
        </div>
    </nav>

</template>

<style scoped>

#popover-download
{
    transform: translate(15px, 65px) !important;
}

</style>