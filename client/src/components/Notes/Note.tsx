import { useContext, useRef, useState } from "react";
import type { NoteComponent } from "./types";
import type { iEditNote } from "../../types/note.types";
import useOutsideClick from "../../hooks/useOutsideClick";
import { HiTrash, HiX } from "react-icons/hi";
import { NoteContext } from "../../context/noteContext";
import { iNoteContext } from "../../types/note.types";

const Note: NoteComponent = ({ note }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const trashRef = useRef<HTMLButtonElement>(null);

  const [edit, setEdit] = useState<boolean>(false);
  const [markDelete, setMarkDelete] = useState<boolean>(false);
  const [noteUpdate, setNoteUpdate] = useState<string>(note.content);

  const { updateNote, deleteNote } = useContext(NoteContext)! as iNoteContext;

  const toggleEdit = (): void => {
    setEdit((prev) => !prev);
  };

  const toggleDelete = (state: "on" | "off"): void => {
    switch (state) {
      case "on":
        setMarkDelete(true);
        break;
      case "off":
        setMarkDelete(false);
    }
  };

  useOutsideClick({
    targetRefs: [inputRef],
    exceptions: [buttonRef, trashRef],
    callback: toggleEdit,
  });

  const handleUpdateNote = () => {
    const newNote: iEditNote = {
      id: note.id,
      content: noteUpdate,
    };
    updateNote(newNote);
    toggleEdit();
    setNoteUpdate("");
  };

  const handleDeleteNote = () => {
    deleteNote(note.id);
    toggleDelete("off");
    toggleEdit();
  };

  const getFormattedDate = () => {
    const created = new Date(note.dateCreated);
    const updated = new Date(note.dateEdited);

    if (created.getTime() < updated.getTime()) {
      return `${updated.toLocaleDateString()} (updated)`;
    }
    return created.toLocaleDateString();
  };

  const date = getFormattedDate();

  return (
    <div
      className="flex flex-col bg-white rounded-lg items-start justify-center h-max shadow-md"
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
            />
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
          </div>
        ) : (
          <h1
            className="max-w-full break-wrap cursor-pointer hover:bg-black/10 rounded p-1"
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
