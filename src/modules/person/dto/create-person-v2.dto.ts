import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from '../../../modules/person/dto/address.dto';
import { CreatePersonDto } from '@/modules/person/dto/create-person.dto';

export class CreatePersonV2Dto extends CreatePersonDto {
    @ApiProperty({ type: AddressDto })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;
}