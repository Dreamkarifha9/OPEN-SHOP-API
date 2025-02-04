import { Module } from '@nestjs/common';
import { ProductImageService } from './product-image.service';
import { ProductImageController } from './product-image.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prismaService/prisma.service';


@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ProductImageController],
  providers: [ProductImageService, PrismaService],
})
export class ProductImageModule { }
