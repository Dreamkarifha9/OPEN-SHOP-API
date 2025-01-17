import { OmitType } from '@nestjs/swagger';
import { CategorieDto } from './categorie.dto';


/**
 * The class that represents the input that will perform the creation
 */
export class CreateCategorieDto extends OmitType(CategorieDto, ['id'] as const) { }