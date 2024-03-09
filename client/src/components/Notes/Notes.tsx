import Note from "./Note";
import { NotesComponent } from "./types";
import Skeleton from "./Skeleton";
import { Suspense } from "react";

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
