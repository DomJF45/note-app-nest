import { CanActivate } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../auth/auth.guard';
import { Note } from './note.entity';
import { AuthService } from '../auth/auth.service';
import { CreateNoteDto, EditNoteDto } from './dto/createNote.dto';

describe('NotesController', () => {
  let notesController: NotesController;
  let notesService: NotesService;
  beforeEach(async () => {
    const mock_FailGuard: CanActivate = { canActivate: jest.fn(() => true) };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            getUserFromJwt: jest.fn(),
          },
        },
        {
          provide: NotesService,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            findAllByUserId: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mock_FailGuard)
      .compile();

    notesController = module.get<NotesController>(NotesController);
    notesService = module.get<NotesService>(NotesService);
  });

  describe('findOne', () => {
    it('should find one note by id', async () => {
      const mockNote: Omit<Note, 'user'> = {
        id: 1,
        content: 'This is a test note',
        dateEdited: new Date(Date.now()),
        dateCreated: new Date(Date.now()),
      };
      jest
        .spyOn(notesService, 'findOne')
        .mockImplementation(async () => mockNote as Note);
      const res = await notesController.findOne(1);
      expect(res).toEqual(mockNote);
    });
  });

  describe('create', () => {
    it('should create a new note', async () => {
      const createNoteDto: CreateNoteDto = {
        content: 'This is a test note',
      };
      const mockNote: Omit<Note, 'user'> = {
        id: 1,
        content: 'This is a test note',
        dateCreated: new Date(),
        dateEdited: new Date(),
      };

      jest
        .spyOn(notesService, 'create')
        .mockImplementation(async () => mockNote as Note);

      const result = await notesController.create(createNoteDto, {
        headers: { authorization: 'Bearer your_token_here' },
      });
      expect(result).toEqual(mockNote);
    });
  });

  describe('update', () => {
    it('should update an existing note', async () => {
      const editNoteDto: EditNoteDto = {
        id: 1,
        content: 'This is an updated note',
      };
      const mockNote: Omit<Note, 'user'> = {
        id: 1,
        content: 'This is an updated note',
        dateCreated: new Date(),
        dateEdited: new Date(),
      };
      jest.spyOn(notesService, 'update').mockImplementation(async () => {});
      jest
        .spyOn(notesService, 'findOne')
        .mockImplementation(async () => mockNote as Note);
      await notesController.editNote(1, editNoteDto);
      const res = await notesController.findOne(1);
      expect(res).toEqual(mockNote);
    });
  });

  describe('delete', () => {
    it('should delete an existing note', async () => {
      const createNoteDto: CreateNoteDto = {
        content: 'New test note',
      };
      const mockNote: Omit<Note, 'user'> = {
        id: 1,
        content: 'New test note',
        dateCreated: new Date(),
        dateEdited: new Date(),
      };
      jest
        .spyOn(notesService, 'create')
        .mockImplementation(async () => mockNote as Note);
      jest.spyOn(notesService, 'delete').mockImplementation(async () => {});

      await notesController.create(createNoteDto, {
        headers: { authorization: 'Bearer token' },
      });
      await notesController.deleteNote(mockNote.id);
      const res = await notesController.findOne(mockNote.id);

      expect(res).toEqual(undefined);
    });
  });
});
