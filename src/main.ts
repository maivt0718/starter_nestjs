import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)

  // add validation input
  app.useGlobalPipes(new ValidationPipe())

  const configSwagger = new DocumentBuilder()
  .setTitle("API youtube mini")
  .setDescription("List youtube API")
  .setVersion('1.0')
  .build() //builder pattern

  const swagger = SwaggerModule.createDocument(app,configSwagger)
  SwaggerModule.setup("swagger",app,swagger)

  const port = configService.get<number>('PORT') || 8080
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
