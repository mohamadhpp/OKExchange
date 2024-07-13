import FaqCategoryEntity from '~/entities/faq/FaqCategoryEntity';

interface FaqEntity
{
    _id: string,
    category: string,
    name: string,
    children: Array<FaqCategoryEntity>,
    __v: number,
    visibility: boolean
}

export default FaqEntity;