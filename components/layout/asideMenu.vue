<template>

    <div class="border-l-4 border-gray-100 mt-3 transition-all duration-700 ease"
         :class="isOpen ? 'min-w-96' : 'min-w-5'"
    >
        <ul class="relative"
            :class="isOpen ? 'p-8' : 'p-4'"
        >
            <li dir="rtl"
                class="absolute"
                :class="isOpen ? '' : 'right-3'"
            >
                <button type="button"
                        class="flex flex-col items-center p-2 rounded-md w-12 h-12 overflow-hidden z-[2]"
                        @click="isOpen = !isOpen"
                >
                    <img src="~/assets/icons/aside-menu/close-menu.svg"
                         :class="isOpen ? '' : 'opacity-0 order-last'"
                         class="w-8 h-8 transition-all duration-700 ease"
                         alt="بستن منو"
                         title="بستن منو"
                    />

                    <img src="~/assets/icons/aside-menu/open-menu.svg"
                         :class="isOpen ? 'opacity-0 order-last' : ''"
                         class="w-8 h-8 transition-all duration-700 ease"
                         alt="بازکردن منو"
                         title="بازکردن منو"
                    />
                </button>
            </li>

            <li v-for="item in items"
                class="p-2 z-[1]"
                :class="isOpen ? 'mb-6' : 'translate-y-16 transition-all duration-700 ease mb-0'"
            >
                <NuxtLink to="/"
                          class="flex flex-row-reverse items-center"
                          :class="isOpen ? 'gap-5' : 'gap-0'"
                >
                    <img :src="useDynamicallyAssets(`/assets/icons/aside-menu/${item.icon}`)"
                         :alt="item.text"
                         :class="item.text"
                         class="w-8"
                    />

                    <p class="font-yekanbakh text-xl md:hover:text-primary-900 transition-all duration-200 ease"
                       :class="isOpen ? '' : 'opacity-0 w-0'"
                    >
                        {{item.text}}
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
                    text: "جوایز"
                },

                {
                    icon: "professional-market.svg",
                    url: "/",
                    text: "بازار حرفه‌ای"
                },

                {
                    icon: "fast-exchange.svg",
                    url: "/",
                    text: "تبادل سریع"
                },

                {
                    icon: "contact-us.svg",
                    url: "/",
                    text: "تماس باما"
                },

                {
                    icon: "commission.svg",
                    url: "/",
                    text: "کمیسیون"
                },

                {
                    icon: "terms-conditions.svg",
                    url: "/",
                    text: "قوانین و مقررات"
                }
            ]
        }
    }
}

</script>