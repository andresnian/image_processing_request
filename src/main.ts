import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const options = new DocumentBuilder()
  .setTitle('Image Processing Request')
  .setDescription('Microservice to process image and resize it')
  .setVersion('1.0.0')
  .build();
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api/docs', app, document)

  await app.listen(8080);
}
bootstrap();
