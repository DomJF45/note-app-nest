import { useRef, useState } from "react";
import { NoteComponent } from "./types";
import useOutsideClick from "../../hooks/useOutsideClick";
import { HiX } from "react-icons/hi";

const Note: NoteComponent = ({ note }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [noteUpdate, setNoteUpdate] = useState<string>(note.content);

  const toggleEdit = () => {
    setEdit((prev) => !prev);
  };

  useOutsideClick({
    targetRefs: [inputRef],
    callback: toggleEdit,
  });

  return (
    <div className="flex flex-col bg-white rounded-lg items-start justify-center h-max shadow-md">
      <div className="flex flex-col gap-2 p-3 w-full">
        <div className="text-slate-600 text-sm p-1">
          <p>{new Date(note.dateCreated).toLocaleDateString()}</p>
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
              <button className="bg-emerald-500 text-white px-4 py-2 text-sm rounded">
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
            className="max-w-full break-all cursor-pointer hover:bg-black/10 rounded p-1"
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
