import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { User } from '../user/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/user/user.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Note, User]), UserModule],
  controllers: [NotesController],
  providers: [NotesService, AuthService, UsersService],
})
export class NotesModule {}
