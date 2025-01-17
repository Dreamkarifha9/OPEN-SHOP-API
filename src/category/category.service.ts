import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { CategorieDto } from './dto/categorie.dto';
import { PrismaService } from 'src/prismaService/prisma.service';
import { SearchCategorie } from './dto/search-categorie.dto';
import { CategoriesDto } from './dto/categories.dto';
import { plainToInstance } from 'class-transformer';
import { AuthUser } from 'src/auth/auth-user';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import * as uuid from 'uuid';
@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) { }
    async findAll(search: SearchCategorie): Promise<CategoriesDto> {
        const { page, size, query, active, deleted, sortBy, orderBy, name } = search;

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
        if (name?.length) {
            where.name = { contains: name, mode: 'insensitive' };
        }

        // Sorting
        const orderByField = sortBy || 'id';
        const orderDirection = orderBy?.toLowerCase() === 'desc' ? 'desc' : 'asc';

        // Query data and count
        const [data, count] = await Promise.all([
            this.prisma.categories.findMany({
                where,
                skip: skip,  // Ensure skip is properly passed
                take: take,  // Ensure take is properly passed
                orderBy: { [orderByField]: orderDirection },
                select: {
                    id: true,
                    name: true,
                    active: true,
                    deleted: false,
                    created_at: true,
                    created_by: true,
                    updated_by: true,
                    updated_at: true,
                },
            }),
            this.prisma.categories.count({ where }),  // Count total records
        ]);

        // Transform data and create response
        const newData = plainToInstance(CategorieDto, data as CategorieDto[]);

        const result = new CategoriesDto();
        result.currentPage = page;
        result.total = count;
        result.perPage = size;
        result.success = true;
        result.error = [];
        result.totalPage = Math.ceil(count / size);
        result.data = newData;

        return result;
    }


    async findOne(id: string): Promise<CategorieDto> {
        const category = await this.prisma.categories.findFirst({
            where: { id },
            select: {
                id: true,
                name: true,
                created_at: true,
                created_by: true,
                updated_at: true,
                updated_by: true,
            },
        });

        if (!category) {
            throw new ConflictException('Category not found');
        }

        return category;
    }

    async create(createRequest: CreateCategorieDto, authUser: AuthUser) {

        // Check for duplicate name
        const existingCategory = await this.prisma.categories.findFirst({
            where: { name: createRequest.name },
        });

        if (existingCategory) {
            throw new ConflictException('Category with this name already exists');
        }

        const newCategory: CategorieDto = await this.prisma.categories.create({
            data: {
                id: uuid.v4(),
                ...createRequest,
                created_by: authUser.id,
                created_at: new Date(),
                updated_by: null, // Ensure updated_by is provided
                updated_at: null,  // Ensure updated_at is provided
            },
            select: {
                id: true,
                name: true,
                created_at: true,
                created_by: true,
                updated_at: true,
                updated_by: true,
            },
        });

        return newCategory;

    }
    async update(
        categoryId: string,
        updateRequest: UpdateCategorieDto,
        authUser: AuthUser,
    ): Promise<CategorieDto> {
        // Check for duplicate name
        const existingCategory = await this.prisma.categories.findFirst({
            where: { name: updateRequest.name, id: { not: categoryId } },
        });

        if (existingCategory) {
            throw new ConflictException('Category with this name already exists');
        }

        try {
            const updatedUser: CategorieDto = await this.prisma.categories.update({
                where: { id: categoryId },
                data: {
                    ...updateRequest,
                    updated_at: new Date(),
                    updated_by: authUser.id,
                },
                select: { id: true, name: true, created_at: true, created_by: true, updated_at: true, updated_by: true },
            });

            return updatedUser;
        } catch (err) {
            Logger.error(JSON.stringify(err));
            throw new ConflictException();
        }
    }

}
