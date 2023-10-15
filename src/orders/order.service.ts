// order.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  DeleteResult,
  EntityManager,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Order } from './order.entity';
import { CheckoutDto } from './dtos/checkout.dto';
import { ProductService } from '../products/product.service';
import { OrderedProduct } from './orderedProduct.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    private readonly productService: ProductService,

    private dataSource: DataSource,
  ) {}

  async createOrder(checkoutData: CheckoutDto): Promise<Order> {
    const order = new Order();

    order.firstName = checkoutData.first_name;
    order.lastName = checkoutData.last_name;
    order.state = checkoutData.state;
    order.phoneNumber = checkoutData.phoneNumber;
    order.address = checkoutData.address;
    order.totalPrice = checkoutData.totalPrice;

    order.orderedProducts = await Promise.all(
      checkoutData.orderedProducts.map(async ({ productId, quantity }) => {
        const orderedProduct = new OrderedProduct();
        orderedProduct.product = await this.productService.getById(productId);
        orderedProduct.quantity = quantity;
        return orderedProduct;
      }),
    );

    return this.orderRepository.save(order);
  }

  async archive(id: number): Promise<UpdateResult> {
    return await this.orderRepository.update(
      { id: id },
      { status: 'archived' },
    );
  }

  async decline(id: number): Promise<UpdateResult> {
    return await this.orderRepository.update(
      { id: id },
      { status: 'declined' },
    );
  }

  async accept(id: number): Promise<UpdateResult> {
    const order = await this.getById(id);

    if (order.status === 'accepted') throw new Error('Order alredy accepted');

    const res = await this.dataSource.transaction(async (manager) => {
      for (const orderedProduct of order.orderedProducts)
        await this.sellProduct(orderedProduct, manager);
    });

    console.log(res);

    return await this.orderRepository.update(
      { id: id },
      { status: 'accepted' },
    );
  }

  async sellProduct(
    orderedProduct: OrderedProduct,
    queryManager: EntityManager,
  ) {
    const { product, quantity: quantitySold } = orderedProduct;
    if (product.quantity >= quantitySold) {
      await queryManager.update(
        Product,
        { id: product.id },
        {
          quantity: product.quantity - quantitySold,
        },
      );
    } else {
      throw new Error('Insufficient quantity available for sale');
    }
  }

  async getAll(archived: boolean): Promise<Order[]> {
    let query = this.orderRepository.createQueryBuilder('order');

    if (archived === true) {
      query = query.where('status = :status', { status: 'archived' });
    } else {
      query = query.where('status != :status', { status: 'archived' });
    }

    return query
      .leftJoinAndSelect('order.orderedProducts', 'orderedProducts')
      .leftJoinAndSelect('orderedProducts.product', 'product')
      .getMany();
  }

  async getById(id: number): Promise<Order> {
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderedProducts', 'orderedProducts')
      .leftJoinAndSelect('orderedProducts.product', 'product')
      .where('order.id = :id', { id })
      .getOne();

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.getById(id);
    return await this.orderRepository.delete(id);
  }
}
