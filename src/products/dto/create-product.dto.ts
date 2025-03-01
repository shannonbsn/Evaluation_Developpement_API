import { IsDate, IsString, IsNotEmpty, IsOptional, IsNumber, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    @IsPositive()
    price: number;

    @IsString()
    @IsNotEmpty()
    category_id: string;
}