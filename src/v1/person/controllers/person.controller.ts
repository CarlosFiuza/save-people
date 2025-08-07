
import { CreatePersonDto } from '@/v1/person/dto/create-person.dto';
import { UpdatePersonDto } from '@/v1/person/dto/update-person.dto';
import { PersonService } from '@/v1/person/services/person.service';
import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('persons')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('persons')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova pessoa' })
  @ApiResponse({ status: 201, description: 'Pessoa criada com sucesso.' })
  async create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as pessoas' })
  async findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma pessoa pelo ID' })
  async findOne(@Param('id') id: number) {
    return this.personService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma pessoa pelo ID' })
  async update(@Param('id') id: number, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(id, updatePersonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma pessoa pelo ID' })
  async remove(@Param('id') id: number) {
    return this.personService.remove(id);
  }
}