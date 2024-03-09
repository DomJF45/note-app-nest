import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new Error('User not found');
    } else {
      return user;
    }
  }

  @Post()
  async create(
    @Body() user: CreateUserDto,
  ): Promise<{ user: User; token: string }> {
    return await this.usersService.register(user);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User): Promise<User> {
    return await this.usersService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.usersService.delete(id);
  }
}
