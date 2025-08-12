import { Controller, Post, Put, Body, Param, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdatePersonV2Dto } from '@/modules/person/dto/update-person-v2.dto';
import { PersonController } from '@/modules/person/controllers/person.controller';
import { PersonService } from '@/modules/person/services/person.service';
import { CreatePersonV2Dto } from '@/modules/person/dto/create-person-v2.dto';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { JwtUser } from '@/modules/auth/interfaces/jwt-user.interface';
import { FindPersonPaginatedDto } from '@/modules/person/dto/find-person-paginated.dto';

@ApiTags('persons')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({ path: 'persons', version: '2' })
export class PersonV2Controller extends PersonController {
  constructor(private readonly personServiceV2: PersonService) {
    super(personServiceV2);
  }

  @Post()
  @ApiOperation({ summary: 'Cria uma nova pessoa' })
  @ApiResponse({ status: 201, description: 'Pessoa criada com sucesso.' })
  async create(
    @Body() createPersonDto: CreatePersonV2Dto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.personServiceV2.createV2(createPersonDto, user.userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma pessoa pelo ID' })
  async update(
    @Param('id') id: number,
    @Body() updatePersonDto: UpdatePersonV2Dto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.personServiceV2.updateV2(id, updatePersonDto, user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as pessoas de forma paginada' })
  async findAll(
    @Query() findPersonPaginated: FindPersonPaginatedDto,
    @CurrentUser() user: JwtUser) {
    return this.personServiceV2.findAllV2(findPersonPaginated, user.userId);
  }

}