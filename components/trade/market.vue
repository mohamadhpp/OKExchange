<script setup lang="ts">

import { ref, defineEmits } from 'vue';

const coinRowRef = ref(null);

//#region Emit

const emit = defineEmits<{
    (e: 'select-symbol', selectedSymbol: string): void
}>();

//#endregion

//#region Tickers Store

import { useTickerStore } from '~/store/coin/ticker';
import type TResponse from '~/entities/TResponse';
import type MarketTicker from '~/entities/coin/MarketTicker';

const { tickers } = storeToRefs(useTickerStore());

//#endregion

//#region Fetch Data

const { $services } = useNuxtApp();

let coins: TResponse<MarketTicker> = ref(null);

$services.coin.get().then((response: TResponse<MarketTicker>) =>
{
    $services.coin.openWebSocket();
    coins.value = { ...response };

    emit('select-symbol', "");
})
.catch((error: TResponse<MarketTicker>) =>
{
    coins.value = { ...error };
});

//#endregion

//#region Search

const searchField = ref(null);

const searchCoin = () =>
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

//#region Tab

const tabIndex = ref(0);

const changeTabIndex = (tab_index: number) =>
{
    tabIndex.value = tab_index;
    searchCoin();
}

//#endregion

//#region Select

const selectSymbol = (selectedSymbol: string) =>
{
    emit('select-symbol', selectedSymbol);
    closeDrawer();
}

//#endregion

//#region Drawer

const drawerStatus = ref(false);

const closeDrawer = () =>
{
    drawerStatus.value = false;
}

const openDrawer = () =>
{
    drawerStatus.value = true;
}

//#endregion

//#region Intersection Observer

const reinitializeIntersectionObserver = () =>
{
    coinRowRef.reinitializeIntersectionObserver();
}

//#endregion

defineExpose({
    openDrawer
});

</script>

<template>

    <div class="lg:w-[550px] w-full h-full lg:translate-y-0 lg:relative fixed lg:bottom-0 left-0 top-0 lg:z-1 z-50 flex items-end backdrop-blur-sm bg-white/10 transition-all ease-linear duration-300"
         :class="drawerStatus ? '' : 'translate-y-[+120%]'"
    >
        <div class="coin-list-drawer w-full lg:h-full h-[90%] flex flex-col lg:rounded-none rounded-t-2xl font-yekanbakh lg:border-l-4 border-gray-100 bg-white">
            <div class="lg:hidden w-full flex flex-row items-center justify-between px-5 py-4">
                <div class="flex items-center gap-2">
                    <img src="~/assets/icons/index/filter.svg"
                         alt="کوین"
                    />

                    <h3 class="text-gray-400 text-sm">
                        انتخاب کوین
                    </h3>
                </div>

                <button type="button"
                        @click="closeDrawer"
                >
                    <img src="~/assets/icons/index/close.svg"
                         alt="بستن"
                    />
                </button>
            </div>


            <div class="lg:hidden w-full p-3">
                <div class="relative right-0">
                    <ul id="tabs" class="relative flex flex-row-reverse p-1 list-none rounded-lg bg-blue-gray-50/60" data-tabs="tabs" role="list">
                        <li class="z-[4] h-full flex-auto text-center w-[50%]">
                            <a class="w-full z-[4] h-full flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit"
                               role="tab"
                               data-tab-target=""
                               aria-selected="false"
                               href="javascript:;"
                               @click="changeTabIndex(2)"
                            >
                                <span class="text-wrap text-sm">
                                    IRT
                                </span>
                            </a>
                        </li>

                        <li class="z-[4] h-full flex-auto text-center w-[50%]">
                            <a class="w-full z-[4] h-full flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit"
                               role="tab"
                               data-tab-target=""
                               aria-selected="true"
                               href="javascript:;"
                               @click="changeTabIndex(1)"
                            >
                                <span class="text-wrap text-sm">
                                    USDT
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="w-full flex lg:flex-row flex-col items-center justify-between p-3">
                <h1 class="text-md lg:block hidden">
                    لیست رمز ارزها
                </h1>

                <div class="relative lg:w-auto w-full min-w-[200px] h-10" dir="rtl">
                    <div class="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 lg:left-3 right-3 -translate-y-2/4">
                        <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>

                    <input class="peer w-full h-full lg:pe-0 ps-10 lg:bg-transparent bg-gray-50 text-blue-gray-700 font-normal transition-all outline-0 ring-0 border-0 lg:outline-2 text-sm px-3 py-2.5 rounded-[7px] lg:border-2 lg:border-gray-200 lg:focus:outline-primary-900"
                           placeholder="جستجو"
                           ref="searchField"
                           @keyup="searchCoin"
                    />
                </div>
            </div>

            <div class="w-full h-full lg:px-2 px-1 lg:pb-[200px] pb-[135px]">
                <div class="mb-3 border-b border-gray-200 lg:block hidden">
                    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center">
                        <li class="w-1/4 flex flex-col items-center justify-end">
                            <button class="h-full inline-block p-4 border-b-2 rounded-t-lg"
                                    :class="tabIndex === 0 ? 'border-blue-400' : 'hover:border-gray-300'"
                                    @click="changeTabIndex(0)"
                                    type="button"
                            >
                                همه
                            </button>
                        </li>

                        <li class="w-1/4 flex flex-col items-center justify-end">
                            <button class="h-full inline-block p-4 border-b-2 rounded-t-lg"
                                    :class="tabIndex === 1 ? 'border-blue-400' : 'hover:border-gray-300 hover:text-gray-600'"
                                    @click="changeTabIndex(1)"
                                    type="button"
                            >
                                بازار تتر
                            </button>
                        </li>

                        <li class="w-1/4 flex flex-col items-center justify-end">
                            <button class="h-full inline-block p-4 border-b-2 rounded-t-lg"
                                    :class="tabIndex === 2 ? 'border-blue-400' : 'hover:border-gray-300 hover:text-gray-600'"
                                    @click="changeTabIndex(2)"
                                    type="button"
                            >
                                بازار تومان
                            </button>
                        </li>

                        <li class="w-1/4 flex flex-col items-center justify-end">
                            <button class="h-full inline-block p-4 border-b-2 rounded-t-lg"
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
                                <trade-market-coin-head @reinitialize-intersection-observer="reinitializeIntersectionObserver" />
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
                                <trade-market-coin-row :tab-index="tabIndex"
                                                       @select-symbol="selectSymbol"
                                                       @search-coin="searchCoin"
                                                       ref="coinRowRef"
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

@media screen and (max-width: 1024px)
{
    .coin-list-drawer
    {
        box-shadow: 5px 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
}

a
{
    transition: none !important;
}

ul#tabs > div[moving-tab] a
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