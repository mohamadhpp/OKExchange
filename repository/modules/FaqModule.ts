// @ts-ignore
import { FetchOptions } from 'ofetch';
import FetchFactory from '../factory';

class FaqModule extends FetchFactory<void>
{
    async get()
    {
        return useAsyncData(() =>
        {
            const fetchOptions: FetchOptions<'json'> =
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            return this.call
            (
            'Get',
            "support/faq",
            undefined,
            fetchOptions
            );
        });
    }
}

export default FaqModule;