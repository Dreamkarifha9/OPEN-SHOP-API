// src/cloudinary/cloudinary.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryProvider } from './cloundinary.provider';
import { CloudinaryController } from './cloundinary.controller';
import { CloudinaryService } from './cloundinary.service';


@Module({
    imports: [ConfigModule],
    controllers: [CloudinaryController],
    providers: [CloudinaryProvider, CloudinaryService],
    exports: [CloudinaryProvider],
})
export class CloudinaryModule { }
