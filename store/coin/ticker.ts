import { defineStore } from 'pinia';

import MarketTicker from '~/entities/coin/MarketTicker';
import CoinTicker from "~/entities/coin/CoinTicker";

// @ts-ignore
import { useSymbolStore } from '~/store/coin/symbol';

export const useTickerStore = defineStore('ticker',
{
    state: (): MarketTicker =>
    ({
        tickers: [],
        msg: "",
        code: 0
    }),

    getters:
    {
        getTickers: (state) =>
        {
            return state.tickers;
        },

        getUSDT: (state) : CoinTicker | null =>
        {
            let index = state.tickers.map((item: CoinTicker) => item.instId).indexOf("USDT-IRT");

            if(index === -1)
            {
                return null;
            }

            return state.tickers[index];
        }
    },

    actions:
    {
        setTicker(tickers: MarketTicker | null, code: number, msg: string)
        {
            this.tickers = tickers;
            this.code = code;
            this.msg = msg;
        },

        updateTicker(ticker: CoinTicker)
        {
            let index = this.tickers.map((item: CoinTicker) => item.symbol).indexOf(ticker.symbol);

            if(index !== -1)
            {
                this.tickers[index] = ticker;
            }
        },

        sort(type: string)
        {
            if(type === "asc")
            {
                this.tickers.sort((a: CoinTicker, b: CoinTicker) => a.percentage_change - b.percentage_change);
            }
            else
            {
                this.tickers.sort((a: CoinTicker, b: CoinTicker) => b.percentage_change - a.percentage_change);
            }
        },

        search(text: string, tabIndex: number = 0)
        {
            let search_str_len = text.trim().length;

            for(let coin of this.tickers)
            {
                if(search_str_len > 0)
                {
                    coin.visibility = coin.symbol.includes(text);
                }
                else
                {
                    coin.visibility = true;
                }
            }

            if(tabIndex === 1)
            {
                this.tickers.find((item: CoinTicker) => item.instId === "USDT-IRT").visibility = false;
            }
            else if(tabIndex === 2)
            {
                this.tickers.filter((item: CoinTicker) => item.instId !== "USDT-IRT").map((item: CoinTicker) => item.visibility = false);
            }
            else if(tabIndex === 3)
            {
                const { getFavorites } = useSymbolStore();
                this.tickers.filter((item: CoinTicker) => !getFavorites.includes(item.instId)).map((item: CoinTicker) => item.visibility = false);
            }
        }
    }
});