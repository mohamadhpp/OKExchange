<script setup lang="ts">

import { defineEmits, defineProps } from "vue";

//#region Emit

const emit = defineEmits<{
    (e: 'open-market-drawer'): void
}>();

//#endregion

//#region Props

const props = defineProps(
{
    ticker:
    {
        type: Number,
        required: true
    }
});

//#endregion

</script>

<template>

    <button type="button"
            class="lg:w-auto w-full flex flex-row-reverse items-center justify-between p-5 rounded-xl gap-10 bg-gray-100"
    >
        <span class="flex flex-row-reverse items-center gap-2">
            <img :src="useDynamicallyAssets(`/assets/icons/coins/${ticker.icon}.png`)"
                 :alt="ticker.symbol"
                 :title="ticker.symbol"
                 class="w-9 rounded-full"
                 v-if="ticker !== null"
            />

            <span class="mt-1 text-sm">
                {{ ticker === null ? '---' : ticker.symbol }}
            </span>
        </span>

        <span class="block flex flex-row-reverse items-center gap-2 font-yekanbakh">
            <span class="py-1 px-3 text-center rounded-lg"
                  dir="ltr"
                  :class="ticker === null ? '' : (ticker.percentage_change < 0 ? 'bg-red-200' : 'bg-green-200')"
            >
                {{ ticker === null ? '--.--' : ticker.percentage_change }}%
            </span>

            <button type="button" @click="emit('open-market-drawer')">
                <svg viewBox="0 0 24 24" class="stroke-current text-primary w-5 rtl:rotate-[270deg] lg:hidden">
                    <g data-name="vuesax/linear/arrow-left" transform="translate(-364 -252)">
                        <g>
                            <path d="M7.1,15.84.577,9.32a1.986,1.986,0,0,1,0-2.8L7.1,0" transform="translate(371.902 256.08)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                            <path data-name="Vector" d="M0,0H24V24H0Z" transform="translate(388 276) rotate(180)" fill="none" opacity="0"></path>
                        </g>
                    </g>
                </svg>
            </button>
        </span>
    </button>

</template>