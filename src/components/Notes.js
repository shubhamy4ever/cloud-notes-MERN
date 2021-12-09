import React, { useContext, useEffect, useState ,useRef} from "react";
import { NoteItem } from "./NoteItem";
import { notesContext } from "./Home";
import Loading from "./loading";

export const Notes = () => {
  const { notes, fetchnotes,editNote,loading } = useContext(notesContext);
  useEffect(() => {
    fetchnotes();
    //eslint-disable-next-line
  }, []);
  const [note, setNote] = useState({ id:"" ,title: "", description: "", tag: "" });
  //use ref to point at close after onclick is triggered that is note is updated
  const refClose = useRef(null);
  const updateNote = async (currentNote) => {
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag,
    });
  };
  const onChange = (e) => {
    e.preventDefault();
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    // id title descr tag of that particular note which edit button is clicked taken from updateNote
    //not passed argument as object 
    editNote(note.id,note.title,note.description,note.tag);
    //useref.current. event on which it will trigger 
    refClose.current.click();
  };
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="title" className="form-label" name="title">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  aria-describedby="emailHelp"
                  name="title"
                  onChange={onChange}
                  value={note.title}

                />
              </div>
              <div className="mb-3">
                <label className="form-label" name="description">
                  Description
                </label>

                <input
                  type="Text"
                  className="form-control"
                  id="description"
                  name="description"
                  onChange={onChange}
                  value={note.description}
                 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">
                  Tag
                </label>

                <input
                  type="Text"
                  className="form-control"
                  id="tag"
                  name="tag"
                  onChange={onChange}
                  value={note.tag}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={note.title.length<3||note.description.length<5}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2>Your Notes </h2>
      <p>
        <div className="row container my-3">
        {loading && <Loading />}
          {notes.length===0?"no notes to display ":notes.map((note) => {
            return (
              <NoteItem
                key={note._id}
                title={note.title}
                description={note.description}
                tag={note.tag}
                id={note._id}
                //passing whole note to get a particular clicked notes id for updating
                note={note}
                updateNote={updateNote}
              />
            );
          })}
        </div>
      </p>
    </>
  );
};
