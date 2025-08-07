import { Gender } from '@/common/enums/gender.enum';
import { TransformCPF } from '@/common/transformers/transform-cpf.transform';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsDateString, IsNotEmpty, IsDate, IsEnum } from 'class-validator';

export class UpdatePersonDto {
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
    @TransformCPF()
    cpf?: string;
}