import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  // Add a Note

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //  "auth-token":
        //    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc0ZjBhNDI3NjQ1MDFlZjQzZWQ2NzgxIn0sImlhdCI6MTczMzU1NDEyNH0.6qTGH4EgaBuR4K68A9D3XpawAhFyzdheGU-41unH1zQ"
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //  "auth-token":
        //    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc0ZjBhNDI3NjQ1MDFlZjQzZWQ2NzgxIn0sImlhdCI6MTczMzU1NDEyNH0.6qTGH4EgaBuR4K68A9D3XpawAhFyzdheGU-41unH1zQ"
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };
  // Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        // "Content-Type": "application/json",
        //  "auth-token":
        //    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc0ZjBhNDI3NjQ1MDFlZjQzZWQ2NzgxIn0sImlhdCI6MTczMzU1NDEyNH0.6qTGH4EgaBuR4K68A9D3XpawAhFyzdheGU-41unH1zQ"
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = response.json();
    //console.log(json);
    //console.log("Deleting the node with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //  "auth-token":
        //    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc0ZjBhNDI3NjQ1MDFlZjQzZWQ2NzgxIn0sImlhdCI6MTczMzU1NDEyNH0.6qTGH4EgaBuR4K68A9D3XpawAhFyzdheGU-41unH1zQ"
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    //console.log(json);
    //logic to edit in client
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
