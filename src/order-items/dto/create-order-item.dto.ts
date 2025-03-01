import { IsUUID, IsNumber, Min, Max } from 'class-validator';

export class CreateOrderItemDto {
    @IsUUID()
    order_id: string;

    @IsUUID()
    product_id: string

    @IsNumber()
    @Min(1)
    quantity: number;

    @IsNumber()
    @Min(0)
    @Max(100)
    reduction_percentage: number;
}
