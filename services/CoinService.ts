import MarketTicker from "~/entities/coin/MarketTicker";
import TResponse from "~/entities/TResponse";
import ICoinService from "~/services/interface/ICoinService";

class CoinService implements ICoinService
{
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

            // @ts-ignore
            for(let ticker of response.data.tickers)
            {
                // Resolve data
                ticker.symbol_icon = ticker.symbol.split("-")[0].toLowerCase();
                ticker.symbol = ticker.symbol.replace("-", "/");
                ticker.visibility = true;

                // Resolve last price data
                ticker.last_str = ticker.last.split(".")[1] === "0" ? ticker.last.split(".")[0] : ticker.last;

                if(ticker.last.split(".")[0].length > 3)
                {
                    ticker.last_str = Number(ticker.last_str).toLocaleString().toString();
                }

                // Calculate last 24 hours changes percentage
                ticker.percentage_change = Number((((Number(ticker.last) - Number(ticker.open_24h)) / Number(ticker.open_24h)) * 100).toFixed(2));
            }

            resolve(response);
        });
    }
}

export default CoinService;