import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from '@/common/enums/gender.enum';
import { PersonV2Service } from '@/v2/person/services/person-v2.service';
import { PersonV2 } from '@/v2/person/entities/person-v2.entity';

const address = {
  id: 1,
  street: 'Rua A',
  city: 'Cidade B',
  state: 'Estado C',
  zipCode: '12345-678',
};

const personV2Entity = {
  id: 1,
  name: 'John Doe',
  gender: Gender.MALE,
  email: 'john@example.com',
  dateOfBirth: '1990-01-01', // Use string instead of Date object
  nationality: 'Brazilian',
  cpf: '12345678901',
  address,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('PersonV2Service', () => {
  let service: PersonV2Service;
  let repo: Repository<PersonV2>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonV2Service,
        {
          provide: getRepositoryToken(PersonV2),
          useValue: {
            create: jest.fn().mockReturnValue(personV2Entity),
            save: jest.fn().mockResolvedValue(personV2Entity),
            find: jest.fn().mockResolvedValue([personV2Entity]),
            findOneBy: jest.fn().mockResolvedValue(personV2Entity),
            preload: jest.fn().mockResolvedValue(personV2Entity),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<PersonV2Service>(PersonV2Service);
    repo = module.get<Repository<PersonV2>>(getRepositoryToken(PersonV2));
  });

  it('should create a person v2', async () => {
    const dto = { ...personV2Entity };
    expect(await service.create(dto)).toEqual(personV2Entity);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(personV2Entity);
  });

  it('should return all persons v2', async () => {
    expect(await service.findAll()).toEqual([personV2Entity]);
    expect(repo.find).toHaveBeenCalled();
  });

  it('should return one person v2 by id', async () => {
    expect(await service.findOne(1)).toEqual(personV2Entity);
    expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should update a person v2', async () => {
    const dto = {
      name: 'Jane Doe',
      gender: Gender.MALE,
      email: 'john@example.com',
      dateOfBirth: new Date('1990-01-01'),
      nationality: 'Brazilian',
      cpf: '12345678901',
      address,
    };
    expect(await service.update(1, dto)).toEqual(personV2Entity);
    expect(repo.preload).toHaveBeenCalledWith({ id: 1, ...dto });
    expect(repo.save).toHaveBeenCalledWith(personV2Entity);
  });

  it('should remove a person v2', async () => {
    await expect(service.remove(1)).resolves.toBeUndefined();
    expect(repo.delete).toHaveBeenCalledWith(1);
  });
});
