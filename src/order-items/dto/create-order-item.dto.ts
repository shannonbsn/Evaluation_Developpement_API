import { IsNumber, Min, Max } from 'class-validator';

export class CreateOrderItemDto {
    @IsNumber()
    @Min(1)
    quantity: number;

    @IsNumber()
    @Min(0)
    @Max(100)
    discount: number;
}
