import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto, EditNoteDto } from './dto/createNote.dto';
import { User } from '../user/user.entity';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
    private readonly userService: UsersService,
  ) {}

  async findAll(user: User): Promise<Note[]> {
    return await this.notesRepository.find({
      where: { user: { id: user.id } },
      relations: ['sharedUser'],
    });
  }

  async findOne(id: number): Promise<Note> {
    return await this.notesRepository.findOne({ where: { id } });
  }

  async create(note: CreateNoteDto, user: User): Promise<Note> {
    const newNote = this.notesRepository.create({
      content: note.content,
      user: user,
    });

    return await this.notesRepository.save(newNote);
  }

  async linkUser(noteid: number, userid: number): Promise<Note> {
    const note = await this.findOne(noteid);
    const user = await this.userService.findOne(userid);
    console.log('shared user: ', user);
    const updatedNote: Note = {
      ...note,
      sharedUser: user,
    };
    console.log('updated note: ', updatedNote);
    await this.notesRepository.update(noteid, updatedNote);
    return await this.notesRepository.findOne({
      where: { id: noteid },
      relations: ['sharedUser'],
    });
  }

  async update(id: number, note: EditNoteDto): Promise<void> {
    await this.notesRepository.update(id, note);
  }

  async delete(id: number): Promise<void> {
    await this.notesRepository.delete(id);
  }
}
