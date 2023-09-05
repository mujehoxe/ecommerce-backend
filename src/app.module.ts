import { Module } from '@nestjs/common';

import { ProductModule } from './products/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './categories/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'ecommerce',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductModule,
    CategoryModule,
  ],
})
export class AppModule {}
