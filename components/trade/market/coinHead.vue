<script setup lang="ts">

import { ref, defineEmits } from "vue";

//#region Emmit

const emit = defineEmits<
{
    (e: 'reinitialize-intersection-observer'): void
}>();

//#endregion

//#region Sort

import { useTickerStore } from '~/store/coin/ticker';

const sortType = ref("desc");

const SortTickers = () =>
{
    let { sort } = useTickerStore();

    sortType.value = (sortType.value === "desc" ? "asc" : "desc");
    sort(sortType.value);

    emit("reinitialize-intersection-observer");
}

//#endregion

</script>

<template>

    <tr>
        <th scope="col" class="px-3 py-3 text-center lg:hidden table-cell">
            <div class="flex flex-col items-center">
                <span class="lg:text-black text-gray-400">
                    قیمت
                </span>

                <span class="lg:hidden text-gray-400">
                    (USDT)
                </span>
            </div>
        </th>

        <th scope="col" class="py-3">
            <div class="flex items-center justify-center text-center">
                <button type="button"
                        @click="SortTickers"
                        class="flex items-center"
                >
                    <span class="flex flex-row items-center">
                        <span class="lg:text-black text-gray-400">
                            تغییر
                        </span>

                        <span class="lg:hidden text-gray-400">
                            24 ساعته
                        </span>
                    </span>

                    <svg class="w-3 h-3 ms-1.5 lg:block hidden" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                    </svg>
                </button>
            </div>
        </th>

        <th scope="col" class="px-3 py-3 text-center lg:table-cell hidden">
            <div class="flex flex-col items-center">
                <span class="lg:text-black text-gray-400">
                    قیمت
                </span>

                <span class="lg:hidden text-gray-400">
                    (USDT)
                </span>
            </div>
        </th>

        <th scope="col" class="px-3 py-3 text-left">
            <span class="lg:block hidden lg:text-black text-gray-400">
                نماد
            </span>

            <span class="lg:hidden text-gray-400">
                جفت
            </span>
        </th>
    </tr>

</template>