import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import "./App.css";
import Handler from "./components/Handler";
import SearchBook from "./components/SearchBook";
import * as BooksAPI from "./BooksAPI";

// TODO: add function comments here
function App() {
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
  const [searchedText, setSearchedText] = useState('');
  const [updateBook, setUpdateBook] = useState({
    book:Object,
    shelf:'',
    update: false
  });

  useEffect(() => {
    let fetchBooks = true;
    const getAllBooks = async () =>{
      if(fetchBooks){
        await BooksAPI.getAll().then(books=>{
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
      <Route 
        path='/add-book'
        element={
        <SearchBook 
          setUpdateBook={setUpdateBook}
          searchedText={searchedText}
          setSearchedText={setSearchedText}
        />
        }
      />
    </Routes>
  );
}

export default App;