import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/v1/auth/entities/user.entity';
import { AuthService } from '@/v1/auth/services/auth.service';
import { JwtStrategy } from '@/v1/auth/strategies/jwt.strategy';
import { AuthController } from '@/v1/auth/controllers/auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'sua_chave_secreta',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, UsersService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}