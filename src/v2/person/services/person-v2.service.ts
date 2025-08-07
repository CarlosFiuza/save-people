import { CreatePersonV2Dto } from '@/v2/person/dto/create-person-v2.dto';
import { UpdatePersonV2Dto } from '@/v2/person/dto/update-person-v2.dto';
import { PersonV2 } from '@/v2/person/entities/person-v2.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class PersonV2Service {
  constructor(
    @InjectRepository(PersonV2)
    private readonly personRepository: Repository<PersonV2>,
  ) {}

  async create(createPersonDto: CreatePersonV2Dto): Promise<PersonV2> {
    const person = this.personRepository.create(createPersonDto);
    return this.personRepository.save(person);
  }

  async findAll(): Promise<PersonV2[]> {
    return this.personRepository.find();
  }

  async findOne(id: number): Promise<PersonV2> {
    const person = await this.personRepository.findOneBy({ id });
    if (!person) throw new NotFoundException(`Person with ID ${id} not found`);
    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonV2Dto): Promise<PersonV2> {
    const person = await this.personRepository.preload({
      id,
      ...updatePersonDto,
    });
    if (!person) throw new NotFoundException(`Person with ID ${id} not found`);
    return this.personRepository.save(person);
  }

  async remove(id: number): Promise<void> {
    const result = await this.personRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Person with ID ${id} not found`);
  }
}