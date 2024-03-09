import {
  Controller,
  Body,
  Post,
  Request,
  UnauthorizedException,
  Get,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ user: User; token: string }> {
    const user = await this.authService.validateUser(
      createUserDto.email,
      createUserDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return this.authService.login(user);
  }

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ user: User; token: string }> {
    return this.authService.register(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async get(@Request() req): Promise<{ user: User }> {
    return this.authService.get(req.user.sub);
  }
}
