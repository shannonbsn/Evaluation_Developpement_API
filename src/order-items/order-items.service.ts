import { Injectable } from '@nestjs/common';
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

    const order = await this.ordersRepository.findOne({ where: { order_id: order_id } });
    if (!order) throw new Error('Order not found');

    const product = await this.productsRepository.findOne({ where: { product_id: product_id } });
    if (!product) throw new Error('Product not found');

    const orderItem = this.orderItemsRepository.create({
      order,
      product,
      quantity,
      reduction_percentage: reduction_percentage,
    });

    return await this.orderItemsRepository.save(orderItem);
  }

  findAll() {
    return `This action returns all orderItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return `This action updates a #${id} orderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`;
  }
}
