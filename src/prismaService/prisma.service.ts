import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({
            log: ['error', 'warn'],
        });
    }
    async onModuleInit() {
        console.log('Connecting Prisma Client');
        await this.$connect();
    }

    async onModuleDestroy() {
        console.log('Disconnecting Prisma Client');
        await this.$disconnect();
    }
}
