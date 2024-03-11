import { useContext, useRef, useState } from "react";
import type { NoteComponent } from "./types";
import type { iEditNote } from "../../types/note.types";
import useOutsideClick from "../../hooks/useOutsideClick";
import { HiTrash, HiX } from "react-icons/hi";
import { NoteContext } from "../../context/noteContext";
import { iNoteContext } from "../../types/note.types";
import { useAutoSizeTextarea } from "../../hooks/useAutosizeTextarea";

/*
 * This component renders an individual note
 * It consumes the NoteContext contained in pages/notePage
 * Notes component handles update and deletion of target note
 * */

const Note: NoteComponent = ({ note }) => {
  // this refs are for defining the use outside click
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const trashRef = useRef<HTMLButtonElement>(null);

  // state for accessing edit mode and showing editable field
  const [edit, setEdit] = useState<boolean>(false);
  // state for showing delete button
  const [markDelete, setMarkDelete] = useState<boolean>(false);
  // state for new note content
  const [noteUpdate, setNoteUpdate] = useState<string>(note.content);

  // update and delete functions passsed through NoteContext provider
  const { updateNote, deleteNote } = useContext(NoteContext)! as iNoteContext;

  useAutoSizeTextarea({ textAreaRef: inputRef, value: note.content });

  // toggles edit mode
  const toggleEdit = (): void => {
    setEdit((prev) => !prev);
  };

  // toggles visibility of delete button
  const toggleDelete = (state: "on" | "off"): void => {
    switch (state) {
      case "on":
        setMarkDelete(true);
        break;
      case "off":
        setMarkDelete(false);
    }
  };

  // hook to manage if user clicks outside input ref.
  // extended this to allow ref exceptions,
  // this way clicking save, delete, or close will not automatically close edit mode
  useOutsideClick({
    targetRefs: [inputRef],
    exceptions: [buttonRef, trashRef],
    callback: toggleEdit,
  });

  // handler function for updating the note
  const handleUpdateNote = () => {
    const newNote: iEditNote = {
      id: note.id,
      content: noteUpdate,
    };
    updateNote(newNote);
    toggleEdit();
    setNoteUpdate(note.content);
  };

  // handler function for deleting the note
  const handleDeleteNote = () => {
    deleteNote(note.id);
    toggleDelete("off");
    if (edit) {
      toggleEdit();
    }
  };

  // function to return text friendly date
  const getFormattedDate = () => {
    const created = new Date(note.dateCreated);
    const updated = new Date(note.dateEdited);

    // if note was edited, put (updated) next to date
    if (created.getTime() < updated.getTime()) {
      return `${updated.toLocaleDateString()} (updated)`;
    }
    return created.toLocaleDateString();
  };

  // get the formatted date
  const date = getFormattedDate();

  return (
    <div
      className="flex flex-col bg-white rounded-lg items-start justify-center shadow-md"
      onMouseEnter={() => toggleDelete("on")}
      onMouseLeave={() => toggleDelete("off")}
    >
      <div className="flex flex-col gap-2 p-3 w-full">
        <div className="flex text-slate-600 text-sm p-1 justify-between">
          <p>{date}</p>
          <button
            ref={trashRef}
            className={`${
              markDelete ? "visible" : "hidden"
            } w-4 h-4 cursor-pointer hover:scale-[1.1] transition-2 ease`}
            onClick={handleDeleteNote}
          >
            <HiTrash />
          </button>
        </div>
        {edit ? (
          <div className="border-1 border-slate-300 rounded text-sm">
            <textarea
              autoFocus
              ref={inputRef}
              value={noteUpdate}
              className="border-1 border-slate-300 rounded w-full"
              onChange={(e) => setNoteUpdate(e.currentTarget.value)}
              maxLength={300}
            />
            <div className="flex gap-2 items-center">
              <div className="flex gap-2 items-center">
                <button
                  ref={buttonRef}
                  className="bg-emerald-500 text-white px-4 py-2 text-sm rounded"
                  onClick={handleUpdateNote}
                >
                  Save
                </button>
                <button
                  className="hover:bg-black/10 p-1 rounded"
                  onClick={toggleEdit}
                >
                  <HiX className="w-4 h-4" />
                </button>
              </div>
              <p className="text-slate-600 text-xs">
                {noteUpdate.length} / 300
              </p>
            </div>
          </div>
        ) : (
          <h1
            className="max-w-full break-words cursor-pointer hover:bg-black/10 rounded p-1"
            onClick={toggleEdit}
          >
            {note.content}
          </h1>
        )}
      </div>
    </div>
  );
};

export default Note;
