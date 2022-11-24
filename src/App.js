import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import "./App.css";
import Handler from "./components/Handler";
import SearchBook from "./components/SearchBook";
import * as BooksAPI from "./BooksAPI";

/**
* @description Represents a App component, the main component of the application
* @constructor
* @returns {component} return component
*/
function App() {
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
  const [searchedText, setSearchedText] = useState('');
  const [updateBook, setUpdateBook] = useState({ book:Object, shelf:'', update: false });
  const [selectedShelf, setSelectedShelf] = useState('none');
  
  const handleChange = (value, book) => {
    if(value !== ''){
      book["shelf"] = value;
      setUpdateBook({book:book, shelf:value, update:true});
    }
    setSelectedShelf('');
  }

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

  //drop down options for the books
  const dropdownOptions = [
    {
        name: "Move to...",
        value: "",
        disabled : true
    },
    {
        name: "Currently Reading",
        value: "currentlyReading",
        disabled : false
    },
    {
        name: "Want to Read",
        value: "wantToRead",
        disabled : false
    },
    {
        name: "Read",
        value: "read",
        disabled : false
    },
    {
      name: "None",
      value: "none",
      disabled : false
    },
  ];

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
            dropdownOptions={dropdownOptions}
            selectedShelf={selectedShelf}
            handleChange={handleChange}
          />
        } 
      />
      <Route 
        path='/search'
        element={
        <SearchBook 
          setUpdateBook={setUpdateBook}
          searchedText={searchedText}
          setSearchedText={setSearchedText}
          dropdownOptions={dropdownOptions}
          currentlyReadingBooks={currentlyReadingBooks}
          wantToReadBooks={wantToReadBooks}
          readBooks={readBooks}
          selectedShelf={selectedShelf}
          handleChange={handleChange}
        />
        }
      />
    </Routes>
  );
}

export default App;