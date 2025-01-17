import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prismaService/prisma.service';
import { SearchProduct } from './dto/search-product.dto';
import { ProductsDto } from './dto/products.dto';
import { plainToInstance } from 'class-transformer';
import { productDto } from './dto/product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthUser } from 'src/auth/auth-user';
import * as uuid from 'uuid';
import { UpdateProductDto } from './dto/update-product.dto';
@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) { }
    async findAll(search: SearchProduct): Promise<ProductsDto> {
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
            this.prisma.products.findMany({
                where,
                skip: skip,  // Ensure skip is properly passed
                take: take,  // Ensure take is properly passed
                orderBy: { [orderByField]: orderDirection },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    active: true,
                    deleted: true,
                    category_id: true,
                    user_id: true,
                    created_at: true,
                    created_by: true,
                    updated_at: true,
                    updated_by: true,
                },
            }),
            this.prisma.categories.count({ where }),  // Count total records
        ]);

        // Transform data and create response
        const newData = plainToInstance(productDto, data as productDto[]);

        const result = new ProductsDto();
        result.currentPage = page;
        result.total = count;
        result.perPage = size;
        result.success = true;
        result.error = [];
        result.totalPage = Math.ceil(count / size);
        result.data = newData;

        return result;
    }


    async findOne(id: string): Promise<productDto> {
        const product = await this.prisma.products.findFirst({
            where: { id },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                price_sale: true,
                sn: true,
                active: true,
                deleted: true,
                category_id: true,
                user_id: true,
                created_at: true,
                created_by: true,
                updated_at: true,
                updated_by: true,
            },
        });

        if (!product) {
            throw new ConflictException('Product not found');
        }

        return product;
    }

    async create(createRequest: CreateProductDto, authUser: AuthUser) {

        // Check for duplicate name
        const existingProduct = await this.prisma.categories.findFirst({
            where: { name: createRequest.name },
        });

        if (existingProduct) {
            throw new ConflictException('Product with this name already exists');
        }

        const newProduct: CreateProductDto = await this.prisma.products.create({
            data: {
                id: uuid.v4(),
                ...createRequest,
                user_id: authUser.id,
                created_by: authUser.id,
                created_at: new Date(),
                updated_by: null, // Ensure updated_by is provided
                updated_at: null,  // Ensure updated_at is provided
            },
            select: {
                id: true,
                sn: true,
                price_sale: true,
                name: true,
                price: true,
                description: true,
                category_id: true,
                user_id: true,
                created_at: true,
                created_by: true,
                updated_at: true,
                updated_by: true,
            },
        });

        return newProduct;

    }
    async update(
        productId: string,
        updateRequest: UpdateProductDto,
        authUser: AuthUser,
    ): Promise<productDto> {
        // Check for duplicate name
        const existingProduct = await this.prisma.categories.findFirst({
            where: { name: updateRequest.name, id: { not: productId } },
        });

        if (existingProduct) {
            throw new ConflictException('Product with this name already exists');
        }

        try {
            const updatedUser: productDto = await this.prisma.products.update({
                where: { id: productId },
                data: {
                    ...updateRequest,
                    updated_at: new Date(),
                    updated_by: authUser.id,
                },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    sn: true,
                    price_sale: true,
                    description: true,
                    category_id: true,
                    user_id: true,
                    created_at: true,
                    created_by: true,
                    updated_at: true,
                    updated_by: true,
                },
            });

            return updatedUser;
        } catch (err) {
            Logger.error(JSON.stringify(err));
            throw new ConflictException();
        }
    }

}
