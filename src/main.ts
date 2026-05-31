import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. CORS ENABLE (Sangat Penting agar browser di luar server bisa akses Swagger)
  app.enableCors();

  // 2. GLOBAL VALIDATION
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 3. SWAGGER CONFIG
  const config = new DocumentBuilder()
    .setTitle('Transportasi Bus API')
    .setDescription('Backend API Sistem Pemesanan Tiket Bus')
    .setVersion('1.0')
    // FIX: Jangan hardcode URL Railway di .addServer() karena Swagger otomatis menyesuaikan dengan domain tempat ia dibuka
    .addServer('/') 
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

  // 4. PORT BINDING (Diambil langsung dari variable port untuk konsistensi log)
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Server running on port: ${port}`);
  console.log(`📘 Swagger ready at: /api`);
}

bootstrap();