import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountController } from './discount.controller';
import { DiscountEntity } from './entities/discount.entity';
import { DiscountService } from './discount.service';

@Module({
  controllers: [DiscountController],
  providers: [DiscountService],
  imports: [
    TypeOrmModule.forFeature([ DiscountEntity ])
  ]
})
export class DiscountModule {}