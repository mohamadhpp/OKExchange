<script setup>

//#region Initialize flowbite

import { onMounted } from 'vue'
import { useFlowbite } from '~/composables/useFlowbite';

onMounted(() =>
{
    useFlowbite(() =>
    {
        initFlowbite();
    })
})

//#endregion

//#region Page content scroll

import { useScroll } from '@vueuse/core';

const content = ref(null);
const { y } = useScroll(content);

//#endregion

</script>

<template>

    <div class="w-screen h-screen fixed flex flex-col items-end">
        <layout-top-navigation-bar class="w-full transition-all duration-300 z-10"
                         :class="y > 50 ? 'shadow' : ''"
        />

        <div class="w-full h-full flex flex-row-reverse items-center">
            <layout-aside-navigation-bar class="h-full lg:block hidden" v-show="useRoute().name === 'support-faq'" />

            <div class="w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar" ref="content">
                <slot />
            </div>
        </div>
    </div>

</template>