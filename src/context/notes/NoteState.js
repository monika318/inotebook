import NoteContext from "./NoteContext";
import { useState } from "react";



const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    //Get all note
    const getNotes = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/notes/getAllNotes', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1YjNkZjEyN2JiZjNjY2Y0MWI1ZjQ0In0sImlhdCI6MTY4MzcwMzY1OH0.hEf7pbMNbg1FS6Tl-M8Bgk-0hS8NSkOLd3GOfawuGQU"
                },
            });
            const json = await response.json();
            // console.log(json);
            setNotes(json);
        } catch (error) {
            console.log(error);
        }

    };

    //Add a note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1YjNkZjEyN2JiZjNjY2Y0MWI1ZjQ0In0sImlhdCI6MTY4MzcwMzY1OH0.hEf7pbMNbg1FS6Tl-M8Bgk-0hS8NSkOLd3GOfawuGQU"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json()
        // console.log(json)
        const note = {
            "_id": "645b3df127bbf3ccf41b5f44",
            "user": "645b3df127bbf3ccf41b5f44",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-05-10T08:47:57.633Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }
    //Delete a note
    const deleteNote = async (id) => {
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1YjNkZjEyN2JiZjNjY2Y0MWI1ZjQ0In0sImlhdCI6MTY4MzcwMzY1OH0.hEf7pbMNbg1FS6Tl-M8Bgk-0hS8NSkOLd3GOfawuGQU"
            },
        });
        const json = response.json;
        // console.log(json);
        // console.log("delete note" + id)
        const newNotes = notes.filter((note) => { return note._id !== id }) // if existing notes is equal to id then delete
        setNotes(newNotes)
    }
    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //API CAll
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1YjNkZjEyN2JiZjNjY2Y0MWI1ZjQ0In0sImlhdCI6MTY4MzcwMzY1OH0.hEf7pbMNbg1FS6Tl-M8Bgk-0hS8NSkOLd3GOfawuGQU"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json()
        // console.log("text is being executed")
        // console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))
        //Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes)
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider >
        // The NoteContext.Provider component is being used to wrap the props.children components, which means that any component that is a child of NoteContext.Provider will be able to access the state and update properties of the context via the useContext hook in React.
    )
}
export default NoteState;