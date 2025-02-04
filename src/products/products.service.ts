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
    async findAll(search: SearchProduct, authUser: AuthUser): Promise<ProductsDto> {
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

        where.user_id = authUser.id;

        // Sorting
        const orderByField = sortBy || 'id';
        const orderDirection = orderBy?.toLowerCase() === 'desc' ? 'desc' : 'asc';
        Logger.debug(`where: ${JSON.stringify(where)}`);
        // Query data and count
        const [data, count] = await Promise.all([

            this.prisma.product.findMany({
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
                    amount: true,
                    created_at: true,
                    created_by: true,
                    updated_at: true,
                    updated_by: true,
                    images: {
                        select: {
                            id: true,
                            url: true,
                            product_id: true,
                        },
                    },
                },
            }),
            this.prisma.product.count({ where }),  // Count total records
        ]);

        // Transform data and create response
        const newData = plainToInstance(productDto, data as any[]);
        // Logger.debug(`newData: ${JSON.stringify(newData)}`);
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
        const product = await this.prisma.product.findFirst({
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
                amount: true,
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
        // Check for duplicate name in "products" (not "categories")
        const existingProduct = await this.prisma.product.findFirst({
            where: { name: createRequest.name },
        });

        if (existingProduct) {
            throw new ConflictException('Product with this name already exists');
        }

        // Ensure `category_id` and `user_id` are correct types (UUID strings)
        const newProduct = await this.prisma.product.create({
            data: {
                id: uuid.v4(), // Generate UUID
                name: createRequest.name,
                description: createRequest.description,
                price: createRequest.price,
                price_sale: createRequest.price_sale,
                sn: createRequest.sn,
                active: createRequest.active ?? true,
                deleted: createRequest.deleted ?? false,
                created_at: new Date(),
                created_by: authUser.id, // Ensure it's a string (UUID)
                category_id: createRequest.category_id, // Nullable
                user_id: authUser.id, // Ensure it's a UUID string
                // Prisma automatically updates `updated_at`, so omit `null`
                updated_by: authUser.id,
                updated_at: new Date(),
                amount: createRequest.amount,

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
                updated_at: true, // Prisma auto-handles this
                updated_by: true, // Nullable

                // Do not explicitly set `null` for relations; just omit them.
                user: false,
                categories: false,
                images: false,
                order: false,
            }
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
            const updatedUser: productDto = await this.prisma.product.update({
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
                    amount: true,
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
