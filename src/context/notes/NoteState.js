import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const s1 = {
        "name": "Monika",
        "class": "13b"
    }
    const [state, setstate] = useState(s1);

    const update = () => {
        setTimeout(() => {
            setstate({
                "name": "larry",
                "class": "13c"
            })
        }, 3000)
    }

    return (
        <NoteContext.Provider value={{ state: state, update: update }}>
            {props.children}
        </NoteContext.Provider>
        // The NoteContext.Provider component is being used to wrap the props.children components, which means that any component that is a child of NoteContext.Provider will be able to access the state and update properties of the context via the useContext hook in React.
    )
}

export default NoteState;