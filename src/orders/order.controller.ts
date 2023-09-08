// order.controller.ts
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { CheckoutDto } from './dtos/checkout.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('checkout')
  async checkout(
    @Body(ValidationPipe) checkoutData: CheckoutDto,
  ): Promise<Order> {
    const order = await this.orderService.createOrder(checkoutData);
    return order;
  }
}
