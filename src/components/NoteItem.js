import React,{useContext} from "react";
import { notesContext } from "./Home";

export const NoteItem = (props) => {
  const {deleteNote} = useContext(notesContext);
  return (
    <div className="col md-4 my-3">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
          {/* a function which calls deleteNote function and passes prop id because you cant add parameter
          directly
          */}
          <i className="fas fa-trash-alt mx-3" onClick={()=>{deleteNote(props.id)}}></i>
          <i className="fas fa-edit" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{props.updateNote(props.note)}}></i> {/*passing whole note which edit button is clicked*/}
          {props.tag ? (
            <span className="position-absolute top-0 end-0  badge rounded-pill bg-danger  ">
              {props.tag}
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
