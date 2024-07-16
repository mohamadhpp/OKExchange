<script setup lang="ts">

import { ref, watch, onUnmounted } from 'vue';

//#region Tickers Store

import {useTickerStore} from '~/store/coin/ticker';
import type TResponse from '~/entities/TResponse';
import type MarketTicker from '~/entities/coin/MarketTicker';
import {useSymbolStore} from '~/store/coin/symbol';

const { tickers } = storeToRefs(useTickerStore());

//#endregion

//#region Fetch Data

const { $services } = useNuxtApp();

let coins: TResponse<MarketTicker> = ref(null);

$services.coin.get().then((response: TResponse<MarketTicker>) =>
{
    $services.coin.openWebSocket();
    coins.value = { ...response };
})
.catch((error: TResponse<MarketTicker>) =>
{
    coins.value = { ...error };
});

//#endregion

//#region Sort

const sortType = ref("desc");

const SortTickers = () =>
{
    sortType.value = (sortType.value === "desc" ? "asc" : "desc");
    useTickerStore().sort(sortType.value);

    reinitializeIntersectionObserver();
}

//#endregion

//#region Search

const searchField = ref(null);

const SearchCoin = () =>
{
    // Faqs is not valid
    if(!coins.value || coins.value.status === false || tickers.value.length == 0)
    {
        return;
    }

    let search = searchField.value.value.toUpperCase();
    useTickerStore().search(search, tabIndex.value);
}

//#endregion

//#region Favorite

const { favorites } = storeToRefs(useSymbolStore());
const { addFavorite, deleteFavorite, getFavorites } = useSymbolStore();

const ToggleFavorite = (instId: string) =>
{
    let index = favorites.value.indexOf(instId);

    if(index === -1)
    {
        addFavorite(instId);
    }
    else
    {
        deleteFavorite(instId);

        if(tabIndex.value === 3)
        {
            SearchCoin();
        }
    }
}

//#endregion

//#region Intersection Observer

import { useIntersectionObserver } from '@vueuse/core';

const stopObservers = ref([]);
const targetSymbols = ref([]);
const targetIsVisibleSymbols = ref([]);

watch(targetSymbols.value, () =>
{
    initializeIntersectionObserver();
});

const initializeIntersectionObserver = () =>
{
    targetIsVisibleSymbols.value = Array(tickers.value.length).fill(false);

    for (let i = 0; i < tickers.value.length; i++)
    {
        const { stop } = useIntersectionObserver(targetSymbols.value[i],
        ([{ isIntersecting }]: any) =>
        {
            targetIsVisibleSymbols.value[i] = isIntersecting;
            handleSubscribeList();
        });

        stopObservers.value.push(stop);
    }
}

const reinitializeIntersectionObserver = () =>
{
    stopObservers.value.forEach((stop: any) => stop());
    $services.coin.unsubscribeAll();

    targetIsVisibleSymbols.value = [];
    stopObservers.value = [];

    initializeIntersectionObserver();
}

const handleSubscribeList = () =>
{
    targetIsVisibleSymbols.value.forEach((status: boolean, index: number) =>
    {
        if(status)
        {
            $services.coin.subscribe(tickers.value[index].instId);
        }
        else
        {
            $services.coin.unsubscribe(tickers.value[index].instId);
        }
    });
}

//#endregion

//#region Tab

const tabIndex = ref(0);

const changeTabIndex = (tab_index: number) =>
{
    tabIndex.value = tab_index;
    SearchCoin();
}

//#endregion

onUnmounted(() =>
{
    stopObservers.value.forEach((stop: any) => stop());
    $services.coin.unsubscribeAll();

    targetIsVisibleSymbols.value = [];
    targetSymbols.value = [];
    stopObservers.value = [];

    $services.coin.closeWebSocket();
});

</script>

