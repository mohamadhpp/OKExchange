import IFaqService from "~/services/interface/IFaqService";
import TResponse from "~/entities/TResponse";
import FaqEntity from "~/entities/faq/FaqEntity";

class FaqService implements IFaqService
{
    constructor() { }

    get(): Promise<TResponse<Array<FaqEntity> | null>>
    {
        return new Promise(async (resolve, reject) =>
        {
            let response: TResponse<Array<FaqEntity> | null> =
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

            // Resolve visibility property
            // @ts-ignore
            for (let faq of response.data)
            {
                faq.visibility = true;

                for (let children of faq.children)
                {
                    children.visibility = true;

                    for (let row of children.rows)
                    {
                        row.visibility = true;
                    }
                }
            }

            resolve(response);
        });
    }
}


export default FaqService;