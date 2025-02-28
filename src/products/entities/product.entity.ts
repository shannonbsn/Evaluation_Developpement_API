import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { OrderItem } from 'src/order-items/entities/order-item.entity';

@Entity("product")
export class Product {
    @PrimaryGeneratedColumn('uuid')
    product_id: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    name: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    orderItems: OrderItem[];
}