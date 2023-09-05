// src/products/dtos/update-product.dto.ts
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  percentage?: number;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  thumbnail?: Express.Multer.File;

  @IsOptional()
  images?: Express.Multer.File[];

  @IsOptional()
  @IsString()
  categoryName?: string;
}
