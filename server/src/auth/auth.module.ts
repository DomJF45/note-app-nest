import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { UsersService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: `${jwtConstants.secret}`,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, UsersService, JwtService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
