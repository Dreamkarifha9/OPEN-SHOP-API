import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prismaService/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { ProductImageModule } from './product-image/product-image.module';
import { ProductOnOrderModule } from './product-on-order/product-on-order.module';
import { CloudinaryModule } from './cloundinary/cloundinary.module';
import { GpuModule } from './gpu/gpu.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), UsersModule, AuthModule, ProductsModule, CategoryModule, ProductImageModule, ProductOnOrderModule, CloudinaryModule, GpuModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
