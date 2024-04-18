import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service.js';
import { Product } from './product.entity.js';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/auth.guard.js';

@Public()
@Controller('products')
@ApiTags('products')
export class GetProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ): Promise<[Product[], number]> {
    return this.productService.getAll(page, pageSize);
  }

  @Public()
  @Get('count')
  async getCount(): Promise<number> {
    return this.productService.getCount();
  }

  @Public()
  @Get('latest')
  async getLatest(@Query('count') countQueryParam: string): Promise<Product[]> {
    const count = parseInt(countQueryParam) || 10;

    if (count < 1 || count > 100) {
      throw new BadRequestException(
        'Invalid count parameter. Count must be between 1 and 100.',
      );
    }

    return this.productService.getLatest(count);
  }

  @Public()
  @Get('by-category')
  async getProductsByCategory(
    @Query('categoryId', ParseIntPipe) categoryId: number,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ): Promise<[Product[], number]> {
    if (!categoryId) {
      throw new BadRequestException('Category ID is required.');
    }

    return this.productService.getProductsByCategory(
      categoryId,
      page,
      pageSize,
    );
  }

  @Public()
  @Get('search')
  async searchProductsByKeyword(
    @Query('keyword', new ValidationPipe({ transform: true })) keyword: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ): Promise<[Product[], number]> {
    if (!keyword) {
      throw new BadRequestException('Keyword is required.');
    }

    return this.productService.searchProductsByKeyword(keyword, page, pageSize);
  }

  @Public()
  @Get(':id')
  getById(@Param('id') id: number): Promise<Product | undefined> {
    return this.productService.getById(id);
  }
}
