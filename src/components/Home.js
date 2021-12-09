import React, { useState } from "react";
import { Addnote } from "./Addnote";
const host = "http://localhost:5000";
export const notesContext = React.createContext();
export default function Home(props) {
  //this state is needed so that page will rerender without reloading when notes is added in notes array
  //otherwise if its simple array you will have to reload it
  const initialValue = [];
  const [notes, setNotes] = useState(initialValue);
const [loading, setLoading] = useState(true);
  //fetch notes
  const fetchnotes = async () => {
    //Api call
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const fetchedNotes = await response.json();
    setLoading(false);
    setNotes(fetchedNotes);
  };

  //  add note
  //taking parameter from Addnote component
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      //post request and body of the request will have this json in string format with title desc ,tag
      body: JSON.stringify({ title, description, tag }),
    });
    const notefetched = await response.json();
    //will setNote state without loading page  if u do it directly it will add but will need to reload the page
    // to display note which is added
    //concat beacause we dont want to update and keep only note which is added but also old notes
    setNotes(notes.concat(notefetched));
    props.showAlert("added successfully", "success");
  };

  //delete note from id passed as parameter from clicked icon of delete on that particular note
  const deleteNote = async (id) => {
    //Api call
    //eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
     
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    //deleted from backend
    //filter can be used to delete filter a list with something
    //like here it is returning everything that whose id doesnt mathces and the one which matches is filtered out
    // the frontend state notes is updated with filtering the id that matches it and displays it
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    //directly because it will have all newnotes except deleted one
    setNotes(newNotes);
    props.showAlert("Deleted successfully", "success");
  };
  const editNote = async (id, title, description, tag) => {
    //Api call
     // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag}),
    });
    //updated from backend
//convert json notes state in string using stringify aafter parsing it(will generate copy)
// not direclty with response.json cause the data will require reload and return error
    let newNotes = JSON.parse(JSON.stringify(notes))  //copy of stingified version of notes state
    // Logic to edit in client using for loop
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) { 
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
     //set state for updating frontend without reload
    setNotes(newNotes);
    props.showAlert("updated successfully", "success");
   
  };
  return (
    <>
      {/* context to learn it the best place is react document providing this value directly without needing
    to drill the props in each an every component directly by exporting and importing context and using
    useContext hook to use it and extract the needed value which is passed from here multiple objects can be passed */}
      <notesContext.Provider
        value={{ notes, addNote, deleteNote, fetchnotes, editNote ,loading}}
      >
        <Addnote alert={props.alert}/>
      </notesContext.Provider>
    </>
  );
}
