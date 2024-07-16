<script setup lang="ts">

import type { NuxtError } from '#app';

const props = defineProps({
    error: Object as () => NuxtError
})

useHead({
    title: 'اوکی اکسچنج'
});

</script>

<template>
    <div class="w-screen h-screen flex items-center justify-center">
        <div v-if="error.statusCode === 404"
             class="flex flex-col items-center font-yekanbakh"
        >
            <img :src="useDynamicallyAssets(`/assets/images/error/error-${error.statusCode}.svg`)"
                 :alt="'Error ' + error.statusCode"
                 :title="'Error ' + error.statusCode"
            />

            <h1 class="text-4xl font-bold text-primary-700 text-center" dir="rtl">
                صفحه موردنظر یافت نشد!
            </h1>

            <NuxtLink class="py-2.5 px-5 mt-10 text-lg font-semibold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                      to="/"
            >
                صفحه اصلی
            </NuxtLink>
        </div>

        <h1 v-else>
            {{error.statusCode}}
        </h1>
    </div>
</template>