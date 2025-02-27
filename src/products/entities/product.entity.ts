import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

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
}