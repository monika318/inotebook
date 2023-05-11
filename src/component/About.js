import React from 'react'
import { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/NoteContext';

const About = () => {
    const a = useContext(NoteContext);
    useEffect(() => {
        a.update();
    }) //using the update in the NoteContext
    return (
        <div>
            <h1>This is about {a.state.name} and he is in class {a.state.class}</h1>
        </div>
    )
}

export default About
