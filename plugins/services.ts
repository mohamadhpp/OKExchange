import FaqService from '~/services/FaqService';
import CoinService from '~/services/CoinService';

interface IServiceInstance
{
    faq: FaqService;
    coin: CoinService;
}

export default defineNuxtPlugin((nuxtApp) =>
{
    const services: IServiceInstance =
    {
        faq: new FaqService(),
        coin: new CoinService()
    };

    return {
        provide:
        {
            services: services
        }
    };
});