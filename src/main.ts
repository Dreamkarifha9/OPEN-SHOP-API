import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import multipart from '@fastify/multipart';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService: ConfigService = app.get(ConfigService);
  const env = configService.get('NODE_ENV', '');
  const version = 'v1.0';
  const globalPrefix = `/api/${version}`;
  app.setGlobalPrefix(globalPrefix);

  // ใช้ ValidationPipe ทั่วทั้งแอป
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // ตั้งค่า Swagger สำหรับ environment "development"
  if (env === 'development') {
    const options = new DocumentBuilder()
      .setTitle('OPENSHOP SYSTEM API')
      .setDescription('The OPENSHOP SYSTEM API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api/docs', app, document);
  }

  // เปิดใช้งาน CORS
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGINS', '*').split(','),
    credentials: true,
  });
  await app.register(multipart);
  await app.startAllMicroservices();
  const port = configService.get('PORT') || '3000';
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`with ${env} environment`);
  console.log(`docs ${await app.getUrl()}/api/docs`);
}
bootstrap();
