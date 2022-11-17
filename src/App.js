import { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import "./App.css";
import Handler from "./components/Handler";

// TODO: add function comments here
function App() {
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);

  return (
    
      <Routes>
        <Route exact path='/' element={
          <Handler
            currentlyReadingBooks={currentlyReadingBooks}
            wantToReadBooks={wantToReadBooks}
            readBooks={readBooks}
          />
        } />
      </Routes>
    
  );
}

export default App;