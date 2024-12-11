import { HttpStatus, Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { ManagerError } from 'src/common/errors/manager.error';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ApiAllResponse, ApiOneResponse } from 'src/common/interfaces/api-response.interface';
import { DiscountEntity } from './entities/discount.entity';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@Injectable()
export class DiscountService {

  constructor(
    @InjectRepository(DiscountEntity)
    private readonly discountRepository: Repository<DiscountEntity>,
  ) { }

  async create(createDiscountDto: CreateDiscountDto): Promise<ApiOneResponse<DiscountEntity>> {
    try {
      const discount = await this.discountRepository.save(createDiscountDto);
      if (!discount) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Disocunt not created!',
        });
      }
      return {
        status: {
          statusMsg: "CREATED",
          statusCode: HttpStatus.CREATED,
          error: null,
        },
        data: discount,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ApiAllResponse<DiscountEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [total, data] = await Promise.all([
        this.discountRepository.count({ where: { isActive: true } }),
        this.discountRepository.createQueryBuilder('discount')
          .where({ isActive: true })
          .leftJoinAndSelect('product.category', 'category')
          .leftJoinAndSelect('product.supplier', 'supplier')
          .take(limit)
          .skip(skip)
          .getMany()
      ]);

      const lastPage = Math.ceil(total / limit);

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        meta: {
          page,
          limit,
          lastPage,
          total,
        },
        data,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<ApiOneResponse<DiscountEntity>> {
    try {
      const discount = await this.discountRepository.createQueryBuilder('discount')
        .where({ id, isActive: true })
        .leftJoinAndSelect('discount.product', 'product')
        .getOne()

      if (!discount) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Discount not found!',
        })
      }

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: discount,
      }
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updateDiscountDto: UpdateDiscountDto): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const product = await this.discountRepository.update({ id, isActive: true }, updateDiscountDto);
      if (product.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Product not found!',
        })
      }

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: product,
      }
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const discount = await this.discountRepository.update({ id, isActive: true }, { isActive: false });
      if (discount.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Discount not found',
        });
      }

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: discount,
      }
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}
