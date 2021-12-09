import React, { useState, useContext } from "react";
import { Notes } from "./Notes";
import { notesContext } from "./Home";

export const Addnote = () => {
  //using context at home
  const {addNote} = useContext(notesContext);
  //state for rerendering without reload on webpage
 const [note, setNote] = useState({title:"",description:"",tag:""});
 //whenever clicked pass to add note() in home 
 function handleClick() {
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""});
  }
  function handleChange(event) {
    //state note is for textbox currently and set note updates it with written value 
    event.preventDefault();
    // ... spread operator  and concatinating the name and value which is being changed
    //example title:Do homework
    //and spread operator will concat with description :do homework at 22:20pm because of ,
    //or else it will change the note state to the most recent changed value not all changed value
    setNote({...note,[event.target.name]:event.target.value});
  }
  return (
    <div>
      <div className="my-3">
        <h2>Add Note</h2>
        <form>
          <div className="mb-3">
            <label
              htmlFor="title"
              className="form-label"
              name="title"
            
            >
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              name="title"
              onChange={handleChange}
              //auto empty after submit value is refrenced from note state
              value={note.title}

            />
          </div>
          <div className="mb-3">
            <label
              className="form-label"
              name="description"
              >
              Description
            </label>

            <input type="Text" className="form-control"  
              value={note.description} onChange={handleChange} id="description"  name="description"/>
             
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label" >
              Tag
            </label>

            <input type="Text" value={note.tag} className="form-control" onChange={handleChange} id="tag" name="tag" />
          </div>
          <button
            type="button"
            onClick={handleClick}
            className="btn btn-primary"
            //button disable for less than 3 characters in title and  5 characters in desc
            disabled={note.title.length<3||note.description.length<5}
          >
            Add Note
          </button>
        </form>
      </div>
      <div className="container my-3">
        <Notes />
      </div>
    </div>
  );
};
