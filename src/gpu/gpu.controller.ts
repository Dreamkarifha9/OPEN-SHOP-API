import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GpuService } from './gpu.service';


@Controller('gpus')

@ApiBearerAuth()
@UseGuards(AuthGuard())
export class GpuController {
    constructor(private readonly gpuService: GpuService) { }


    @Get('')
    @HttpCode(HttpStatus.OK)
    async getGpus() {
        return await this.gpuService.findAll();
    }

}
