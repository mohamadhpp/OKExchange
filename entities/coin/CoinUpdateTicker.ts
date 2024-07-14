interface CoinUpdateTicker
{
    instId: string,
    last: string,
    lastSz: string,
    askPx: string,
    askSz: string,
    bidPx: string,
    bidSz: string,
    open24h: string,
    high24h: string,
    low24h: string,
    volCcy24h: string,
    vol24h: string,
    sodUtc0: string,
    SodUtc8: string,
    ts: number
}

export default CoinUpdateTicker;