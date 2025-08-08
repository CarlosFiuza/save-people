import { AddressDto } from '@/modules/person/dto/address.dto';
import { UpdatePersonDto } from '@/modules/person/dto/update-person.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class UpdatePersonV2Dto extends UpdatePersonDto {
    @ApiProperty({ type: AddressDto })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;
}