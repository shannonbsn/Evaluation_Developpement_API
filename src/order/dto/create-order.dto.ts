import { IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    order_date: Date;
}