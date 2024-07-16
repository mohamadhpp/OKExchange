import CoinService from "~/services/CoinService";
import FaqService from "~/services/FaqService";

interface IServiceInstance
{
    faq: FaqService;
    coin: CoinService;
}

export default IServiceInstance;