import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import "./App.css";
import Handler from "./components/Handler";
import * as BooksAPI from "./BooksAPI";

// TODO: add function comments here
function App() {
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);

  useEffect(() => {
    let fetchBooks = true;
    const getAllBooks = async () =>{
      console.log("fetch api called");
      if(fetchBooks){
        await BooksAPI.getAll().then(books=>{
          //to print the books
          //books.filter((book)=>console.log(Object.values(book).length));
          setWantToReadBooks([books.filter((book)=> Object.values(book)[Object.values(book).length-1] === 'wantToRead')]);
          setReadBooks([books.filter((book)=> Object.values(book)[Object.values(book).length-1] === 'read')]);
          setCurrentlyReadingBooks([books.filter((book)=> Object.values(book)[Object.values(book).length-1] === 'currentlyReading')]);
        });
      }
    }

    getAllBooks();
    return () => {
      fetchBooks = false;
    }
  }, [])

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