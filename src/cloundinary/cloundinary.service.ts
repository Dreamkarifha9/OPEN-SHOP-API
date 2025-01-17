// src/cloudinary/cloudinary.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: 'products', transformation: { width: 'auto', crop: 'scale' } },
                (error, result) => {
                    if (error) return reject(error);
                    Logger.log(`Uploaded file: ${JSON.stringify(result)}`);
                    resolve(result);
                },
            ).end(file.buffer);
        });
    }

    async deleteImage(publicId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(publicId, (error, result) => {
                if (error) return reject(error);
                resolve();
            });
        });
    }
}
