import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

import { PaginationDto } from '../common/dtos/pagination/pagination.dto';
import { CreateProductDiscountDto } from './dto/create-product-discount.dto';
import { ProductsDiscountService } from './product-discount.service';
import { UpdateProductDiscountDto } from './dto/update-product-discount.dto';

@Controller('productsDs')
export class ProductsDiscountController {
  constructor(private readonly productsDiscountService: ProductsDiscountService) {}

  @Post()
  create(@Body() createProductDiscounDto: CreateProductDiscountDto) {
    return this.productsDiscountService.create(createProductsDiscountdto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.productsDiscountService.findAll( paginationDto );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsDiscountService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDiscountDto) {
    return this.productsDiscountService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsDiscountService.remove(id);
  }
}
