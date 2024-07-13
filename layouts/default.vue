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

</script>

<template>

    <div class="w-screen h-screen fixed flex flex-col items-end">
        <layout-top-menu class="w-full" />

        <div class="w-full h-full flex flex-row-reverse items-center">
            <layout-aside-menu class="h-full" />

            <div class="w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar">
                <slot />
            </div>
        </div>
    </div>

</template>