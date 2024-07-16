import TResponse from "~/entities/TResponse";
import MarketTicker from "~/entities/coin/MarketTicker";

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