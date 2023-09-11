// order.controller.ts
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { CheckoutDto } from './dtos/checkout.dto';
import { DeleteResult } from 'typeorm';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('checkout')
  async checkout(
    @Body(ValidationPipe) checkoutData: CheckoutDto,
  ): Promise<Order> {
    return await this.orderService.createOrder(checkoutData);
  }

  @Get()
  async getAll(): Promise<Order[]> {
    return this.orderService.getAll();
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.orderService.delete(id);
  }
}
