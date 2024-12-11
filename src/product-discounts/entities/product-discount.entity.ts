import { Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import { BaseEntity } from "./../../common/config/base.entity";
import { CategoryEntity } from "./../../categories/entities/category.entity";
import { ProductEntity } from "src/products/entities/product.entity";
;

@Entity('productDs')
export class ProductDiscountEntity extends BaseEntity {

    @ManyToOne(()=> ProductEntity, (product)=>product.productDs)
    @JoinColumn({name:'product_id'})
    product: string;

    @ManyToOne(()=> CategoryEntity, (discount)=>discount.productDs)
    @JoinColumn({name:'discount_id'})
    category: string;


}
