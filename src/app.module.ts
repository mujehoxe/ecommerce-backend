import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './orders/order.module.js';
import { FileController } from './file.controller.js';
import * as dotenv from 'dotenv';
import { ProductModule } from './products/product.module.js';
import { CategoryModule } from './categories/category.module.js';
import { join } from 'node:path';
import { ServeStaticModule } from '@nestjs/serve-static';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: (process.env.DATABASE_TYPE as any) || 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.NODE_ENV === 'production',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'admin'),
      serveRoot: '/admin',
    }),
    OrderModule,
    ProductModule,
    CategoryModule,
  ],
  controllers: [FileController],
})
export class AppModule {}
