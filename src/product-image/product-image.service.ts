import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prismaService/prisma.service';
import * as uuid from 'uuid';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { AuthUser } from 'src/auth/auth-user';
@Injectable()
export class ProductImageService {
    constructor(private readonly prisma: PrismaService) { }
    async create(createRequest: CreateProductImageDto, authUser: AuthUser) {

        if (Array.isArray(createRequest.images)) {
            // Create multiple images
            const newProductImages = await Promise.all(
                createRequest.images.map(async (image) => {
                    return await this.prisma.productImage.create({
                        data: {
                            id: uuid.v4(), // Generate UUID
                            product_id: createRequest.product_id,
                            image_key: image.id,
                            url: image.url,
                            created_at: new Date(),
                            created_by: authUser.id, // Ensure it's a string (UUID)
                            updated_by: authUser.id,
                            updated_at: new Date(),
                            active: true,
                            deleted: false
                        },
                        select: {
                            id: true,
                            product_id: true,
                            image_key: true,
                            url: true,
                            created_at: true,
                            created_by: true,
                            updated_at: true, // Prisma auto-handles this
                            updated_by: true, // Nullable
                        }
                    });
                })
            );

            return newProductImages
        }

    }

}
