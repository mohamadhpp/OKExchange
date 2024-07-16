<script setup lang="ts">

import { ref, watch, onUnmounted, onMounted } from 'vue';

//#region Fetch Data

import type TResponse from '~/entities/TResponse';
import type FaqEntity from '~/entities/faq/FaqEntity';

const { $services } = useNuxtApp();

let faqs: TResponse<Array<FaqEntity>> = ref(null);

$services.faq.get().then((response: TResponse<Array<FaqEntity>>) =>
{
    faqs.value = { ...response };
})
.catch((error: TResponse<Array<FaqEntity>>) =>
{
    faqs.value = { ...error };
});

//#endregion

//#region Search

const searchField = ref(null);

const SearchFaq = () =>
{
    // Faqs is not valid
    if(!faqs.value || faqs.value.status === false || faqs.value.data.length == 0)
    {
        return;
    }

    let search = searchField.value.value;
    let search_str_len = search.trim().length;

    for(let faq of faqs.value.data)
    {
        for(let children of faq.children)
        {
            for(let row of children.rows)
            {
                if(search_str_len > 0)
                {
                    row.visibility = (row.question.includes(search) || row.answer.includes(search));
                }
                else
                {
                    row.visibility = true;
                }
            }

            children.visibility = children.rows.filter(row => row.visibility).length > 0;
        }

        faq.visibility = faq.children.filter(children => children.visibility).length > 0;
    }
}

//#endregion

//#region Mobile size

import { useWindowSize } from '@vueuse/core';

const window = useWindowSize();
const currentTab = ref(0);
const lastCurrentTab = ref(1);

watch(currentTab, (newCurrentTab: number) =>
{
    if(newCurrentTab !== 0)
    {
        lastCurrentTab.value = newCurrentTab;
    }
});

// Resize window
watch(window.width, (newWidth:number) =>
{
    setCurrentTab(newWidth);
});

const setCurrentTab = (width: number) =>
{
    if(width >= 1024)
    {
        currentTab.value = 0;
    }
    else
    {
        currentTab.value = lastCurrentTab.value;
    }
}

onMounted(() =>
{
    setCurrentTab(window.width.value);
});

//#endregion

//#region Define Page

useHead({
    title: 'سوالات متداول | اوکی اکسچنج'
});

import { useScriptTag } from '@vueuse/core';

const tabScript = useScriptTag(
'/material/scripts/tabs.js',
() => { },
{ manual: true }
);

const collapseScript = useScriptTag(
'/material/scripts/collapse.js',
() => { },
{ manual: true }
);

watch(faqs, async (newVal, oldVal) =>
{
    if(!oldVal)
    {
        await collapseScript.load();
        await tabScript.load();
    }
});

onUnmounted(async () =>
{
    await collapseScript.unload();
    await tabScript.unload();
})

//#endregion

</script>

<template>

    <section class="w-full flex flex-col p-5 pb-32 gap-7 font-yekanbakh">
        <div class="relative lg:hidden">
            <img src="~/assets/images/faq/header.png"
                 class="rounded-xl w-full"
                 alt="سوالات متداول"
            />

            <div class="absolute top-[50%] translate-y-[-50%] w-full flex flex-col items-center md:gap-5 gap-3">
                <img src="~/assets/images/faq/question-symbol.svg"
                     alt="سوالات متداول"
                     class="md:w-32 sm:w-20 w-14"
                />

                <h1 class="text-white z-[4] md:text-2xl sm:text-lg text-base font-bold">
                    سوالات متداول
                </h1>
            </div>
        </div>

        <div class="flex-row-reverse items-center md:text-2xl sm:text-xl text-lg font-semibold lg:pt-10 lg:flex hidden">
            <p>
                جستجوی پیشرفته
            </p>
            &nbsp;
            <h1>
                سوالات متداول
            </h1>
        </div>

        <div class="w-full">
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">
                جستجو
            </label>

            <div class="relative" dir="rtl">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none opacity-50">
                    <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>

                <input type="text"
                       class="block w-full p-4 py-5 ps-10 md:text-lg sm:text-base text-sm text-gray-900 rounded-md outline-none border-none ring-none bg-gray-50"
                       dir="rtl"
                       placeholder="جستجو ( اوکی اکسچنج چیست؟ )"
                       ref="searchField"
                       @keyup="SearchFaq"
                />
            </div>
        </div>

        <hr />

        <div v-if="faqs && faqs.status" class="lg:hidden w-full">
            <div class="relative right-0">
                <ul id="faq-categories" class="relative flex items-center p-1 list-none rounded-lg bg-blue-gray-50/60" data-tabs="tabs" role="list">
                    <li class="z-[4] h-full text-center"
                        :class="`w-1/4`"
                        v-for="(faq, index) in faqs.data"
                    >
                        <a class="w-full h-full z-[4] flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit"
                           role="tab"
                           data-tab-target=""
                           :aria-selected="index === faqs.data.length - 1"
                           href="javascript:;"
                           @click="currentTab = faqs.data.length - index"
                        >
                            <span class="text-wrap text-sm leading-6">
                                {{ faqs.data[faqs.data.length - 1 - index].category }}
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div v-show="faqs && (faqs.data.length === 0 || faqs.data.filter((faq, index) => faq.visibility && (currentTab === 0 || currentTab === index + 1)).length === 0)"
             class="w-full h-full flex flex-col items-center justify-center"
        >
            <div class="p-7 rounded-lg bg-gray-100">
                <p dir="rtl">
                    موردی یافت نشد!
                </p>
            </div>
        </div>

        <div v-if="!faqs" class="w-full flex flex-col items-center justify-center">
            <div class="p-7 rounded-lg bg-gray-100">
                <p dir="rtl">
                    در حال دریافت اطلاعات ...
                </p>
            </div>
        </div>

        <div v-else-if="!faqs.status" class="w-full flex flex-col items-center justify-center">
            <div class="p-7 rounded-lg bg-gray-100">
                <p dir="rtl">
                    مشکلی در فرآیند دریافت اطلاعات بوجود آمده است!
                </p>
            </div>
        </div>

        <div v-else-if="faqs && faqs.status" class="w-full flex flex-col gap-5">
            <div v-for="(faq, index) in faqs.data" v-show="faq.visibility && (currentTab === 0 || currentTab === index + 1)" class="w-full flex flex-col gap-4">
                <faq-row :faq="faq" />
            </div>
        </div>
    </section>

</template>

<style scoped>

a
{
    transition: none !important;
}

ul#faq-categories > div[moving-tab] a
{
    background-color: white !important;
    color: white !important;
}

.fade-enter-active,
.fade-leave-active
{
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to
{
    opacity: 0;
}

</style>