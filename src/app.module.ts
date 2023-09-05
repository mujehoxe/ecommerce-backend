import { Module } from '@nestjs/common';

import { ProductModule } from './products/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './categories/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_DATABASE || 'ecommerce',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductModule,
    CategoryModule,
  ],
})
export class AppModule {}
