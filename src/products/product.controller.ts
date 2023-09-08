import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  NotFoundException,
  UploadedFiles,
  UseInterceptors,
  Patch,
  Query,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { ProductService } from './product.service.js';
import { Product } from './product.entity.js';
import { CreateProductDto } from './dtos/create-product.dto.js';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateProductDto } from './dtos/update-product.dto.js';
import { customStorage } from './customStorage.js';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'images', maxCount: 4 },
        { name: 'thumbnail', maxCount: 1 },
      ],
      {
        storage: customStorage,
      },
    ),
  )
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Record<string, Express.Multer.File[]>,
  ): Promise<Product> {
    files['thumbnail'] && (createProductDto.thumbnail = files['thumbnail'][0]);
    files['images'] && (createProductDto.images = files['images']);

    return await this.productService.create(createProductDto);
  }

  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'images', maxCount: 4 },
        { name: 'thumbnail', maxCount: 1 },
      ],
      { storage: customStorage },
    ),
  )
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files: Record<string, Express.Multer.File[]>,
  ): Promise<Product> {
    try {
      files['thumbnail'] &&
        (updateProductDto.thumbnail = files['thumbnail'][0]);
      files['images'] && (updateProductDto.images = files['images']);

      return await this.productService.update(id, updateProductDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.productService.delete(id);
  }

  @Get()
  async getAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ): Promise<Product[]> {
    return this.productService.getAll(page, pageSize);
  }

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

  @Get('by-category')
  async getProductsByCategory(
    @Query('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<Product[]> {
    return this.productService.getProductsByCategory(categoryId);
  }

  @Get('search')
  async searchProductsByKeyword(
    @Query('keyword') keyword: string,
  ): Promise<Product[]> {
    return this.productService.searchProductsByKeyword(keyword);
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<Product | undefined> {
    return this.productService.getById(id);
  }
}
