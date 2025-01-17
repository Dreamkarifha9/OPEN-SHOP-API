import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Usr } from 'src/users/user.decorator';
import { AuthUser } from 'src/auth/auth-user';
import { SearchProduct } from './dto/search-product.dto';
import { productDto } from './dto/product.dto';
import { ProductsDto } from './dto/products.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  @ApiOkResponse({
    description: 'A successful response.',
    type: ProductsDto,
  })
  findAll(
    @Query()
    query: SearchProduct,
    @Usr() user: AuthUser,
  ) {
    Logger.log(`User ${JSON.stringify(user)}`);
    return this.productsService.findAll(query);
  }


  @Get(':id')
  @ApiOkResponse({
    description: 'A successful response.',
    type: productDto,
  })
  findOne(
    @Param('id') query: string,
    @Usr() user: AuthUser,
  ) {
    Logger.log(`User ${JSON.stringify(user)}`);
    return this.productsService.findOne(query);
  }


  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createRequest: CreateProductDto, @Usr() user: AuthUser,): Promise<void> {
    await this.productsService.create(createRequest, user);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateRequest: UpdateProductDto,
    @Usr() user: AuthUser,
  ): Promise<void> {
    await this.productsService.update(id, updateRequest, user);
  }
}
