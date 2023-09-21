import {
  IsString,
  IsArray,
  ValidateNested,
  IsInt,
  Min,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class CheckoutProductDto {
  @ApiProperty({
    description: 'The product ID',
    minimum: 1,
    type: 'integer',
  })
  @IsInt()
  @Min(1)
  productId: number;

  @ApiProperty({
    description: 'The quantity of the product',
    minimum: 1,
    type: 'integer',
  })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CheckoutDto {
  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  last_name: string;

  @ApiProperty({
    nullable: true,
  })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty({
    type: CheckoutProductDto,
    isArray: true,
    description: 'An array of products in the checkout',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckoutProductDto)
  orderedProducts: CheckoutProductDto[];

  @ApiProperty()
  totalPrice: number;
}
