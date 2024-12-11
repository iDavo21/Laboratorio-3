import { Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import { BaseEntity } from "../../common/config/base.entity";
import { ProductEntity } from "src/products/entities/product.entity";

@Entity('discount')
export class DiscountEntity extends BaseEntity {
    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar', nullable: true})
    description?: string;

    @Column({type: 'float', default: 0})
    percentage: number = 0;

    @Column({type: 'int', default: 0})
    amount: number = 0;

    @ManyToOne(()=> ProductEntity, (product)=>product.discount)
    @JoinColumn({name:'product_id'})
    product: string;

}
