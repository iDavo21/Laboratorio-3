import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { PaginationDto } from '../common/dtos/pagination/pagination.dto';
import { DiscountService } from './discount.service';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountService.create(createDiscountDto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.discountService.findAll( paginationDto );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscountDto: UpdateDiscountDto) {
    return this.discountService.update(id, updateDiscountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discountService.remove(id);
  }
}