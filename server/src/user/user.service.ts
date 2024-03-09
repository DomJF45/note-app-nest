import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { comparePass, hashPassword } from '../utils/bcrypt';
import { CreateUserDto } from './dto/createUser.dto';
import { jwtConstants } from '../auth/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // get all users
  async findall(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  // get one user
  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (user && comparePass(password, user.password)) {
      return user;
    }

    return null;
  }

  async register(
    createUserDto: CreateUserDto,
  ): Promise<{ user: User; token: string }> {
    const { username, password, email } = createUserDto;

    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email is already taken');
    }

    const hashedPassword = hashPassword(password);

    const newUser = this.usersRepository.create({
      username,
      password: hashedPassword,
      email,
    });

    const savedUser = await this.usersRepository.save(newUser);

    const payload = { sub: savedUser.id };
    const token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
    });

    return { user: savedUser, token };
  }

  // update user
  async update(id: number, user: User): Promise<User> {
    await this.usersRepository.update(id, user);
    return await this.usersRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
