import { Note } from '../note.entity';

export class CreateNoteDto {
  readonly content: Note['content'];
}

export class EditNoteDto {
  readonly id: Note['id'];
  readonly content: Note['content'];
}
