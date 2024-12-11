import { DiscountEntity } from "../entities/discount.entity";


export interface ResponseAllDiscount{
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: DiscountEntity[];
}