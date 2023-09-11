import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './orders/order.module.js';
import { FileController } from './file.controller.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    OrderModule,
  ],
  controllers: [FileController],
})
export class AppModule {}
