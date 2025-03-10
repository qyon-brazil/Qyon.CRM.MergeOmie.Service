import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvConfig } from './infra/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(EnvConfig.APPLICATION_PORT);
}
bootstrap();
