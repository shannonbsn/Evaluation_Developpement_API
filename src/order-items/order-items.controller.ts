import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';

@Controller('orderitems')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) { }

  @Post()
  async create(@Body() createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    return await this.orderItemsService.create(createOrderItemDto);
  }

  @Get('/orders/:order_id/orderitems')
  async findByOrder(@Param('order_id') order_id: string): Promise<OrderItem[]> {
    return this.orderItemsService.findByOrder(order_id);
  }

  @Put(':order_id/:product_id')
  update(
    @Param('order_id') order_id: string,
    @Param('product_id') product_id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemsService.update(order_id, product_id, updateOrderItemDto);
  }

  @Delete(':order_id/:product_id')
  async remove(
    @Param('order_id') order_id: string,
    @Param('product_id') product_id: string,
  ): Promise<void> {
    return this.orderItemsService.remove(order_id, product_id);
  }
}