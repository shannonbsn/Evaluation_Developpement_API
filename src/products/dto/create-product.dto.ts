import { IsDate, IsString, IsNotEmpty, IsOptional, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { Column } from 'typeorm';

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