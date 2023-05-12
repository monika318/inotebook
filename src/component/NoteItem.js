import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote, editNote } = context;
    const { note, updateNote } = props;

    const handledelete = () => {
        deleteNote(note._id);
    }

    const handleEdit = () => {
        updateNote(note)
    }

    return (
        <div className='col-md-3 '>
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text"> {note.description}</p>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={handleEdit} ></i>
                    <i className="fa-solid fa-trash mx-2" onClick={handledelete}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
