import { Test, TestingModule } from '@nestjs/testing';
import { PersonService } from './person.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from '@/common/enums/gender.enum';
import { Person } from '@/modules/person/entities/person.entity';

const personEntity = {
  id: 1,
  name: 'John Doe',
  gender: Gender.MALE,
  email: 'john@example.com',
  dateOfBirth: new Date('1990-01-01'),
  nationality: 'Brazilian',
  cpf: '12345678901',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('PersonService', () => {
  let service: PersonService;
  let repo: Repository<Person>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        {
          provide: getRepositoryToken(Person),
          useValue: {
            create: jest.fn().mockReturnValue(personEntity),
            save: jest.fn().mockResolvedValue(personEntity),
            find: jest.fn().mockResolvedValue([personEntity]),
            findOneBy: jest.fn().mockResolvedValue(personEntity),
            preload: jest.fn().mockResolvedValue(personEntity),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<PersonService>(PersonService);
    repo = module.get<Repository<Person>>(getRepositoryToken(Person));
  });

  it('should create a person', async () => {
    const dto = { ...personEntity };
    expect(await service.create(dto)).toEqual(personEntity);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(personEntity);
  });

  it('should return all persons', async () => {
    expect(await service.findAll()).toEqual([personEntity]);
    expect(repo.find).toHaveBeenCalled();
  });

  it('should return one person by id', async () => {
    expect(await service.findOne(1)).toEqual(personEntity);
    expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should update a person', async () => {
    const dto = { name: 'Jane Doe' };
    expect(await service.update(1, dto)).toEqual(personEntity);
    expect(repo.preload).toHaveBeenCalledWith({ id: 1, ...dto });
    expect(repo.save).toHaveBeenCalledWith(personEntity);
  });

  it('should remove a person', async () => {
    await expect(service.remove(1)).resolves.toBeUndefined();
    expect(repo.delete).toHaveBeenCalledWith(1);
  });
});