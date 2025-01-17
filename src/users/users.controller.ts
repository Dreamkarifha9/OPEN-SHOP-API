import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, HttpCode, UseGuards, HttpStatus, ParseIntPipe, UnauthorizedException, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { SearchUser } from './dto/search-user.dto';
import { UsersDto } from './dto/users.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Usr } from './user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUser } from 'src/auth/auth-user';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard())
  @Get()
  @ApiOkResponse({
    description: 'A successful response.',
    type: UsersDto,
  })
  findAll(
    @Query()
    query: SearchUser,
    @Usr() user: AuthUser,
  ) {
    Logger.log(`User ${JSON.stringify(user)}`);
    return this.usersService.findAll(query);
  }

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard())
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('id') id: string,
    @Body() updateRequest: UpdateUserDto,
    @Usr() user: AuthUser,
  ): Promise<void> {
    if (id !== user.id) {
      throw new UnauthorizedException();
    }
    await this.usersService.updateUser(id, updateRequest);
  }

}
