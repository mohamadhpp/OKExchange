interface CoinTicker
{
    instId: string,
    symbol: string,
    symbol_icon: string,
    last: string,
    toman: string,
    last_str: string,
    best_ask: string,
    best_bid: string,
    open_24h: string,
    high_24h: number,
    low_24h: number,
    vol_24h_pair: number,
    vol_24h: number,
    ts: number,
    percentage_change: number,
    visibility: boolean
}

export default CoinTicker;