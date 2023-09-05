import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNumber()
  @IsOptional()
  percentage: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsOptional()
  thumbnail?: Express.Multer.File;

  @IsOptional()
  images?: Express.Multer.File[];

  @IsString()
  @IsOptional()
  categoryName: string;
}
