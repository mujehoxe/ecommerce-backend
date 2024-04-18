import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './orders/order.module.js';
import { FileController } from './file.controller.js';
import { ProductModule } from './products/product.module.js';
import { CategoryModule } from './categories/category.module.js';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { configDotenv } from 'dotenv';
import { APP_GUARD } from '@nestjs/core';
import { DefaultGuard } from './auth/auth.guard.js';

configDotenv();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: (process.env.DATABASE_TYPE as any) || 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.NODE_ENV === 'production',
    }),
    OrderModule,
    ProductModule,
    CategoryModule,
    AuthModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: DefaultGuard,
    },
  ],
  controllers: [FileController],
})
export class AppModule {}
