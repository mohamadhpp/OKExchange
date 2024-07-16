<template>

    <div class="border-l-4 border-gray-100 mt-3 transition-all duration-500 ease-linear"
         :class="isOpen ? 'min-w-96' : 'min-w-5'"
    >
        <ul class="relative transition-all duration-500 ease-linear"
            :class="isOpen ? 'p-8' : 'p-4'"
        >
            <li dir="rtl"
                class="absolute transition-all duration-500 ease-linear"
            >
                <button type="button"
                        class="flex flex-col items-center p-2 rounded-md w-12 h-12 overflow-hidden z-[2]"
                        @click="isOpen = !isOpen"
                >
                    <img src="~/assets/icons/aside-menu/close-menu.svg"
                         :class="isOpen ? '' : 'opacity-0 order-last'"
                         class="w-8 h-8"
                         alt="بستن منو"
                         title="بستن منو"
                    />

                    <img src="~/assets/icons/aside-menu/open-menu.svg"
                         :class="isOpen ? 'opacity-0 order-last' : ''"
                         class="w-8 h-8"
                         alt="بازکردن منو"
                         title="بازکردن منو"
                    />
                </button>
            </li>

            <li v-for="item in items"
                class="p-2 z-[1] transition-all duration-500 ease-linear"
                :class="isOpen ? 'mb-6' : 'translate-y-16 mb-0'"
            >
                <NuxtLink :to="item.url"
                          class="flex flex-row-reverse items-center transition-all duration-500 ease-linear"
                          :class="isOpen ? 'gap-5' : 'gap-0'"
                >
                    <img :src="useDynamicallyAssets(`/assets/icons/aside-menu/${item.icon}`)"
                         :alt="item.title"
                         :title="item.title"
                         class="w-7"
                    />

                    <p class="font-yekanbakh text-lg md:hover:text-primary-900 transition-all ease-linear"
                       :class="isOpen ? 'delay-200 duration-300' : 'opacity-0 w-0'"
                    >
                        {{item.title}}
                    </p>
                </NuxtLink>
            </li>
        </ul>
    </div>

</template>

<script>

export default
{
    name: "asideMenu",

    data()
    {
        return {
            isOpen: true,

            items:
            [
                {
                    icon: "awards.svg",
                    url: "/",
                    title: "جوایز"
                },

                {
                    icon: "professional-market.svg",
                    url: "/",
                    title: "بازار حرفه‌ای"
                },

                {
                    icon: "fast-exchange.svg",
                    url: "/",
                    title: "تبادل سریع"
                },

                {
                    icon: "contact-us.svg",
                    url: "/",
                    title: "تماس باما"
                },

                {
                    icon: "commission.svg",
                    url: "/",
                    title: "کمیسیون"
                },

                {
                    icon: "terms-conditions.svg",
                    url: "/",
                    title: "قوانین و مقررات"
                }
            ]
        }
    }
}

</script>