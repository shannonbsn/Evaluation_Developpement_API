import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from 'src/order-items/entities/order-item.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>,
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create({
      order_date: new Date(createOrderDto.order_date),
    });

    return await this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async calculateTotalPrice(order_id: string): Promise<number> {
    const order = await this.orderRepository.findOne({
      where: { order_id },
      relations: ['orderItems'],
    });

    if (!order) {
      throw new NotFoundException(`Commande avec l'ID ${order_id} non trouvée.`);
    }

    let totalPrice = 0;

    for (const item of order.orderItems) {
      const itemTotal = item.product.price * item.quantity;
      const discountAmount = (itemTotal * item.reduction_percentage) / 100;
      totalPrice += itemTotal - discountAmount;
    }

    return totalPrice;
  }


  async remove(id: string): Promise<void> {
    const order = await this.orderRepository.findOne({ where: { order_id: id } });

    if (!order) {
      throw new NotFoundException(`Commande avec l'ID ${id} non trouvée.`);
    }

    await this.orderRepository.delete(id);
  }
}
