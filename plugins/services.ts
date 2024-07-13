import FaqService from '~/services/FaqService';

interface IServiceInstance
{
    faq: FaqService;
}

export default defineNuxtPlugin((nuxtApp) =>
{
    const services: IServiceInstance =
    {
        faq: new FaqService()
    };

    return {
        provide:
        {
            services: services
        }
    };
});