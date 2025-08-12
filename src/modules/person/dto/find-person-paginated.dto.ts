import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, Min, IsOptional, IsNumberString } from 'class-validator';

export class FindPersonPaginatedDto {
    @ApiPropertyOptional()
    @IsNumberString()
    @IsOptional()
    page: number;

    @ApiPropertyOptional()
    @IsNumberString()
    @IsOptional()
    itemsPerPage: number;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    personName: string;
}