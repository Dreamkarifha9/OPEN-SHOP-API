import { ApiPropertyOptional } from '@nestjs/swagger';

import { BaseSearchDataDto } from 'src/shared/dto';
export class SearchProduct extends BaseSearchDataDto {
    @ApiPropertyOptional({ type: String })
    name?: string;
}
