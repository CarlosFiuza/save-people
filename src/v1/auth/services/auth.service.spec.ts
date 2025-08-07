import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '@/v1/auth/services/auth.service';
import { UsersService } from '@/v1/auth/services/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: JwtService,
          useValue: { sign: jest.fn().mockReturnValue('token') },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should validate user with correct credentials', async () => {
    const user = await service.validateUser('admin', 'admin123');
    expect(user).toBeDefined();
    expect(user.username).toBe('admin');
  });

  it('should not validate user with wrong credentials', async () => {
    const user = await service.validateUser('admin', 'wrong');
    expect(user).toBeNull();
  });

  it('should return a JWT token on login', async () => {
    const user = { id: 1, username: 'admin' };
    const result = await service.login(user);
    expect(result.access_token).toBe('token');
  });
});