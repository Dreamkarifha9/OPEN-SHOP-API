import { Module } from '@nestjs/common';
import { ProductOnOrderService } from './product-on-order.service';
import { ProductOnOrderController } from './product-on-order.controller';

@Module({
  controllers: [ProductOnOrderController],
  providers: [ProductOnOrderService],
})
export class ProductOnOrderModule {}
