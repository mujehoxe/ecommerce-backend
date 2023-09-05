import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from '../categories/category.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    private readonly categoryService: CategoryService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryName, ...restProductData } = createProductDto;

    const category =
      await this.categoryService.findOrCreateCategory(categoryName);

    const product = this.productRepository.create({
      ...restProductData,
      category,
    });

    categoryName &&
      (product.category =
        await this.categoryService.findOrCreateCategory(categoryName));

    return this.productRepository.save(product);
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.getProductById(id);

    const { categoryName, ...restProductData } = updateProductDto;

    Object.assign(product, {
      ...restProductData,
    });

    categoryName &&
      (product.category =
        await this.categoryService.findOrCreateCategory(categoryName));

    return this.productRepository.save(product);
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
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
