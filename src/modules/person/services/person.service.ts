import { CreatePersonV2Dto } from '@/modules/person/dto/create-person-v2.dto';
import { CreatePersonDto } from '@/modules/person/dto/create-person.dto';
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

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    const duplicatedPersons = await this.personRepository.createQueryBuilder('p')
      .orWhere('p.cpf = :cpf', { cpf: createPersonDto.cpf })
      .orWhere('p.email = :email', { email: createPersonDto.email })
      .getCount();
    
    if (duplicatedPersons > 0) {
      throw new NotAcceptableException(`Person with cpf or email already exists!`)
    } 

    const person = this.personRepository.create(createPersonDto);
    return this.personRepository.save(person);
  }

  async createV2(createPersonDto: CreatePersonV2Dto): Promise<Person> {
    return await this.create(createPersonDto);
  }

  async findAll(): Promise<Person[]> {
    return this.personRepository.find();
  }

  async findOne(id: number): Promise<Person> {
    const person = await this.personRepository.findOneBy({ id });
    if (!person) throw new NotFoundException(`Person with ID ${id} not found`);
    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person> {
    const person = await this.personRepository.findOneBy({ id });
    if (!person) throw new NotFoundException(`Person with ID ${id} not found`);

    if (updatePersonDto.cpf || updatePersonDto.email) {
      const query = this.personRepository.createQueryBuilder('p');
      if (updatePersonDto.cpf) {
        query.orWhere('p.cpf = :cpf', { cpf: updatePersonDto.cpf });
      }
      if (updatePersonDto.email) {
        query.orWhere('p.email  = :email', { email: updatePersonDto.email  });
      }

      const duplicatedPersons = await query.getCount();
      if (duplicatedPersons > 0) {
        throw new NotAcceptableException(`Person with cpf or email already exists!`)
      }
    }

    return this.personRepository.save({ ...person, ...updatePersonDto });
  }

  async updateV2(id: number, updatePersonDto: UpdatePersonV2Dto): Promise<Person> {
    return await this.update(id, updatePersonDto);
  }

  async remove(id: number): Promise<void> {
    const result = await this.personRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Person with ID ${id} not found`);
  }
}