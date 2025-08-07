import { Controller, Post, Request, UseGuards, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '@/v1/auth/dto/user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Faz login do usuário' })
  @ApiResponse({ status: 201, description: 'Login realizado com sucesso.' })
  async login(@Body() UserDto: UserDto ) {
    const user = await this.authService.validateUser(UserDto.username, UserDto.password);
    if (!user) throw new UnauthorizedException('Usuário ou senha inválidos');
    return this.authService.login(user);
  }
}