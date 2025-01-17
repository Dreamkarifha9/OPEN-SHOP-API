import { ApiPropertyOptional } from '@nestjs/swagger';

import { BaseSearchDataDto } from 'src/shared/dto';
export class SearchUser extends BaseSearchDataDto {
    @ApiPropertyOptional({ type: String })
    user_name?: string;
}
