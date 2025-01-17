import { Controller, Delete, HttpCode, HttpStatus, Param, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';

import { ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
import { CloudinaryService } from './cloundinary.service';
import { FastifyRequest } from 'fastify';

import {
    FileFastifyInterceptor,
} from "fastify-file-interceptor";
import { Usr } from 'src/users/user.decorator';
import { AuthUser } from 'src/auth/auth-user';


@ApiTags('upload')
@Controller('upload')
export class CloudinaryController {
    constructor(private readonly cloudinaryService: CloudinaryService) { }

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' },
            },
        },
    })
    @UseInterceptors(FileFastifyInterceptor('file')) // Handle file upload using FileInterceptor
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new Error('No file uploaded');
        }

        // Upload the file to Cloudinary
        const result = await this.cloudinaryService.uploadFile(file);

        // Return the uploaded file details, including the secure URL for accessing the file
        return {
            message: 'File uploaded successfully',
            url: result.secure_url, // Secure URL of the uploaded file
            filename: result.public_id, // Cloudinary's public ID for the file
        };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async delete(
        @Param('id') id: string,
    ): Promise<void> {
        await this.cloudinaryService.deleteImage(id);
    }
}