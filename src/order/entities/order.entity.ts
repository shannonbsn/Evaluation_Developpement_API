import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn()
    order_id: number;

    @Column()
    order_date: Date;

}