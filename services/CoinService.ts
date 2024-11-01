import MarketTicker from "~/entities/coin/MarketTicker";
import TResponse from "~/entities/TResponse";
import CoinTicker from "~/entities/coin/CoinTicker";
import CoinUpdateTicker from "~/entities/coin/CoinUpdateTicker";
import ICoinService from "~/services/interface/ICoinService";
import { useTickerStore } from '~/store/coin/ticker';

import { Last24HourChangePercentage, TomanPrice } from '~/utils/coin';

// @ts-ignore
import { watch } from 'vue';
// @ts-ignore
import {useWebSocket, UseWebSocketReturn} from '@vueuse/core';
import selectAll from "css-select";

class CoinService implements ICoinService
{
    private ws: UseWebSocketReturn<any>;
    private subscriptions: string[] = [];
    private selectedSymbol = "";

    constructor() { }

    get(): Promise<TResponse<MarketTicker | null>>
    {
        return new Promise(async (resolve, reject) =>
        {
            let response: TResponse<MarketTicker | null> =
            {
                status: true,
                message: "",
                data: null
            };

            const { $api } = useNuxtApp();

            // @ts-ignore
            let coinRepository = $api.coin;
            const { data } = await coinRepository.get();

            if (data.value)
            {
                response.data = data.value;

                // @ts-ignore
                if (response.data.msg !== "OK")
                {
                    response.status = false;
                    response.message = "لطفا وضعیت اتصال اینترنت خود را چک کنید.";

                    reject(response);
                    return;
                }
            }

            let usdt_price = "0";

            // @ts-ignore
            let index = response.data.tickers.forEach((coin: CoinTicker) =>
            {
                if(coin.symbol === "USDT-IRT")
                {
                    usdt_price = coin.last;
                    return;
                }
            })

            // @ts-ignore
            for(let ticker of response.data.tickers)
            {
                this.fixTicker(ticker, usdt_price);
            }

            const { setTicker } = useTickerStore();

            // @ts-ignore
            setTicker(response.data.tickers, response.data.code, response.data.msg);
            resolve(response);
        });
    }

    //#region Subscriptions

    subscribe(symbol: string): void
    {
        if(this.subscriptions.indexOf(symbol) !== -1)
        {
            return;
        }

        this.subscriptions.push(symbol);

        // @ts-ignore
        this.ws.send(JSON.stringify(
        {
            "op":"subscribe",
            "args":
            [{
                "channel":"tickers",
                "instId": symbol
            }]
        }));
    }

    unsubscribe(symbol: string): void
    {
        if(this.selectedSymbol === symbol)
        {
            return;
        }

        let index = this.subscriptions.indexOf(symbol);

        if(index === -1)
        {
            return;
        }

        this.subscriptions.splice(index, 1);

        // @ts-ignore
        this.ws.send(JSON.stringify(
        {
            "op":"unsubscribe",
            "args":
            [{
                "channel":"tickers",
                "instId": symbol
            }]
        }));
    }

    unsubscribeAll(): void
    {
        for(let i = 0; i < this.subscriptions.length; i++)
        {
            if(this.subscriptions[i] === this.selectedSymbol)
            {
                continue;
            }

            // @ts-ignore
            this.ws.send(JSON.stringify(
            {
                "op":"unsubscribe",
                "args":
                [{
                    "channel":"tickers",
                    "instId": this.subscriptions[i]
                }]
            }));
        }

        this.subscriptions = [];
    }

    getSubscriptions(): string[]
    {
        return this.subscriptions;
    }

    //#endregion

    //#region Selected symbol

    setSelectedSymbol(symbol: string): void
    {
        this.selectedSymbol = symbol;
    }
    getSelectedSymbol(): string
    {
        return this.selectedSymbol;
    }

    //#endregion

    //#region Web Socket

    openWebSocket(): void
    {
        let self = this;

        if(this.ws)
        {
            if(this.ws.status.value === "CLOSED")
            {
                this.ws.open();
            }

            return;
        }

        // Connect WS
        const config = useRuntimeConfig();

        this.ws = useWebSocket(config.public.tickerWs,
        {
            autoReconnect:
            {
                retries: 5,
                delay: 1000,

                onFailed()
                {
                    self.closeWebSocket();
                    self.openWebSocket();
                }
            }
        });

        // @ts-ignore
        watch(this.ws.data, (newData) =>
        {
            this.messageHandler(newData);
        });
    }

    closeWebSocket(): void
    {
        // @ts-ignore
        this.ws.close();
    }

    //#endregion

    //#region Private

    private messageHandler(data: any)
    {
        const { tickers } = storeToRefs(useTickerStore());

        let update_ticker: CoinUpdateTicker = JSON.parse(data).data[0];
        let index = tickers.value.map((item: CoinTicker) => item.symbol).indexOf(update_ticker.instId.replace("-", "/"));

        if(index !== -1)
        {
            let coin_ticker = tickers.value[index];

            coin_ticker.symbol = update_ticker.instId;
            coin_ticker.icon = "";
            coin_ticker.last = update_ticker.last;
            coin_ticker.open_24h = update_ticker.open24h;
            coin_ticker.high_24h = Number(update_ticker.high24h);
            coin_ticker.low_24h = Number(update_ticker.low24h);
            coin_ticker.vol_24h_pair = Number(update_ticker.volCcy24h);
            coin_ticker.vol_24h = Number(update_ticker.vol24h);
            coin_ticker.ts = update_ticker.ts;
            coin_ticker.percentage_change = 0;

            this.fixTicker(coin_ticker);

            const { updateTicker } = useTickerStore();
            updateTicker(coin_ticker);
        }
    }

    private fixTicker(ticker: CoinTicker, usdt_price: string = "0"): void
    {
        // Resolve data
        ticker.icon = ticker.symbol.split("-")[0].toLowerCase();
        ticker.instId = ticker.symbol;
        ticker.symbol = ticker.symbol.replace("-", "/");

        if(ticker.visibility === undefined)
        {
            ticker.visibility = true;
        }

        if(usdt_price === "0")
        {
            const { getUSDT } = useTickerStore();

            if(getUSDT)
            {
                usdt_price = getUSDT.last;
            }
        }

        // Set toman price
        if(ticker.instId !== "USDT-IRT")
        {
            ticker.toman = TomanPrice(Number(ticker.last), Number(usdt_price));
        }

        // Resolve last price data
        ticker.last_str = ticker.last.split(".")[1] === "0" ? ticker.last.split(".")[0] : ticker.last;

        if(ticker.last.split(".")[0].length > 3)
        {
            ticker.last_str = Number(ticker.last_str).toLocaleString().toString();
        }

        // Calculate last 24 hours changes percentage
        ticker.percentage_change = Last24HourChangePercentage(Number(ticker.last),  Number(ticker.open_24h));
    }

    //#endregion
}

export default CoinService;