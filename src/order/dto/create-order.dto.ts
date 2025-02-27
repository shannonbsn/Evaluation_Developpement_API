import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
    @IsDateString()
    @IsNotEmpty()
    order_date: string;
}