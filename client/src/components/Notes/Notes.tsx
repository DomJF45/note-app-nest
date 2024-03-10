import Note from "./Note";
import { NotesComponent } from "./types";
import Skeleton from "./Skeleton";
import { Suspense } from "react";

/*
 * This component handles the rendering of all notes by mapping over them
 * and rendering a Note component for each note
 *
 * It takes list of notes from pages/notesPage as a prop
 *
 * */

const Notes: NotesComponent = ({ notes }) => {
  return (
    <div className="flex">
      {notes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-5">
          <>
            {notes.map((note) => (
              <Suspense key={note.id} fallback={<Skeleton />}>
                <Note note={note} />
              </Suspense>
            ))}
          </>
        </div>
      ) : (
        <p>No notes yet...</p>
      )}
    </div>
  );
};
export default Notes;
