import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import Addnote from './Addnote';

const Notes = (props) => {
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const ref = useRef(null)
    const refclose = useRef(null)


    useEffect(() => {
        const fetchData = async () => {
            await getNotes();
            // eslint-disable-next-line
        };
        fetchData();
        // getNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateNote = (currentnote) => {
        ref.current.click();
        setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })

    }
    const handleClick = (e) => {
        // console.log("updating the note", note)
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refclose.current.click()
        props.showAlert("Updated Successfully ", "success");
        // editNote(note.title, note.description, note.tag);
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value }) //name=value
    }
    return (
        <div className="container">
            <Addnote showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" aria-describedby="emailHelp" name='etitle' value={note.etitle} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refclose}>Close</button>
                            <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} className="btn btn-primary custombutton  " onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1>Your Notes</h1>
            <div className="row my-3">
                <div className="container mx-2">
                    {notes.length === 0 && 'Not Notes to Display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}></NoteItem>
                })}
            </div>
        </div>
    )
}

export default Notes
