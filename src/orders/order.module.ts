import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ProductModule } from '../products/product.module';
import { OrderedProduct } from './orderedProduct.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderedProduct]), ProductModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
