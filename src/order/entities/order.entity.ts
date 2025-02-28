import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { OrderItem } from 'src/order-items/entities/order-item.entity';

@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn('uuid')
    order_id: string;

    @Column({ type: 'timestamp' })
    order_date: Date;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    orderItems: OrderItem[];

}