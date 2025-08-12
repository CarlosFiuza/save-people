
import { CurrentUser } from '@/common/decorators/user.decorator';
import { JwtUser } from '@/modules/auth/interfaces/jwt-user.interface';
import { CreatePersonDto } from '@/modules/person/dto/create-person.dto';
import { FindPersonPaginatedDto } from '@/modules/person/dto/find-person-paginated.dto';
import { UpdatePersonDto } from '@/modules/person/dto/update-person.dto';
import { PersonService } from '@/modules/person/services/person.service';
import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('persons')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({ path: 'persons', version: '1' })
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova pessoa' })
  @ApiResponse({ status: 201, description: 'Pessoa criada com sucesso.' })
  async create(
    @Body() createPersonDto: CreatePersonDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.personService.create(createPersonDto, user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as pessoas de forma paginada' })
  async findAll(
    @Query() findPersonPaginated: FindPersonPaginatedDto,
    @CurrentUser() user: JwtUser) {
    return this.personService.findAll(findPersonPaginated, user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma pessoa pelo ID' })
  async findOne(
    @Param('id') id: number,
    @CurrentUser() user: JwtUser,
  ) {
    return this.personService.findOne(id, user.userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma pessoa pelo ID' })
  async update(
    @Param('id') id: number,
    @Body() updatePersonDto: UpdatePersonDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.personService.update(id, updatePersonDto, user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma pessoa pelo ID' })
  async remove(
    @Param('id') id: number,
    @CurrentUser() user: JwtUser,
  ) {
    return this.personService.remove(id, user.userId);
  }
}