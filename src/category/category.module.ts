import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prismaService/prisma.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService],
})
export class CategoryModule { }
