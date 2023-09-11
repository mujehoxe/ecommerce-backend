import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from '../categories/category.service.js';
import { CreateProductDto } from './dtos/create-product.dto.js';
import { UpdateProductDto } from './dtos/update-product.dto.js';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    private readonly categoryService: CategoryService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { thumbnail, images, categoryName, ...restProductData } =
      createProductDto;

    const product = this.productRepository.create({
      ...restProductData,
      category: await this.categoryService.findOrCreateCategory(categoryName),
    });

    thumbnail && (product.thumbnail = join('./uploads/', thumbnail.filename));

    images &&
      images.length > 0 &&
      (product.images = images.reduce(
        (result: string[], image) =>
          image ? result.concat(join('./uploads/', image.filename)) : result,
        [],
      ));

    await this.productRepository.save(product);

    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { thumbnail, images, ...restProductData } = updateProductDto;

    const product = await this.getById(id);

    if (thumbnail) {
      if (fs.existsSync(product.thumbnail)) {
        fs.unlinkSync(product.thumbnail);
      }
      const thumbnailPath = join('./uploads/', thumbnail.filename);
      product.thumbnail = thumbnailPath;
    }

    if (images && images.length > 0) {
      const existingImages = product.images || [];
      existingImages.forEach((existingImage) => {
        if (fs.existsSync(existingImage)) {
          fs.unlinkSync(existingImage);
        }
      });

      product.images = images.reduce(
        (result: string[], image) =>
          image ? result.concat(join('./uploads/', image.filename)) : result,
        [],
      );
    }

    Object.assign(product, restProductData);

    await this.productRepository.save(product);

    return product;
  }

  async delete(id: number): Promise<void> {
    const product = await this.getById(id);

    if (product.thumbnail) {
      if (fs.existsSync(product.thumbnail)) {
        fs.unlinkSync(product.thumbnail);
      }
    }

    if (product.images && product.images.length > 0) {
      product.images.forEach((image) => {
        if (fs.existsSync(image)) {
          fs.unlinkSync(image);
        }
      });
    }

    await this.productRepository.remove(product);
  }

  async getById(id: number): Promise<Product | undefined> {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.id = :id', { id })
      .getOne();

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async getAll(page = 1, pageSize = 10): Promise<[Product[], number]> {
    const skip = (page - 1) * pageSize;

    return this.productRepository.findAndCount({
      skip,
      take: pageSize,
    });
  }

  async getLatest(count: number): Promise<Product[]> {
    return this.productRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: count,
    });
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.category.id = :categoryId', { categoryId })
      .getMany();
  }

  async searchProductsByKeyword(keyword: string): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where(
        'product.name LIKE :keyword OR product.description LIKE :keyword OR category.name LIKE :keyword',
        { keyword: `%${keyword}%` },
      )
      .getMany();
  }
}
