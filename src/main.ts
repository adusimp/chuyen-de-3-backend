import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('Swagger API documentation for project')
    .setVersion('1.0.0')
    .addBearerAuth() // nếu có auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.enableCors('*');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
