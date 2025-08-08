import { AuthModule } from '@/modules/auth/auth.module';
import { User } from '@/modules/auth/entities/user.entity';
import { Person } from '@/modules/person/entities/person.entity';
import { PersonModule } from '@/modules/person/person.module';
import { Address } from '@/modules/person/entities/address.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const isCloud = config.get<string>('APP_ENV') === 'cloud';
        return {
          type: 'postgres',
          url: config.get<string>('POSTGRES_URL'),
          ssl: isCloud ? { rejectUnauthorized: false } : undefined,
          entities: [Person, Address, User],
          synchronize: true,
        };
      },
    }),
    PersonModule,
    AuthModule,
  ],
})
export class AppModule {}