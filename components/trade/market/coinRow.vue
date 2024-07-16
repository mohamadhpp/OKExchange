<script setup lang="ts">

import { ref, watch, defineEmits, defineProps, defineExpose, onUnmounted } from 'vue';

const { $services } = useNuxtApp();

//#region Props

const props = defineProps(
{
    tabIndex:
    {
        type: Number,
        required: true
    }
});

//#endregion

//#region Emmit

const emit = defineEmits<
{
    (e: 'select-symbol', selectedSymbol: string): void,
    (e: 'search-coin'): void
}>();

//#endregion

//#region Tickers

import { useTickerStore } from '~/store/coin/ticker';
import { useSymbolStore } from '~/store/coin/symbol';

const { tickers } = storeToRefs(useTickerStore());

//#endregion

//#region Favorites

const { favorites } = storeToRefs(useSymbolStore());
const { addFavorite, deleteFavorite } = useSymbolStore();

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

        if(props.tabIndex === 3)
        {
            emit('search-coin');
        }
    }

    event?.stopPropagation();
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

onUnmounted(() =>
{
    stopObservers.value.forEach((stop: any) => stop());
    $services.coin.unsubscribeAll();

    targetIsVisibleSymbols.value = [];
    targetSymbols.value = [];
    stopObservers.value = [];

    $services.coin.closeWebSocket();
});

defineExpose({
    reinitializeIntersectionObserver
});

</script>

<template>

    <tr v-for="coin in tickers"
        ref="targetSymbols"
        v-show="coin.visibility"
        class="bg-white cursor-pointer"
        @click="emit('select-symbol', coin.instId)"
    >
        <td class="px-3 py-4 text-center lg:hidden" dir="ltr">
            {{ coin.last_str }}
        </td>

        <td dir="ltr"
            class="sm:px-5 px-2 font-medium text-gray-900 whitespace-nowrap"
            :class="coin.percentage_change < 0 ? 'text-red-700' : 'text-green-700'"
        >
            <div class="w-full flex items-center justify-center">
                <span class="w-[75px] py-1 text-center lg:rounded-none rounded-lg lg:bg-transparent"
                      :class="coin.percentage_change < 0 ? 'bg-red-200' : 'bg-green-200'"
                >
                    {{ coin.percentage_change }}%
                </span>
            </div>
        </td>

        <td class="px-3 py-4 text-center lg:table-cell hidden" dir="ltr">
            {{ coin.last_str }}
        </td>

        <td class="px-3 py-4 text-left flex flex-row-reverse items-center gap-2"
            :title="coin.instId !== 'USDT-IRT' ? 'معادل تومانی: ' + coin.toman : ''"
        >
            <button type="button"
                    class="lg:block hidden"
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

            <img :src="useDynamicallyAssets(`/assets/icons/coins/${coin.icon}.png`)"
                 :alt="coin.symbol"
                 :title="coin.symbol"
                 class="lg:w-6 w-5 rounded-full"
            />

            <span class="mt-1 lg:text-base text-sm">
                {{ coin.symbol }}
            </span>
        </td>
    </tr>

</template>