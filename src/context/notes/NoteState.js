import NoteContext from "./NoteContext";
import { useState } from "react";



const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "645b5a3d52ee99aa90602067",
            "user": "645b3df127bbf3ccf41b5f44",
            "title": "My Title",
            "description": "Working at 2.30 pm",
            "tag": "work",
            "date": "2023-05-10T08:47:57.633Z",
            "__v": 0
        },
        {
            "_id": "645b7c5b176b45e327ea7d93",
            "user": "645b3df127bbf3ccf41b5f44",
            "title": "My second Title",
            "description": "Working at 5 pm",
            "tag": "work",
            "date": "2023-05-10T11:13:31.605Z",
            "__v": 0
        },
        {
            "_id": "645b7c5b176b45e327ea7d93",
            "user": "645b3df127bbf3ccf41b5f44",
            "title": "My second Title",
            "description": "Working at 5 pm",
            "tag": "work",
            "date": "2023-05-10T11:13:31.605Z",
            "__v": 0
        },
        {
            "_id": "645b7c5b176b45e327ea7d93",
            "user": "645b3df127bbf3ccf41b5f44",
            "title": "My second Title",
            "description": "Working at 5 pm",
            "tag": "work",
            "date": "2023-05-10T11:13:31.605Z",
            "__v": 0
        },
        {
            "_id": "645b7c5b176b45e327ea7d93",
            "user": "645b3df127bbf3ccf41b5f44",
            "title": "My second Title",
            "description": "Working at 5 pm",
            "tag": "work",
            "date": "2023-05-10T11:13:31.605Z",
            "__v": 0
        },
        {
            "_id": "645b7c5b176b45e327ea7d93",
            "user": "645b3df127bbf3ccf41b5f44",
            "title": "My second Title",
            "description": "Working at 5 pm",
            "tag": "work",
            "date": "2023-05-10T11:13:31.605Z",
            "__v": 0
        },
        {
            "_id": "645b5a3d52ee99aa90602067",
            "user": "645b3df127bbf3ccf41b5f44",
            "title": "My Title",
            "description": "Working at 2.30 pm",
            "tag": "work",
            "date": "2023-05-10T08:47:57.633Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial);
    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider >
        // The NoteContext.Provider component is being used to wrap the props.children components, which means that any component that is a child of NoteContext.Provider will be able to access the state and update properties of the context via the useContext hook in React.
    )
}

export default NoteState;