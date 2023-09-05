import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateProductDto } from './dtos/update-product.dto';
import { customStorage } from './customStorage';
import { createHash } from 'crypto';

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
    createProductDto.images = files['images'];
    createProductDto.thumbnail = files['thumbnail'][0];

    return await this.productService.create(createProductDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
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
    return this.productService.deleteProduct(id);
  }

  @Get(':id')
  getProductById(@Param('id') id: number): Promise<Product | undefined> {
    return this.productService.getProductById(id);
  }

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  createMd5Hash(file: Express.Multer.File): string {
    const md5Hash = createHash('md5');
    md5Hash.update(file.buffer); // Use the file's buffer to calculate the hash
    return md5Hash.digest('hex'); // Return the hash in hexadecimal format
  }
}
