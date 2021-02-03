import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap-main');
  const app = await NestFactory.create(AppModule);
  const PORT = 3000;
  const options = new DocumentBuilder()
    .setTitle('API AUTH')
    .setDescription('Example auth api')
    .setVersion('1.8')
    .addTag('crawling')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT, () => {
    logger.log(`\n\napp running at port ${PORT}\n\n`)
  });
}
bootstrap();
