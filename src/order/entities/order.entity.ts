import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
//import { OrderItems } from 'src/order-items/entities/order-item.entity';

@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn('uuid')
    order_id: string;

    @Column()
    order_date: Date;

    // @OneToMany(() => OrderItems, orderItems => orderItems.order)
    // orderItems: OrderItems[];

}