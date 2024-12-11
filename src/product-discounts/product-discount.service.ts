import { HttpStatus, Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { ManagerError } from 'src/common/errors/manager.error';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ApiAllResponse, ApiOneResponse } from 'src/common/interfaces/api-response.interface';
import { ProductDiscountEntity } from './entities/product-discount.entity';
import { CreateProductDiscountDto } from './dto/create-product-discount.dto';
import { UpdateProductDiscountDto } from './dto/update-product-discount.dto';

@Injectable()
export class ProductsDiscountService {

  constructor(
    @InjectRepository(ProductDiscountEntity)
    private readonly productDiscountRepository: Repository<ProductDiscountEntity>,
  ) { }

  async create(createProductDiscountDto: CreateProductDiscountDto): Promise<ApiOneResponse<ProductDiscountEntity>> {
    try {
      const product = await this.productDiscountRepository.save(createProductDiscountDto);
      if (!product) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Product discount not created!',
        });
      }
      return {
        status: {
          statusMsg: "CREATED",
          statusCode: HttpStatus.CREATED,
          error: null,
        },
        data: product,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ApiAllResponse<ProductDiscountEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [total, data] = await Promise.all([
        this.productDiscountRepository.count({ where: { isActive: true } }),
        this.productDiscountRepository.createQueryBuilder('product discount')
          .where({ isActive: true })
          .leftJoinAndSelect('productDs.product', 'product')
          .leftJoinAndSelect('productDs.disocunt', 'discount')
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

  async findOne(id: string): Promise<ApiOneResponse<ProductDiscountEntity>> {
    try {
      const product = await this.productDiscountRepository.createQueryBuilder('productDs')
        .where({ id, isActive: true })
        .leftJoinAndSelect('productDs.product', 'product')
        .leftJoinAndSelect('productDs.discount', 'discount')
        .getOne()

      if (!product) {
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

  async update(id: string, updateProductDto: UpdateProductDiscountDto): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const product = await this.productDiscountRepository.update({ id, isActive: true }, updateProductDto);
      if (product.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Product discount not found!',
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
      const product = await this.productDiscountRepository.update({ id, isActive: true }, { isActive: false });
      if (product.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Product disocunt not found',
        });
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
}
