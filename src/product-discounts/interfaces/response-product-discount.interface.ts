import { ProductDisocuntEntity } from "../entities/product-discount.entity";

export interface ResponseAllProductDiscount{
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: ProductDisocuntEntity[];
}