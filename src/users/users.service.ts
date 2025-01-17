import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prismaService/prisma.service';
import { plainToInstance } from 'class-transformer';
import { SearchUser } from './dto/search-user.dto';
import { UsersDto } from './dto/users.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(search: SearchUser): Promise<UsersDto> {
    const { page, size, query, active, deleted, sortBy, orderBy, user_name } = search;

    const skip = (page - 1) * size;  // Calculate skip value
    const take = size;  // Define take (limit)

    // Common conditions for "active" and "deleted"
    const where: any = {};
    if (typeof active !== 'undefined') {
      where.active = active;
    }
    if (typeof deleted !== 'undefined') {
      where.deleted = deleted;
    }

    // Add search query
    if (query) {
      where.OR = [
        { id: { contains: query, mode: 'insensitive' } },
        // Add more fields if needed for search
      ];
    }

    // Filter by userName
    if (user_name?.length) {
      where.user_name = { contains: user_name, mode: 'insensitive' };
    }

    // Sorting
    const orderByField = sortBy || 'id';
    const orderDirection = orderBy?.toLowerCase() === 'desc' ? 'desc' : 'asc';

    // Query data and count
    const [data, count] = await Promise.all([
      this.prisma.users.findMany({
        where,
        skip: skip,  // Ensure skip is properly passed
        take: take,  // Ensure take is properly passed
        orderBy: { [orderByField]: orderDirection },
        select: {
          id: true,
          user_name: true,
          email: true,
          first_name: true,
          last_name: true,
          created_at: true,
          created_by: true,
          updated_by: true,
          updated_at: true,
        },
      }),
      this.prisma.users.count({ where }),  // Count total records
    ]);

    // Transform data and create response
    const newData = plainToInstance(UserDto, data as UserDto[]);

    const result = new UsersDto();
    result.currentPage = page;
    result.total = count;
    result.perPage = size;
    result.success = true;
    result.error = [];
    result.totalPage = Math.ceil(count / size);
    result.data = newData;

    return result;
  }
  async updateUser(
    userId: string,
    updateRequest: UpdateUserDto,
  ): Promise<UserDto> {
    try {
      const updatedUser: UserDto = await this.prisma.users.update({
        where: { id: userId },
        data: {
          ...updateRequest,
        },
        select: { user_name: true, email: true, first_name: true, last_name: true, id: true, created_at: true, created_by: true, updated_at: true, updated_by: true, salt: true, password: true },
      });

      return updatedUser;
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new ConflictException();
    }
  }
}
