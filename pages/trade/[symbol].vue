<script setup lang="ts">

import { ref, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const symbol = ref("");

//#region Tickers

import { useTickerStore } from '~/store/coin/ticker';
const { tickers } = storeToRefs(useTickerStore());

watch(tickers, () =>
{
    symbol.value = route.params.symbol.replace("_", "-");
})

//#endregion

//#region Market

import type CoinTicker from "~/entities/coin/CoinTicker";

const { $services } = useNuxtApp();
const marketRef = ref(null);

const ticker: CoinTicker = ref(null);

const selectSymbol = async (selectedSymbol: string) =>
{
    if(selectedSymbol !== "")
    {
        if(symbol.value !== "")
        {
            $services.coin.setSelectedSymbol("")
            $services.coin.unsubscribe(symbol.value);
        }

        symbol.value = selectedSymbol;
    }
    else
    {
        await tabScript.load();
    }

    $services.coin.setSelectedSymbol(symbol.value);
    $services.coin.subscribe(symbol.value);

    ticker.value = tickers.value.find((item: CoinTicker) => item.instId === symbol.value);
}

const openMarketDrawer = () =>
{
    marketRef.value.openDrawer();
}

//#endregion

//#region Define Page

import { useScriptTag } from '@vueuse/core';

const tabScript = useScriptTag(
'/material/scripts/tabs.js',
() => { },
{ manual: true }
);

useHead({
    title: 'لیست رمز ارزها | اوکی اکسچنج'
});

onUnmounted(async () =>
{
    await tabScript.unload();
});

//#endregion

</script>

<template>

    <section dir="rtl" class="w-full h-full overflow-hidden flex items-center">
        <trade-market @select-symbol="selectSymbol" ref="marketRef" />

        <div class="w-full h-full p-5">
            <trade-statistics :ticker="ticker"
                              @open-market-drawer="openMarketDrawer"
            />
        </div>
    </section>

</template>