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
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateProductDto } from './dtos/update-product.dto';
import { customStorage } from './customStorage';

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
    createProductDto.thumbnail = files['thumbnail'][0];
    createProductDto.images = files['images'];

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
  async updateProduct(
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
  deleteProduct(@Param('id') id: number): Promise<void> {
    return this.productService.delete(id);
  }

  @Get(':id')
  getProductById(@Param('id') id: number): Promise<Product | undefined> {
    return this.productService.getProductById(id);
  }

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }
}
