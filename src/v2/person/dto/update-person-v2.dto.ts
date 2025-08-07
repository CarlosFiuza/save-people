import { Gender } from '@/common/enums/gender.enum';
import { AddressDto } from '@/v2/person/dto/address.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsEmail, IsDateString, IsNotEmpty, IsDate, ValidateNested, IsEnum } from 'class-validator';

export class UpdatePersonV2Dto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name?: string;

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

    @ApiPropertyOptional()
    @IsOptional()
    @IsDate()
    dateOfBirth?: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    nationality?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    naturalness?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    cpf?: string;

    @ApiProperty({ type: AddressDto })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;
}