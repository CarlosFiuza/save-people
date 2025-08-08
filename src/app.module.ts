import { AuthModule } from '@/modules/auth/auth.module';
import { PersonModule } from '@/modules/person/person.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import datasource from '@/infra/orm/typeorm/datasource';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(datasource.options),
    PersonModule,
    AuthModule,
  ],
})
export class AppModule {}