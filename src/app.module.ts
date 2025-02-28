import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { Order } from './order/entities/order.entity';
import { OrderItemsModule } from './order-items/order-items.module';
import { OrderItem } from './order-items/entities/order-item.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8889,
      username: 'root',
      password: 'root',
      database: 'api_backend',
      entities: [Order, OrderItem, Product, Category],
      synchronize: true,
    }),
    OrderModule,
    OrderItemsModule,
    ProductsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }