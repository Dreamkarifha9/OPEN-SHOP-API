import { PickType } from '@nestjs/swagger';
import { CategorieDto } from './categorie.dto';

export class UpdateCategorieDto extends PickType(CategorieDto, ['name', 'active', 'deleted'] as const) { }
