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
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service.js';
import { Product } from './product.entity.js';
import { CreateProductDto } from './dtos/create-product.dto.js';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateProductDto } from './dtos/update-product.dto.js';
import { customStorage } from './customStorage.js';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

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
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProductDto })
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Record<string, Express.Multer.File[]>,
  ): Promise<Product> {
    this.retrieveFilesInDTO(files, createProductDto);

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
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateProductDto })
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files: Record<string, Express.Multer.File[]>,
  ): Promise<Product> {
    try {
      this.retrieveFilesInDTO(files, updateProductDto);

      return await this.productService.update(id, updateProductDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  private retrieveFilesInDTO(
    files: Record<string, Express.Multer.File[]>,
    DTO: CreateProductDto | UpdateProductDto,
  ) {
    files && files['thumbnail'] && (DTO.thumbnail = files['thumbnail'][0]);
    files && files['images'] && (DTO.images = files['images']);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.productService.delete(id);
  }

  @Get()
  async getAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ): Promise<[Product[], number]> {
    return this.productService.getAll(page, pageSize);
  }

  @Get('count')
  async getCount(): Promise<number> {
    return this.productService.getCount();
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

  @Get(':id')
  getById(@Param('id') id: number): Promise<Product | undefined> {
    return this.productService.getById(id);
  }
}
