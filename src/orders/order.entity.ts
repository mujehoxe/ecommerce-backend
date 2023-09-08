// order.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Product } from '../products/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  state: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @ManyToMany(() => Product, { eager: true })
  @JoinTable()
  orderedProducts: { product: Product; quantity: number }[];
}
