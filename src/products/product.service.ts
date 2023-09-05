import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from '../categories/category.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
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
    console.log(thumbnail.filename);

    images &&
      images.length > 0 &&
      (product.images = images.map((image) =>
        join('./uploads/', image.filename),
      ));

    await this.productRepository.save(product);

    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { thumbnail, images, ...restProductData } = updateProductDto;

    const product = await this.getProductById(id);

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

      product.images = images.map((image) => image.filename);
    }

    Object.assign(product, restProductData);

    await this.productRepository.save(product);

    return product;
  }

  async delete(id: number): Promise<void> {
    const product = await this.getProductById(id);

    if (product.thumbnail) {
      if (fs.existsSync(product.thumbnail)) {
        fs.unlinkSync(product.thumbnail);
      }
    }

    if (product.images && product.images.length > 0) {
      product.images.forEach((image) => {
        console.log(fs.existsSync(image));
        if (fs.existsSync(image)) {
          fs.unlinkSync(image);
        }
      });
    }

    await this.productRepository.remove(product);
  }

  async getProductById(id: number): Promise<Product | undefined> {
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

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }
}
