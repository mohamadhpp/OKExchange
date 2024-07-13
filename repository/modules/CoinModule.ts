// @ts-ignore
import { FetchOptions } from 'ofetch';
import FetchFactory from '../factory';

class CoinModule extends FetchFactory<void>
{
    async get()
    {
        return useAsyncData(() =>
        {
            const config = useRuntimeConfig();

            const fetchOptions: FetchOptions<'json'> =
            {
                baseURL: config.public.marketApi,

                headers:
                {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            return this.call
            (
            'Get',
            "market/tickers",
            undefined,
            fetchOptions
            );
        });
    }
}

export default CoinModule;