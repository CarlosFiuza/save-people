import { CreatePersonV2Dto } from '@/modules/person/dto/create-person-v2.dto';
import { CreatePersonDto } from '@/modules/person/dto/create-person.dto';
import { FindPersonPaginatedDto } from '@/modules/person/dto/find-person-paginated.dto';
import { UpdatePersonV2Dto } from '@/modules/person/dto/update-person-v2.dto';
import { UpdatePersonDto } from '@/modules/person/dto/update-person.dto';
import { Person } from '@/modules/person/entities/person.entity';
import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto, userId: number): Promise<Person> {
    const duplicatedPersons = await this.personRepository.createQueryBuilder('p')
      .andWhere('p.userId = :userId', { userId })
      .andWhere('p.cpf = :cpf OR p.email = :email', { cpf: createPersonDto.cpf, email: createPersonDto.email })
      .getCount();
    
    if (duplicatedPersons > 0) {
      throw new NotAcceptableException(`Person with cpf or email already exists!`)
    } 

    const person = this.personRepository.create({ ...createPersonDto, userId });
    return this.personRepository.save(person);
  }

  async createV2(createPersonDto: CreatePersonV2Dto, userId: number): Promise<Person> {
    return await this.create(createPersonDto, userId);
  }

  async findAll(findPersonPaginated: FindPersonPaginatedDto, userId: number, returnAddress?: boolean): Promise<{ persons: Person[], pagination: { itemsPerPage: number, page: number, totalItems: number, }}> {
    const page = findPersonPaginated.page ?? 1;
    const itemsPerPage = findPersonPaginated.itemsPerPage ?? 10;

    const offset = (page - 1) * itemsPerPage;

    const qb = this.personRepository.createQueryBuilder('p');

    if (returnAddress) {
      qb.leftJoinAndSelect('p.address', 'address');
    }

    if (findPersonPaginated.personName) {
      qb.andWhere(`p.name ilike TRIM('%${findPersonPaginated.personName}%')`)
        .andWhere('p.userId = :userId', { userId });
    }

    qb.orderBy('p.createdAt', 'DESC');

    const totalItems = await qb.getCount();
    const persons = await qb
      .skip(offset)
      .take(itemsPerPage)
      .getMany();

    return {
      persons,
      pagination: {
        itemsPerPage: Number(itemsPerPage),
        page: Number(page),
        totalItems,
      },
    };
  }

  async findAllV2(findPersonPaginated: FindPersonPaginatedDto, userId: number) {
    return await this.findAll(findPersonPaginated, userId, true);
  }

  async findOne(id: number, userId: number): Promise<Person> {
    const person = await this.personRepository.findOneBy({ id, userId });
    if (!person) throw new NotFoundException(`Person with ID ${id} not found`);
    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto, userId: number): Promise<Person> {
    const person = await this.personRepository.findOneBy({ id, userId });
    if (!person) throw new NotFoundException(`Person with ID ${id} not found`);

    if (updatePersonDto.cpf || updatePersonDto.email) {
      const query = this.personRepository.createQueryBuilder('p')
        .andWhere('p.userId = :userId AND p.id <> :id', { userId, id: person.id })
        .andWhere('(p.cpf = :cpf OR p.email  = :email)', { cpf: updatePersonDto.cpf, email: updatePersonDto.email });

      const duplicatedPersons = await query.getCount();
      if (duplicatedPersons > 0) {
        throw new NotAcceptableException(`Person with cpf or email already exists!`)
      }
    }

    return this.personRepository.save({ ...person, ...updatePersonDto });
  }

  async updateV2(id: number, updatePersonDto: UpdatePersonV2Dto, userId: number): Promise<Person> {
    return await this.update(id, updatePersonDto, userId);
  }

  async remove(id: number, userId: number): Promise<void> {
    const person = await this.personRepository.findOneBy({ id, userId });
    if (!person) throw new NotFoundException(`Person with ID ${id} not found`);

    const result = await this.personRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Person with ID ${id} not found`);
  }
}