import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { productImageDto } from './product-image.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ImageDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    url: string;
}
/**
 * The class that represents the input that will perform the creation
 */
export class CreateProductImageDto extends OmitType(productImageDto, ['id', 'image_key', 'url'] as const) {
    @ApiProperty({ type: ImageDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => ImageDto)
    images: ImageDto[];
}

