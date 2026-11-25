import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Mismo prefijo que la ruta del Gateway (D2): así no hay que reescribir rutas.
  app.setGlobalPrefix('api/auth');

  const config = app.get(ConfigService);
  await app.listen(config.getOrThrow<number>('PORT'));
}
void bootstrap();