<template>

    <div class="w-[450px] h-full flex flex-col font-yekanbakh border-l-4 border-gray-100">
        <div class="w-full flex items-center justify-between p-3">
            <h1 class="text-md">
                لیست رمز ارزها
            </h1>

            <div dir="rtl">
                <div class="relative w-full min-w-[200px] h-10">
                    <div class="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 left-3 -translate-y-2/4">
                        <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>

                    <input class="peer w-full h-full bg-transparent text-blue-gray-700 font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-primary-900"
                           placeholder="جستجو"
                           ref="searchField"
                           @keyup="SearchCoin"
                    />
                </div>
            </div>
        </div>

        <div class="w-full h-full px-2 pb-[200px]">
            <div class="mb-3 border-b border-gray-200">
                <ul class="flex flex-wrap -mb-px text-sm font-medium text-center">
                    <li class="w-1/4">
                        <button class="inline-block p-4 border-b-2 rounded-t-lg"
                                :class="tabIndex === 0 ? 'border-blue-400' : 'hover:border-gray-300'"
                                @click="changeTabIndex(0)"
                                type="button"
                        >
                            همه
                        </button>
                    </li>

                    <li class="w-1/4">
                        <button class="inline-block p-4 border-b-2 rounded-t-lg"
                                :class="tabIndex === 1 ? 'border-blue-400' : 'hover:border-gray-300 hover:text-gray-600'"
                                @click="changeTabIndex(1)"
                                type="button"
                        >
                            بازار تتر
                        </button>
                    </li>

                    <li class="w-1/4">
                        <button class="inline-block p-4 border-b-2 rounded-t-lg"
                                :class="tabIndex === 2 ? 'border-blue-400' : 'hover:border-gray-300 hover:text-gray-600'"
                                @click="changeTabIndex(2)"
                                type="button"
                        >
                            بازار تومان
                        </button>
                    </li>

                    <li class="w-1/4">
                        <button class="inline-block p-4 border-b-2 rounded-t-lg"
                                :class="tabIndex === 3 ? 'border-blue-400' : 'hover:border-gray-300 hover:text-gray-600'"
                                @click="changeTabIndex(3)"
                                type="button"
                        >
                            مورد علاقه
                        </button>
                    </li>
                </ul>
            </div>

            <div class="w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar">
                <div class="w-full h-full relative">
                    <table class="w-full text-sm text-right text-gray-500">
                        <thead class="sticky top-0 bg-white text-md text-gray-700 border-b-2 border-gray-50 shadow-sm">
                            <tr>
                                <th scope="col" class="px-2 py-3">
                                    <div class="flex items-center">
                                        تغییر

                                        <button type="button"
                                                @click="SortTickers"
                                        >
                                            <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </th>

                                <th scope="col" class="px-3 py-3">
                                    قیمت
                                </th>

                                <th scope="col" class="px-3 py-3 text-left">
                                    نماد
                                </th>
                            </tr>
                        </thead>

                        <tbody v-show="!coins">
                            <tr dir="rtl">
                                <td colspan="3" class="py-7 font-normal text-center">
                                    در حال دریافت اطلاعات...
                                </td>
                            </tr>
                        </tbody>

                        <tbody v-show="coins && coins.data && (coins.data.tickers.length === 0 || coins.data.tickers.filter(coin => coin.visibility).length === 0)">
                            <tr dir="rtl">
                                <td colspan="3" class="py-7 font-normal text-center">
                                    موردی یافت نشد!
                                </td>
                            </tr>
                        </tbody>

                        <tbody v-if="coins" class="text-right">
                            <tr v-for="coin in tickers"
                                ref="targetSymbols"
                                v-show="coin.visibility"
                                class="bg-white"
                            >
                                <td dir="ltr"
                                    class="px-2 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    :class="coin.percentage_change < 0 ? 'text-red-700' : 'text-green-700'"
                                >
                                    {{ coin.percentage_change }}%
                                </td>

                                <td class="px-3 py-4">
                                    {{ coin.last_str }}
                                </td>

                                <td class="px-3 py-4 text-left flex flex-row-reverse items-center gap-2"
                                    :title="coin.instId !== 'USDT-IRT' ? 'معادل تومانی: ' + coin.toman : ''"
                                >
                                    <button type="button"
                                            @click="ToggleFavorite(coin.instId)"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             width="24"
                                             height="24"
                                             viewBox="0 0 24 24"
                                             class="fill-current w-4 cursor-pointer text-gray-300 transition-colors duration-200 ease-in-out"
                                             :class="favorites.indexOf(coin.instId) !== -1 ? 'text-yellow-300' : ''"
                                        >
                                            <path d="M11.729,1.433l1.76,3.52A2.173,2.173,0,0,0,14.909,6l3.19.53c2.04.34,2.52,1.82,1.05,3.28l-2.48,2.48a2.171,2.171,0,0,0-.52,1.81l.71,3.07c.56,2.43-.73,3.37-2.88,2.1l-2.99-1.77a2.162,2.162,0,0,0-1.98,0l-2.99,1.77c-2.14,1.27-3.44.32-2.88-2.1l.71-3.07a2.171,2.171,0,0,0-.52-1.81L.849,9.813c-1.46-1.46-.99-2.94,1.05-3.28L5.089,6A2.178,2.178,0,0,0,6.5,4.953l1.76-3.52C9.219-.477,10.779-.477,11.729,1.433Z" transform="translate(2.001 2.077)"></path>
                                            <path data-name="Vector" d="M0,0H24V24H0Z" opacity="0"></path>
                                        </svg>
                                    </button>

                                    <img :src="useDynamicallyAssets(`/assets/icons/coins/${coin.symbol_icon}.png`)"
                                         :alt="coin.symbol"
                                         :class="coin.symbol"
                                         class="w-6 rounded-full"
                                    />

                                    <span class="mt-1">
                                        {{ coin.symbol }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</template>