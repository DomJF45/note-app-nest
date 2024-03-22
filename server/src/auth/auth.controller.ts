import {
  Controller,
  Body,
  Post,
  Request,
  UnauthorizedException,
  Get,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../user/dto/createUser.dto';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(
    @Body() createUserDto: LoginUserDto,
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

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ user: User; token: string }> {
    return this.authService.register(createUserDto);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('profile')
  async get(@Request() req): Promise<{ user: User }> {
    // serialize mark as private (exclude | expose)
    return this.authService.get(req.user.sub);
  }
}
