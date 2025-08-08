import { AuthModule } from '@/modules/auth/auth.module';
import { User } from '@/modules/auth/entities/user.entity';
import { Person } from '@/modules/person/entities/person.entity';
import { PersonModule } from '@/modules/person/person.module';
import { Address } from '@/modules/person/entities/address.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'save_people_db',
      entities: [Person, Address, User],
      synchronize: true,
    }),
    PersonModule,
    AuthModule,
  ],
})
export class AppModule {}