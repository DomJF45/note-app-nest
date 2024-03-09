export interface iNote {
  id: number;
  content: string;
  dateCreated: Date;
  dateEdited: Date;
}

export type iEditNote = Pick<iNote, "id" | "content">;

export type DropDownOptions = "ASC" | "DSC";

export interface iNoteContext {
  updateNote: (data: iEditNote) => void;
  deleteNote: (id: iNote["id"]) => void;
}
