// order.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
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

    return this.orderRepository.save(order);
  }

  async getAll(): Promise<Order[]> {
    return this.orderRepository.find({});
  }

  async getById(id: number): Promise<Order | undefined> {
    const product = await this.orderRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.getById(id);
    return await this.orderRepository.delete(id);
  }
}
