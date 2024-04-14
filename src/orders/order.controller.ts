import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Delete,
  Param,
  Get,
  Patch,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { CheckoutDto } from './dtos/checkout.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@Controller('orders')
@ApiTags('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('checkout')
  async checkout(
    @Body(ValidationPipe) checkoutData: CheckoutDto,
  ): Promise<Order> {
    return await this.orderService.createOrder(checkoutData);
  }

  @Patch('archive/:id')
  async archive(@Param('id') id: number): Promise<UpdateResult> {
    return await this.orderService.archive(id);
  }

  @Patch('decline/:id')
  async decline(@Param('id') id: number): Promise<UpdateResult> {
    return await this.orderService.decline(id);
  }

  @Patch('accept/:id')
  async accept(@Param('id') id: number): Promise<UpdateResult> {
    try {
      return await this.orderService.accept(id);
    } catch (error) {
      if (
        error.message === 'Order alredy accepted' ||
        error.message === 'Insufficient quantity available for sale'
      ) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }

  @Get()
  async getAll(@Query('archived') archivedParam: string): Promise<Order[]> {
    const archived: boolean = archivedParam === 'true';

    return this.orderService.getAll(archived);
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Order> {
    return this.orderService.getById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.orderService.delete(id);
  }
}
