import { Module } from '@nestjs/common';
import { ProductService } from './product.service.js';
import { ProductController } from './product.controller.js';
import { Product } from './product.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/category.entity.js';
import { CategoryService } from '../categories/category.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [ProductController],
  providers: [ProductService, CategoryService],
})
export class ProductModule {}
