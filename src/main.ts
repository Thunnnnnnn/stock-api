import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  const server = app.getHttpServer();
  const address = server.address();
  console.log(`Application is running on: ${address.port}`);
}

bootstrap();