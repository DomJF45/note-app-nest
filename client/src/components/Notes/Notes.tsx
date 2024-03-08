import Note from "./Note";
import { NotesComponent } from "./types";
import Skeleton from "./Skeleton";

const Notes: NotesComponent = ({ notes, loading = false }) => {
  return (
    <div className="flex">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((elem) => (
            <Skeleton key={elem} />
          ))}
        </div>
      ) : (
        <>
          {notes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-5">
              <>
                {notes.map((note) => (
                  <Note key={note.id} note={note} />
                ))}
              </>
            </div>
          ) : (
            <p>No notes yet...</p>
          )}
        </>
      )}
    </div>
  );
};
export default Notes;
