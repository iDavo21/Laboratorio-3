import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDiscountEntity} from './entities/product-discount.entity';
import { ProductsDiscountController } from './product-discount.controller';
import { ProductsDiscountService } from './product-discount.service';

@Module({
  controllers: [ProductsDiscountController],
  providers: [ProductsDiscountService],
  imports: [
    TypeOrmModule.forFeature([ ProductDiscountEntity ])
  ]
})
export class ProductDiscountModule {}
