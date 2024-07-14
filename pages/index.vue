<script setup lang="ts">

import {onBeforeUnmount, ref} from 'vue';

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
    coins.value = { ...response };
    createObserver();
})
.catch((error: TResponse<MarketTicker>) =>
{
    coins.value = { ...error };
});

//#endregion

//#region Sort By Last 24 Hour Change

const sortType = ref("desc");

const SortTickers = () =>
{
    sortType.value = (sortType.value === "desc" ? "asc" : "desc");
    useTickerStore().sort(sortType.value);
}

//#endregion

//#region Search Coin

const searchField = ref(null);

const SearchCoin = () =>
{
    // Faqs is not valid
    if(!coins.value || coins.value.status === false || data.value.tickers.length == 0)
    {
        return;
    }

    let search = searchField.value.value.toUpperCase();
    useTickerStore().search(search);
}

//#endregion

//#region Modify Favorite Symbol
const { favorites } = storeToRefs(useSymbolStore());
const { addFavorite, deleteFavorite, getFavorites } = useSymbolStore();

const ToggleFavorite = (symbol: string) =>
{
    let index = favorites.value.indexOf(symbol);

    if(index === -1)
    {
        addFavorite(symbol);
    }
    else
    {
        deleteFavorite(symbol);
    }
}

//#endregion

//#region Define Page

useHead({
    title: 'لیست رمز ارزها | اوکی اکسچنج'
});

//#endregion

//#region handle coin observer

//#endregion

</script>

<template>

    <section dir="rtl" class="w-full h-full flex items-center">
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

            <div class="w-full h-full px-2 pb-[150px]">
                <div class="mb-3 border-b border-gray-200">
                    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
                        <li class="me-2" role="presentation">
                            <button class="inline-block p-4 border-b-2 rounded-t-lg" id="all_coin-tab" data-tabs-target="#all-coin" type="button" role="tab" aria-controls="all-coin" aria-selected="false">
                                همه
                            </button>
                        </li>

                        <li class="me-2" role="presentation">
                            <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300" id="tether-market-tab" data-tabs-target="#tether-market" type="button" role="tab" aria-controls="tether-market" aria-selected="false">
                                بازار تتر
                            </button>
                        </li>

                        <li class="me-2" role="presentation">
                            <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300" id="toman-market-tab" data-tabs-target="#toman-market" type="button" role="tab" aria-controls="toman-market" aria-selected="false">
                                بازار تومان
                            </button>
                        </li>

                        <li role="presentation">
                            <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300" id="favorite-tab" data-tabs-target="#favorite" type="button" role="tab" aria-controls="favorite" aria-selected="false">
                                مورد علاقه
                            </button>
                        </li>
                    </ul>
                </div>

                <div id="default-tab-content" class="w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar">
                    <div class="hidden w-full h-full relative" id="all-coin" role="tabpanel" aria-labelledby="all-coin-tab">
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

                            <tbody v-show="coins && (coins.data.tickers.length === 0 || coins.data.tickers.filter(coin => coin.visibility).length === 0)">
                                <tr dir="rtl">
                                    <td colspan="3" class="py-7 font-normal text-center">
                                        موردی یافت نشد!
                                    </td>
                                </tr>
                            </tbody>

                            <tbody v-if="coins" class="text-right">
                                <tr v-for="(coin, index) in tickers"
                                    :key="index"
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
                                                @click="ToggleFavorite(coin.symbol)"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 width="24"
                                                 height="24"
                                                 viewBox="0 0 24 24"
                                                 class="fill-current w-4 cursor-pointer text-gray-300 transition-colors duration-200 ease-in-out"
                                                 :class="favorites.indexOf(coin.symbol) !== -1 ? 'text-yellow-300' : ''"
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

                    <div class="hidden w-full h-full" id="tether-market" role="tabpanel" aria-labelledby="tether-market-tab">

                    </div>

                    <div class="hidden w-full h-full" id="toman-market" role="tabpanel" aria-labelledby="toman-market-tab">

                    </div>

                    <div class="hidden w-full h-full" id="favorite" role="tabpanel" aria-labelledby="favorite-tab">

                    </div>
                </div>
            </div>
        </div>
    </section>

</template>