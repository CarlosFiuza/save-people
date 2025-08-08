import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsCPF } from '@/common/validators/cpf.validator';
import { IsEmail } from '@/common/validators/email.validator';
import { IsNotEmpty, IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { Gender } from '@/common/enums/gender.enum';
import { TransformCPF } from '@/common/transformers/transform-cpf.transform';

export class CreatePersonDto {
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
    dateOfBirth: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    nationality?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    naturalness?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsCPF()
    @TransformCPF()
    cpf: string;
}