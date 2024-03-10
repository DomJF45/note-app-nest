import { useState } from "react";
import { HiPlusCircle, HiX } from "react-icons/hi";
import { AddNoteComponent } from "./types";
import { SubmitHandler, useForm } from "react-hook-form";

/*
 * This note handles rendering the form and hiding the form to add a new Note
 * It takes in a handleAddNote function which will trigger the addnote mutation handler in pages/notes/hooks/noteCrud
 * */

// hook form validation
type FormFields = {
  content: string;
};

const AddNote: AddNoteComponent = ({ handleAddNote }) => {
  // state for new note value
  const [makeNewNote, setMakeNewNote] = useState<boolean>(false);

  // hook form form state
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      content: "",
    },
  });

  // toggles new note input visibility
  const toggleNewNote = () => {
    // resets state when open or close
    reset();
    setMakeNewNote((prev) => !prev);
  };

  // handler function for adding note
  const handleAdd = (data: string) => {
    // check if data is valid and exists
    if (data === "" || data === " ") {
      toggleNewNote();
      return;
    }
    // add the new note through handler function passsed down from pages/notes/notePage
    handleAddNote(data);
    // close the input
    toggleNewNote();
  };

  // form submit function, takes in form data from FormFields
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    handleAdd(data.content);
  };

  return (
    <>
      {makeNewNote ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="absolute top-0 right-0 w-full sm:w-[300px] flex flex-col bg-white p-3 rounded-lg shadow-lg gap-3 mt-3 z-[2]">
            <textarea
              className="max-h-[200px] h-[80px] border-1 border-slate-300 rounded text-sm w-full"
              {...register("content", {
                required: "Please add a note",
                min: 20,
                max: 300,
                validate: (value) => {
                  if (value.length < 20 || value.length > 300) {
                    return "Must be between 20 and 300 characters";
                  }
                  return true;
                },
              })}
              autoFocus
              placeholder="new note"
              maxLength={300}
              minLength={20}
            />
            {errors.content && (
              <p className="text-red-400 text-xs">{errors.content.message}</p>
            )}
            <div className="flex items-center justify-between">
              <div className="flex gap-3 ">
                <button
                  className="flex items-center bg-green-500 rounded p-2 align-end text-white px-4 py-2 text-sm"
                  type="submit"
                >
                  <span>add</span>
                </button>
                <button onClick={toggleNewNote}>
                  <HiX />
                </button>
              </div>
              <p className="text-sm text-slate-600">
                {watch("content") ? watch("content").length : 0}/300
              </p>
            </div>
          </div>
        </form>
      ) : (
        <button
          className="flex p-2 items-center gap-1 justify-center items-center"
          onClick={toggleNewNote}
        >
          <HiPlusCircle className="w-5 w-5" aria-hidden="true" />
          <span>Add new Note</span>
        </button>
      )}
    </>
  );
};

export default AddNote;
