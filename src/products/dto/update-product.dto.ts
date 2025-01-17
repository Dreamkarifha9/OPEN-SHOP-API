import { PickType } from '@nestjs/swagger';
import { productDto } from './product.dto';

export class UpdateProductDto extends PickType(productDto, ['name', 'description', 'price', 'active', 'deleted'] as const) { }
