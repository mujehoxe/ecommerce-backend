import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../products/product.entity';

@Entity()
export class OrderedProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderedProducts)
  order: Order;

  @ManyToOne(() => Product, { cascade: true })
  product: Product;

  @Column()
  quantity: number;
}
