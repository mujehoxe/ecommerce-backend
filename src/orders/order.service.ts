// order.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CheckoutDto } from './dtos/checkout.dto';
import { ProductService } from '../products/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    private readonly productService: ProductService,
  ) {}

  async createOrder(checkoutData: CheckoutDto): Promise<Order> {
    const order = new Order();

    // Store user information in the order
    order.firstName = checkoutData.first_name;
    order.lastName = checkoutData.last_name;
    order.state = checkoutData.state;
    order.phoneNumber = checkoutData.phoneNumber;
    order.address = checkoutData.address;

    order.orderedProducts = await Promise.all(
      checkoutData.products.map(async ({ productId, quantity }) => {
        const product = await this.productService.getById(productId);
        if (!product) {
          throw new Error(`Product with ID ${productId} not found.`);
        }
        return { product, quantity };
      }),
    );

    // order.totalPrice = calculateTotalPrice(order.orderedProducts);

    // Save the order
    return this.orderRepository.save(order);
  }
}
