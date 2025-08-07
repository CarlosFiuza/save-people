import { PersonV2Controller } from '@/v2/person/controllers/person-v2.controller';
import { Address } from '@/v2/person/entities/address.entity';
import { PersonV2 } from '@/v2/person/entities/person-v2.entity';
import { PersonV2Service } from '@/v2/person/services/person-v2.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PersonV2, Address])],
  controllers: [PersonV2Controller],
  providers: [PersonV2Service],
})
export class PersonV2Module {}