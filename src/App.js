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
  const [updateBook, setUpdateBook] = useState({
    book:Object,
    shelf:'',
    update: false
  });

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

    const updateBookShelf = async (book, shelf) =>{
      if(updateBook.update){
        console.log('updated the shelf');
        await BooksAPI.update(updateBook.book, updateBook.shelf).then((book)=>{
          setUpdateBook({book:null, shelf:'', update:false});
        })
      }
    }
    
    updateBook.update ? updateBookShelf(updateBook.book, updateBook.shelf) : getAllBooks();
    return () => {
      updateBook.update = false;
      fetchBooks = false;
    }
  }, [updateBook])

  return (
    <Routes>
      <Route exact 
        path='/' 
        element={
          <Handler
            currentlyReadingBooks={currentlyReadingBooks}
            wantToReadBooks={wantToReadBooks}
            readBooks={readBooks}
            setUpdateBook={setUpdateBook} 
          />
        } 
      />
    </Routes>
  );
}

export default App;