import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ProductImageService } from './product-image.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Usr } from 'src/users/user.decorator';
import { AuthUser } from 'src/auth/auth-user';
import { CreateProductImageDto } from './dto/create-product-image.dto';

@Controller('product-image')

@ApiBearerAuth()
@UseGuards(AuthGuard())
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) { }


  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createRequest: CreateProductImageDto, @Usr() user: AuthUser) {
    return await this.productImageService.create(createRequest, user);
  }

}
