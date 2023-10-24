import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.SEED_EXECUTE == '1') {
    require('./database/seeds/comunidade_nazare');
  }
  await app.listen(3000);
}
bootstrap();
