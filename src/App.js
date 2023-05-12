import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import NoteState from './context/notes/NoteState';
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';



function App() {

  const [alert, setAlert] = useState({ message: "", type: "primary" });

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 3000)
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}></Alert>
          <div className="container">
            <Routes>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
              <Route exact path="/home" element={<Home showAlert={showAlert} />}></Route>
              <Route exact path="/login" element={<Login showAlert={showAlert} />}></Route>
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
