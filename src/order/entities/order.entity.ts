import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn('uuid')
    order_id: string;

    @Column()
    order_date: Date;

}