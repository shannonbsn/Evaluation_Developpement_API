import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Product } from 'src/products/entities/product.entity';

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn('uuid')
    category_id: string;

    @Column()
    name: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];

}