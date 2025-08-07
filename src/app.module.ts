import { AuthModule } from '@/v1/auth/auth.module';
import { User } from '@/v1/auth/entities/user.entity';
import { Person } from '@/v1/person/entities/person.entity';
import { PersonModule } from '@/v1/person/person.module';
import { Address } from '@/v2/person/entities/address.entity';
import { PersonV2 } from '@/v2/person/entities/person-v2.entity';
import { PersonV2Module } from '@/v2/person/person-v2.module';
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
      entities: [Person, PersonV2, Address, User],
      synchronize: true,
    }),
    PersonModule,
    PersonV2Module,
    AuthModule,
  ],
})
export class AppModule {}