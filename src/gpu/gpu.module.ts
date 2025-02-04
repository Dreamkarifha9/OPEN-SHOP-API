import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prismaService/prisma.service';
import { GpuController } from './gpu.controller';
import { GpuService } from './gpu.service';


@Module({
    imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
    controllers: [GpuController],
    providers: [GpuService, PrismaService],
})
export class GpuModule { }
