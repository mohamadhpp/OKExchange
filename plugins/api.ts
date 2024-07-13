// @ts-ignore
import { $fetch, FetchOptions } from 'ofetch';
import FaqModule from '~/repository/modules/FaqModule';

interface IApiInstance
{
    faq: FaqModule;
}

export default defineNuxtPlugin((nuxtApp) =>
{
    const config = useRuntimeConfig();
    const fetchOptions: FetchOptions =
    {
        baseURL: config.public.SITE_API_BASE_URL
    };

    const apiFetcher = $fetch.create(fetchOptions);
    const modules: IApiInstance =
    {
        faq: new FaqModule(apiFetcher)
    };

    return {
        provide:
        {
            api: modules
        }
    };
});