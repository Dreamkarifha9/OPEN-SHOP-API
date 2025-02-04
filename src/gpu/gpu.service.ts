import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prismaService/prisma.service';
import { gpuDto } from './dto/gpu.dto';

@Injectable()
export class GpuService {
    constructor(private readonly prisma: PrismaService) { }
    async findAll(): Promise<Partial<any>> {
        const gpus = await this.prisma.gpu.findMany({ select: { id: true, model: true, memory_size: true } });
        if (Array.isArray(gpus) && gpus.length > 0) {

            return gpus.map((gpu) => {

                return {
                    id: gpu.id,
                    model: gpu.model.split(" ").slice(1).join(" ") + " " + gpu.memory_size / 1024 + 'GB',

                }
            });
        }
    }

}
