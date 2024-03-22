import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UsersService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { jwtConstants } from './constants';
import { UserCreatedEvent } from 'src/user/events/user-created.event';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmailAndPassword(
      email,
      password,
    );

    return user;
  }

  async getUserFromJwt(token: string): Promise<User> {
    try {
      const decoded = this.jwtService.verify(token);
      const userId: number = +decoded.sub;
      return await this.usersService.findOne(userId);
    } catch {
      throw new UnauthorizedException();
    }
  }

  async login(user: User): Promise<{ user: User; token: string }> {
    const payload = { sub: user.id };
    const token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
    });
    return { user, token };
  }

  async register(user: CreateUserDto): Promise<{ user: User; token: string }> {
    return await this.usersService.register(user);
  }

  async get(id: number): Promise<{ user: User }> {
    const user = await this.usersService.findOne(id);
    return { user };
  }
}
