<script setup lang="ts">

import { defineProps } from 'vue';

//#region Props

const props = defineProps(
{
    faq:
    {
        type: Object,
        required: true
    }
});

//#endregion

</script>

<template>

    <div class="lg:flex hidden flex-row-reverse items-center gap-3">
        <img src="~/assets/icons/okex.svg"
             class="w-7 h-auto"
             :alt="props.faq.category"
             :title="props.faq.category"
        />

        <h2 class="text-3xl font-bold">
            {{ props.faq.category }}
        </h2>
    </div>

    <div v-for="children in props.faq.children" v-show="children.visibility" class="flex flex-col py-3 sm:px-5 gap-5">
        <div class="flex flex-row-reverse items-center gap-2">
            <span class="font-bold text-3xl text-gray-300 lg:block hidden">
                -
            </span>

            <img src="~/assets/icons/okex.svg"
                 class="w-6 h-auto lg:hidden block"
                 :alt="props.faq.category"
                 :title="props.faq.category"
            />

            <h3 class="text-2xl font-semibold">
                {{ children.category }}
            </h3>
        </div>

        <div dir="rtl" class="flex flex-col">
            <div v-for="row in children.rows" v-show="row.visibility" class="relative">
                <h4 class="mb-0 bg-gray-100 border-b-2 border-solid border-gray-50">
                    <button class="relative flex items-center w-full px-5 py-6 text-right transition-all ease-in cursor-pointer rounded-t-1 group text-primary"
                            :data-collapse-target="`collapse-${row._id}`"
                    >
                        <span class="sm:text-xl text-base pe-6 leading-7">
                            {{ row.question }}
                        </span>

                        <span class="absolute left-5 pt-1 text-base transition-transform duration-300 fa fa-chevron-down group-open:rotate-180">
                            <svg class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                            </svg>
                        </span>
                    </button>
                </h4>

                <div :data-collapse="`collapse-${row._id}`"
                     class="h-0 overflow-hidden transition-all duration-300 ease-in-out"
                >
                    <p class="sm:px-5 sm:py-6 p-3 text-base leading-loose text-black">
                        {{ row.answer }}
                    </p>
                </div>
            </div>
        </div>
    </div>

</template>