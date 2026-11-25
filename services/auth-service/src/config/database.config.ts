import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function buildDatabaseConfig(config: ConfigService): TypeOrmModuleOptions {
  return {
    type: 'mysql',
    host: config.getOrThrow<string>('DB_HOST'),
    port: config.getOrThrow<number>('DB_PORT'),
    username: config.getOrThrow<string>('DB_USERNAME'),
    password: config.getOrThrow<string>('DB_PASSWORD'),
    database: config.getOrThrow<string>('DB_DATABASE'),
    autoLoadEntities: true,
    synchronize: config.getOrThrow<string>('DB_SYNCHRONIZE') === 'true',
    // En Kubernetes MySQL puede tardar más que la app en arrancar; se reintenta en vez de caerse.
    retryAttempts: 10,
    retryDelay: 3000,
  };
}
