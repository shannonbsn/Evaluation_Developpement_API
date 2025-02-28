import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderItemDto } from './create-order-item.dto';
import { IsNumber, Min, Max } from 'class-validator';

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
    @IsNumber()
    @Min(1)
    quantity: number;

    @IsNumber()
    @Min(0)
    @Max(100)
    discount: number;
}