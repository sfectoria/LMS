import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors({
      //Add your origins here
      origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        
      ],
    });
  app.useGlobalPipes(new ValidationPipe());
   app.useStaticAssets('upload', { prefix: '/upload' });




    const config = new DocumentBuilder()
      .setTitle('LMS example')
      .setDescription('The LMS API description')
      .setVersion('1.0')
      .addTag('LMS')
      .addApiKey(
        { type: 'apiKey', name: 'Authorization', in: 'header' },
        'apiKey',
      )
      .addTag('SFECTORIA')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(5000);
}
bootstrap();