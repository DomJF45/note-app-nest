import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto, EditNoteDto } from './dto/createNote.dto';
import { User } from '../user/user.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
  ) {}

  async findAll(user: User): Promise<Note[]> {
    return await this.notesRepository.find({
      where: { user: { id: user.id } },
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

  async update(id: number, note: EditNoteDto): Promise<void> {
    await this.notesRepository.update(id, note);
  }

  async delete(id: number): Promise<void> {
    await this.notesRepository.delete(id);
  }
}
