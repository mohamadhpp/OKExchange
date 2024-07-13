import TResponse from "~/entities/TResponse";
import MarketTicker from "~/entities/coin/MarketTicker";

interface ICoinService
{
    get(): Promise<TResponse<MarketTicker | null>>;
}

export default ICoinService;