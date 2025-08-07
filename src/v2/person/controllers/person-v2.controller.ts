import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CreatePersonV2Dto } from '../dto/create-person-v2.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdatePersonV2Dto } from '@/v2/person/dto/update-person-v2.dto';
import { PersonV2Service } from '@/v2/person/services/person-v2.service';

@ApiTags('persons-v2')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('v2/persons')
export class PersonV2Controller {
  constructor(private readonly personService: PersonV2Service) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova pessoa (v2)' })
  @ApiResponse({ status: 201, description: 'Pessoa criada com sucesso.' })
  async create(@Body() createPersonDto: CreatePersonV2Dto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as pessoas (v2)' })
  async findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma pessoa pelo ID (v2)' })
  async findOne(@Param('id') id: number) {
    return this.personService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma pessoa pelo ID (v2)' })
  async update(@Param('id') id: number, @Body() updatePersonDto: UpdatePersonV2Dto) {
    return this.personService.update(id, updatePersonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma pessoa pelo ID (v2)' })
  async remove(@Param('id') id: number) {
    return this.personService.remove(id);
  }
}