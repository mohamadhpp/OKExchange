import TResponse from "~/entities/TResponse";
import MarketTicker from "~/entities/coin/MarketTicker";
import CoinTicker from "~/entities/coin/CoinTicker";

interface ICoinService
{
    get(): Promise<TResponse<MarketTicker | null>>;
    subscribe(symbol: string): void;
    unsubscribe(symbol: string): void;
}

export default ICoinService;