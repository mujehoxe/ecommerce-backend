import {
  Controller,
  Post,
  Delete,
  Param,
  Body,
  NotFoundException,
  UploadedFiles,
  UseInterceptors,
  Patch,
} from '@nestjs/common';
import { ProductService } from './product.service.js';
import { Product } from './product.entity.js';
import { CreateProductDto } from './dtos/create-product.dto.js';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateProductDto } from './dtos/update-product.dto.js';
import { customStorage } from './customStorage.js';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('products')
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
}
