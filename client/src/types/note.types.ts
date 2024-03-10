/*
 * Shared note types file so that note types aren't contained in either pages/ or components/ since both need access
 */

// the note takes id, content, date created, and date edited
export interface iNote {
  id: number;
  content: string;
  dateCreated: Date;
  dateEdited: Date;
}

// type for editing notes
export type iEditNote = Pick<iNote, "id" | "content">;

// type for drop down options
export type DropDownOptions = "ASC" | "DSC";

// type for note context
export interface iNoteContext {
  updateNote: (data: iEditNote) => void;
  deleteNote: (id: iNote["id"]) => void;
}
