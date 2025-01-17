import { ApiProperty } from '@nestjs/swagger';
import { IResponse } from 'src/shared/interfaces';
import { productDto } from './product.dto';



export class ProductsDto implements IResponse<productDto[]> {
    @ApiProperty()
    success: boolean;

    @ApiProperty()
    error: string[];

    @ApiProperty({
        type: productDto,
        isArray: true,
    })
    data: productDto[];

    @ApiProperty()
    currentPage?: number;

    @ApiProperty()
    perPage?: number;

    @ApiProperty()
    totalPage?: number;

    @ApiProperty()
    total?: number;
}
