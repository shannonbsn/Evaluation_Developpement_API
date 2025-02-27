import { IsDate, IsString, IsNotEmpty, IsOptional, IsNumber, IsPositive } from 'class-validator';

export class CreateProductDto {

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsPositive()
    price: number;
}