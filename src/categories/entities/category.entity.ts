import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn('uuid')
    category_id: number;

    @Column()
    name: string;

}