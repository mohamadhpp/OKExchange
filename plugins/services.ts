import FaqService from '~/services/FaqService';
import CoinService from '~/services/CoinService';

import IServiceInstance from "~/entities/instances/IServiceInstance";

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