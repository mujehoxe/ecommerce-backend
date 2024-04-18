import { Module } from '@nestjs/common';
import { ProductService } from './product.service.js';
import { ProductController } from './product.controller.js';
import { Product } from './product.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../categories/category.module.js';
import { GetProductController } from './product.get.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule],
  controllers: [ProductController, GetProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
