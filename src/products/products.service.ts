import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name, description, price } = createProductDto;

    const product = this.productRepository.create({
      name,
      description,
      price,
    });

    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: string): Promise<Product | null> {
    const product = await this.productRepository.findOne({ where: { product_id: id } });
    return product;
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    const category = await this.categoryRepository.findOne({
      where: { category_id: categoryId },
      relations: ['products'],
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    return category.products;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { product_id: id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    Object.assign(product, updateProductDto);

    return await this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.productRepository.findOne({ where: { product_id: id } });

    if (!product) {
      throw new NotFoundException(`Produit avec l'ID ${id} non trouvée.`);
    }

    await this.productRepository.delete(id);
  }
}
