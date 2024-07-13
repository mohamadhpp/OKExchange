import CoinTicker from "~/entities/coin/CoinTicker";

interface MarketTicker
{
    tickers: Array<CoinTicker>,
    code: number,
    msg: string
}

export default MarketTicker;