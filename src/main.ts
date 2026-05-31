import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 GLOBAL VALIDATION
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 🚀 IMPORTANT: Railway PORT + fallback local
  const port = process.env.PORT || 3000;

  // 🌐 FIX BASE URL (Railway + local safe)
  const baseUrl =
    process.env.BASE_URL ||
    `https://transportasi-bus-production.up.railway.app`;

  // 📘 SWAGGER CONFIG
  const config = new DocumentBuilder()
    .setTitle('Transportasi Bus API')
    .setDescription('Backend API Sistem Pemesanan Tiket Bus')
    .setVersion('1.0')
    .addServer(baseUrl)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // 🔥 CRITICAL FIX: Railway must bind 0.0.0.0
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Server running on port: ${port}`);
  console.log(`📘 Swagger: ${baseUrl}/api`);
}

bootstrap();