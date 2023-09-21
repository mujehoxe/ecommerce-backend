// order.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderedProduct } from './orderedProduct.entity';

type OrderStatus = 'pending' | 'accepted';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  state: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  status: OrderStatus = 'pending';

  @OneToMany(() => OrderedProduct, (orderedProduct) => orderedProduct.order, {
    eager: true,
    cascade: ['insert'],
  })
  orderedProducts: OrderedProduct[];

  @Column({ type: 'float', nullable: true })
  totalPrice?: number;
}
