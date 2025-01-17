import { OmitType } from '@nestjs/swagger';
import { productDto } from './product.dto';


/**
 * The class that represents the input that will perform the creation
 */
export class CreateProductDto extends OmitType(productDto, ['id', 'user_id'] as const) { }