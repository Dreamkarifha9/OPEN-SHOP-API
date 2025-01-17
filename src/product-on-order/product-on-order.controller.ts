import { Controller } from '@nestjs/common';
import { ProductOnOrderService } from './product-on-order.service';

@Controller('product-on-order')
export class ProductOnOrderController {
  constructor(private readonly productOnOrderService: ProductOnOrderService) {}
}
