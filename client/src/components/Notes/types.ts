import type { iNote } from "../../types/note.types";

interface iNoteProps {
  note: iNote;
}

interface iNotesProps {
  notes: iNote[];
  loading?: boolean;
}

interface iAddNoteProps {
  handleAddNote: (note: string) => void;
}

export type NoteComponent = React.FunctionComponent<iNoteProps>;
export type NotesComponent = React.FunctionComponent<iNotesProps>;
export type AddNoteComponent = React.FunctionComponent<iAddNoteProps>;
