import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Person } from '@/modules/person/entities/person.entity';
import { Address } from '@/modules/person/entities/address.entity';
import { User } from '@/modules/auth/entities/user.entity';
import { InitDatabase } from '@/infra/orm/typeorm/migrations/1754628125102-init-database';

const configService = new ConfigService();
const isCloud = configService.get<string>('APP_ENV') === 'cloud';
console.log(configService.get<string>('APP_ENV'), configService.get<string>('POSTGRES_URL'))

export default new DataSource({
  type: 'postgres',
  url: configService.get<string>('POSTGRES_URL'),
  migrationsRun: true,
  migrations: [InitDatabase],
  entities: [Person, Address, User],
  synchronize: isCloud ? false : true,
});
