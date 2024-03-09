import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { User } from '../user/user.entity';
import { CanActivate } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  beforeEach(async () => {
    const mock_FailGuard: CanActivate = { canActivate: jest.fn(() => true) };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
            get: jest.fn(),
            validateUser: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mock_FailGuard)
      .compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return user and token on successful login', async () => {
      const createUserDto: CreateUserDto = {
        username: 'coolperson20',
        email: 'test@example.com',
        password: 'password',
      };
      const mockUser: User = {
        id: 1,
        username: 'coolperson20',
        email: 'test@example.com',
        password: 'hashedPassword',
        notes: [],
      };

      jest
        .spyOn(authService, 'validateUser')
        .mockImplementation(async () => mockUser);

      jest
        .spyOn(authService, 'login')
        .mockImplementation(async () => ({ user: mockUser, token: 'token' }));

      const result = await authController.login(createUserDto);
      expect(result).toEqual({ user: mockUser, token: 'token' });
    });
  });

  describe('register', () => {
    it('should return user and token on successful registration', async () => {
      const createUserDto: CreateUserDto = {
        username: 'coolperson20',
        email: 'test@example.com',
        password: 'password',
      };
      const mockUser: User = {
        id: 1,
        username: 'coolperson20',
        email: 'test@example.com',
        password: 'password',
        notes: [],
      };
      const mockRes = { user: mockUser, token: 'token' };
      jest
        .spyOn(authService, 'register')
        .mockImplementation(async () => mockRes);

      const result = await authController.register(createUserDto);
      expect(result).toEqual(mockRes);
    });
  });

  describe('get profile', () => {
    it('should return user', async () => {
      const mockUser: User = {
        id: 1,
        username: 'coolperson20',
        email: 'test@example.com',
        password: 'password',
        notes: [],
      };

      const mockId = { user: { sub: mockUser.id } };
      const mockRes = { user: mockUser };

      jest.spyOn(authService, 'get').mockImplementation(async () => mockRes);
      const result = await authController.get(mockId);
      expect(result).toEqual(mockRes);
    });
  });
});
