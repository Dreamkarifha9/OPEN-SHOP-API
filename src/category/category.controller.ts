import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Usr } from 'src/users/user.decorator';
import { AuthUser } from 'src/auth/auth-user';
import { SearchCategorie } from './dto/search-categorie.dto';
import { CategorieDto } from './dto/categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { CreateCategorieDto } from './dto/create-categorie.dto';

@Controller('category')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  @ApiOkResponse({
    description: 'A successful response.',
    type: CategorieDto,
  })
  findAll(
    @Query()
    query: SearchCategorie,
    @Usr() user: AuthUser,
  ) {
    Logger.log(`User ${JSON.stringify(user)}`);
    return this.categoryService.findAll(query);
  }


  @Get(':id')
  @ApiOkResponse({
    description: 'A successful response.',
    type: CategorieDto,
  })
  findOne(
    @Param('id') query: string,
    @Usr() user: AuthUser,
  ) {
    Logger.log(`User ${JSON.stringify(user)}`);
    return this.categoryService.findOne(query);
  }


  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createRequest: CreateCategorieDto, @Usr() user: AuthUser,): Promise<void> {
    await this.categoryService.create(createRequest, user);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateRequest: UpdateCategorieDto,
    @Usr() user: AuthUser,
  ): Promise<void> {
    await this.categoryService.update(id, updateRequest, user);
  }
}
