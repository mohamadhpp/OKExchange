import IFaqService from "~/services/interface/IFaqService";
import TResponse from "~/entities/TResponse";
import FaqEntity from "~/entities/faq/FaqEntity";

class FaqService implements IFaqService
{
    constructor() { }

    get(): Promise<TResponse<FaqEntity | null>>
    {
        return new Promise(async (resolve, reject) =>
        {
            let response: TResponse<FaqEntity | null> =
            {
                status: false,
                message: "",
                data: null
            };

            const { $api } = useNuxtApp();

            // @ts-ignore
            let faqRepository = $api.faq;
            const { data } = await faqRepository.get();

            if (data.value)
            {
                response = data.value;

                if (!response.status)
                {
                    response.message = "لطفا وضعیت اتصال اینترنت خود را چک کنید.";

                    reject(response);
                    return;
                }
            }

            resolve(response);
        });
    }
}


export default FaqService;