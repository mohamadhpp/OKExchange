import FaqModule from "~/repository/modules/FaqModule";
import CoinModule from "~/repository/modules/CoinModule";

interface IApiInstance
{
    faq: FaqModule;
    coin: CoinModule;
}

export default IApiInstance;