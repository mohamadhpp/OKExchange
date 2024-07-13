<script setup lang="ts">

import { ref, watch } from 'vue';

//#region Fetch Data

import type TResponse from '~/entities/TResponse';
import type FaqEntity from '~/entities/faq/FaqEntity';

const { $services } = useNuxtApp();

let faqs: TResponse<FaqEntity> = ref(null);

$services.faq.get().then((response: TResponse<FaqEntity>) =>
{
    for (let faq of response.data)
    {
        faq.visibility = true;

        for (let children of faq.children)
        {
            children.visibility = true;

            for (let row of children.rows)
            {
                row.visibility = true;
            }
        }
    }

    faqs.value = { ...response };
})
.catch((error: TResponse<FaqEntity>) =>
{
    mainFaqs.value = { ...error };
    faqs.value = { ...error };
});

//#endregion

//#region Search Faq

const searchField = ref(null);

const SearchFaq = () =>
{
    // Faqs is not valid
    if(!faqs.value || faqs.value.status === false || faqs.value.data.length == 0)
    {
        return;
    }

    let search = searchField.value.value;

    for(let faq of faqs.value.data)
    {
        for(let children of faq.children)
        {
            for(let row of children.rows)
            {
                if(search.trim().length > 0)
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

//#region Define Page

useHead({
    title: 'سوالات متداول | اوکی اکسچنج'
});

import { useScriptTag } from '@vueuse/core'
import { onUnmounted } from "vue";

const { scriptTag, load, unload } = useScriptTag(
'/material/scripts/collapse.js',
() => { },
{ manual: true }
);

watch(faqs, async (newVal, oldVal) =>
{
    if(!oldVal)
    {
        await load();
    }
});

onUnmounted(async () =>
{
    await unload();
})

//#endregion

</script>

<template>

    <section class="w-full flex flex-col p-5 pt-10 pb-32 gap-7 font-yekanbakh">
        <div class="flex flex-row-reverse items-center text-2xl font-semibold">
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
                       class="block w-full p-4 py-5 ps-10 text-lg text-gray-900 rounded-md outline-none border-none ring-none bg-gray-50"
                       dir="rtl"
                       placeholder="جستجو ( اوکی اکسچنج چیست؟ )"
                       ref="searchField"
                       @keyup="SearchFaq"
                />
            </div>
        </div>

        <hr />

        <div v-show="faqs && (faqs.data.length === 0 || faqs.data.filter(faq => faq.visibility).length === 0)" class="w-full h-full flex flex-col items-center justify-center">
            <div class="p-7 rounded-lg bg-gray-100">
                <p dir="rtl">
                    موردی جهت نمایش یافت نشد!
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
                    مشکلی در فرآیند نمایش اطلاعات بوجود آمده است!
                </p>
            </div>
        </div>

        <div v-else-if="faqs && faqs.status" class="w-full flex flex-col gap-5">
            <div v-for="faq in faqs.data" v-show="faq.visibility" class="w-full flex flex-col gap-4">
                <div class="flex flex-row-reverse items-center gap-3">
                    <img src="~/assets/icons/okex.svg"
                         class="w-7 h-auto"
                         :alt="faq.category"
                         :title="faq.category"
                    />

                    <h2 class="text-3xl font-bold">
                        {{ faq.category }}
                    </h2>
                </div>

                <div v-for="children in faq.children" v-show="children.visibility" class="flex flex-col py-3 px-5 gap-5">
                    <div class="flex flex-row-reverse items-center gap-2">
                        <span class="font-bold text-3xl text-gray-300">
                            -
                        </span>

                        <h3 class="text-2xl font-semibold">
                            {{ children.category }}
                        </h3>
                    </div>

                    <div dir="rtl" class="flex flex-col">
                        <div v-for="row in children.rows" v-show="row.visibility" class="relative">
                            <h4 class="mb-0 bg-gray-100 border-b-2 border-solid border-gray-50">
                                <button class="relative flex items-center w-full px-5 py-6 text-xl text-right transition-all ease-in cursor-pointer rounded-t-1 group text-primary"
                                        :data-collapse-target="`collapse-${row._id}`"
                                >
                                    <span>
                                        {{ row.question }}
                                    </span>

                                    <span class="absolute left-5 pt-1 text-base transition-transform duration-300 fa fa-chevron-down group-open:rotate-180">
                                        <svg class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                                        </svg>
                                    </span>
                                </button>
                            </h4>

                            <div :data-collapse="`collapse-${row._id}`" class="h-0 overflow-hidden transition-all duration-300 ease-in-out">
                                <p class="px-5 py-6 text-base leading-loose text-black">
                                    {{ row.answer }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>