import MarketTicker from "~/entities/coin/MarketTicker";
import TResponse from "~/entities/TResponse";
import CoinTicker from "~/entities/coin/CoinTicker";
import CoinUpdateTicker from "~/entities/coin/CoinUpdateTicker";
import ICoinService from "~/services/interface/ICoinService";
import { useTickerStore } from '~/store/coin/ticker';

// @ts-ignore
import { watch } from 'vue';

class CoinService implements ICoinService
{
    private ws: undefined;
    private subscriptions: string[] = [];

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

    openWebSocket(): void
    {
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
            message: 'ping',
            interval: 1000,
            pongTimeout: 1000,
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

    //#region Privates

    private messageHandler(data: any)
    {
        const { tickers } = storeToRefs(useTickerStore());

        let update_ticker: CoinUpdateTicker = JSON.parse(data).data[0];
        let index = tickers.value.map((item: CoinTicker) => item.symbol).indexOf(update_ticker.instId.replace("-", "/"));

        if(index !== -1)
        {
            let coin_ticker = tickers.value[index];

            coin_ticker.symbol = update_ticker.instId;
            coin_ticker.symbol_icon = "";
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
        ticker.symbol_icon = ticker.symbol.split("-")[0].toLowerCase();
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
            ticker.toman = Number((Number(usdt_price) * Number(ticker.last)).toFixed(3)).toLocaleString().toString();
        }

        // Resolve last price data
        ticker.last_str = ticker.last.split(".")[1] === "0" ? ticker.last.split(".")[0] : ticker.last;

        if(ticker.last.split(".")[0].length > 3)
        {
            ticker.last_str = Number(ticker.last_str).toLocaleString().toString();
        }

        // Calculate last 24 hours changes percentage
        ticker.percentage_change = Number((((Number(ticker.last) - Number(ticker.open_24h)) / Number(ticker.open_24h)) * 100).toFixed(2));
    }

    //#endregion
}

export default CoinService;