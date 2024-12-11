import {IsNotEmpty, IsString} from "class-validator";

export class CreateProductDiscountDto {
  @IsString()
  @IsNotEmpty()
  discount: string;

  @IsString()
  @IsNotEmpty()
  product: string;

}