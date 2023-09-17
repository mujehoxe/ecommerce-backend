import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ required: false })
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty({
    description: 'Discount percentage',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  percentage: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  quantity: number;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The file to upload.',
    required: false,
  })
  @IsOptional()
  thumbnail?: Express.Multer.File;

  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    required: false,
  })
  @IsOptional()
  images?: Express.Multer.File[];

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  categoryName: string;
}
