import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,

    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,

    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) { }

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    const { order_id, product_id, quantity, reduction_percentage } = createOrderItemDto;

    const order = await this.ordersRepository.findOne({ where: { order_id } });
    if (!order) throw new NotFoundException(`Order with ID ${order_id} not found`);

    const product = await this.productsRepository.findOne({ where: { product_id } });
    if (!product) throw new NotFoundException(`Product with ID ${product_id} not found`);

    const orderItem = this.orderItemsRepository.create({
      order_id,
      product_id,
      quantity,
      reduction_percentage,
    });

    return await this.orderItemsRepository.save(orderItem);
  }

  async findByOrder(order_id: string): Promise<OrderItem[]> {
    return await this.orderItemsRepository.find({
      where: { order_id },
      relations: ['order', 'product'],
    });
  }

  async update(order_id: string, product_id: string, updateOrderItemDto: UpdateOrderItemDto): Promise<OrderItem> {
    const orderItem = await this.orderItemsRepository.findOne({
      where: { order_id, product_id },
    });

    if (!orderItem) {
      throw new NotFoundException(`OrderItem with Order ID ${order_id} and Product ID ${product_id} not found`);
    }

    Object.assign(orderItem, updateOrderItemDto);
    return await this.orderItemsRepository.save(orderItem);
  }

  async remove(order_id: string, product_id: string): Promise<void> {
    const result = await this.orderItemsRepository.delete({ order_id, product_id });
    if (result.affected === 0) {
      throw new NotFoundException(`OrderItem with Order ID ${order_id} and Product ID ${product_id} not found`);
    }
  }
}