import FaqRowEntity from "~/entities/faq/FaqRowEntity";

interface FaqCategoryEntity
{
    _id: string,
    category: string,
    rows: Array<FaqRowEntity>,
    visibility: boolean
}

export default  FaqCategoryEntity;