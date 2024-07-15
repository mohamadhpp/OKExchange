import TResponse from "~/entities/TResponse";
import MarketTicker from "~/entities/coin/MarketTicker";
import CoinTicker from "~/entities/coin/CoinTicker";

interface ICoinService
{
    get(): Promise<TResponse<MarketTicker | null>>;
    openWebSocket(): void;
    closeWebSocket(): void;
    subscribe(symbol: string): void;
    unsubscribe(symbol: string): void;
    unsubscribeAll(): void;
    getSubscriptions(): string[];
}

export default ICoinService;