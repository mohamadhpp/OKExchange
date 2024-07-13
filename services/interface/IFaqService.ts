import TResponse from "~/entities/TResponse";
import FaqEntity from "~/entities/faq/FaqEntity";

interface IFaqService
{
    get(): Promise<TResponse<Array<FaqEntity> | null>>;
}

export default IFaqService;