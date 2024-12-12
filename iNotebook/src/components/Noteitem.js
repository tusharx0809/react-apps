import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div className="d-flex justify-content-center">
              <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully","success")}}></i>  {/* delete button */}
              <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i> {/* edit button */}
            </div>

            <h6>{capitalizeFirstLetter(note.tag)}</h6>
          </div>

          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
