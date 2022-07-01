import { UseGuards, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from 'auth/passport/jwt-auth.guard';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));

  /** < Swagger Config */
  const options = new DocumentBuilder()
    .setTitle('Daredevil')
    .setDescription('Daredevil Api Documents')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  /** > Swagger Config */

  await app.listen(3000);
}
bootstrap();
