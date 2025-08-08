import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonController } from './controllers/person.controller';
import { Person } from './entities/person.entity';
import { PersonService } from '@/modules/person/services/person.service';
import { PersonV2Controller } from '@/modules/person/controllers/person-v2.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [PersonController, PersonV2Controller],
  providers: [PersonService],
})
export class PersonModule {}