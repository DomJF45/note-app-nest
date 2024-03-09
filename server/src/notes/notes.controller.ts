import {
  Controller,
  Request,
  Param,
  Get,
  Post,
  Delete,
  Body,
  UseGuards,
  Put,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './note.entity';
import { CreateNoteDto, EditNoteDto } from './dto/createNote.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';
@Controller('notes')
export class NotesController {
  constructor(
    private notesService: NotesService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Note> {
    return this.notesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() note: CreateNoteDto, @Request() req): Promise<Note> {
    const user = await this.authService.getUserFromJwt(
      req.headers.authorization.split(' ')[1],
    );

    return this.notesService.create(note, user);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAllByUserId(@Request() req): Promise<Note[]> {
    const token = req.headers.authorization.split(' ')[1];
    const user = await this.authService.getUserFromJwt(token);

    return this.notesService.findAll(user);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async editNote(
    @Param('id') id: number,
    @Body() note: EditNoteDto,
  ): Promise<void> {
    this.notesService.update(id, note);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteNote(@Param('id') id: number): Promise<void> {
    await this.notesService.delete(id);
  }
}
