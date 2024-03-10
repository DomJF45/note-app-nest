import type { iNote } from "../../types/note.types";

// props for note component
interface iNoteProps {
  note: iNote;
}

// props for notes component
interface iNotesProps {
  notes: iNote[];
  loading?: boolean;
}

// props for add note component
interface iAddNoteProps {
  handleAddNote: (note: string) => void;
}

// export typed functions with applicable props
export type NoteComponent = React.FunctionComponent<iNoteProps>;
export type NotesComponent = React.FunctionComponent<iNotesProps>;
export type AddNoteComponent = React.FunctionComponent<iAddNoteProps>;
