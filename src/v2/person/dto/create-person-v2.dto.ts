import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsCPF } from '@/common/validators/cpf.validator';
import { IsEmail } from '@/common/validators/email.validator';
import { IsNotEmpty, IsOptional, IsDateString, IsString, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from './address.dto';
import { Gender } from '@/common/enums/gender.enum';

export class CreatePersonV2Dto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiPropertyOptional({
        enum: Gender,
        enumName: 'Gender',
        description: 'Gender options: M (Male), F (Female), O (Other)'
    })
    @IsOptional()
    @IsEnum(Gender, {
        message: 'Gender must be either M (Male), F (Female) or O (Other)'
    })
    gender?: Gender;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    dateOfBirth: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    nationality?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsCPF()
    cpf: string;

    @ApiProperty({ type: AddressDto })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;
}