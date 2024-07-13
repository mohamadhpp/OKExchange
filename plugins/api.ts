// @ts-ignore
import { $fetch, FetchOptions } from 'ofetch';
import FaqModule from '~/repository/modules/FaqModule';
import CoinModule from '~/repository/modules/CoinModule';

interface IApiInstance
{
    faq: FaqModule;
    coin: CoinModule;
}

export default defineNuxtPlugin((nuxtApp) =>
{
    const apiFetcher = $fetch.create(null);

    const modules: IApiInstance =
    {
        faq: new FaqModule(apiFetcher),
        coin: new CoinModule(apiFetcher)
    };

    return {
        provide:
        {
            api: modules
        }
    };
});