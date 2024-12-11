import {IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateDiscountDto {
    @IsNotEmpty()
    @MinLength(3)    
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @Min(0)
    percentage: number = 0;

    @IsNumber()
    @Min(0)
    amount: number = 0;

    @IsString()
    @IsNotEmpty()
    startDate: string;

    @IsString()
    @IsNotEmpty()
    endDate: string;

    @IsString()
    @IsNotEmpty()
    product: string;
}