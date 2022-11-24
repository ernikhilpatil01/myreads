import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from '../BooksAPI';
import "../App.css";
import Book from './Book';

/**
* @description Represents a Addbook component
* @constructor
* @param {func} setUpdateBook - to update the book shelf
* @param {string} searchedText - books present in currently reading shelf
* @param {func} setSearchedText - books present in currently reading shelf
* @param {array} dropdownOptions - drop down options array
* @param {array} currentlyReadingBooks - books present in currently reading shelf
* @param {array} readBooks - books present in currently reading shelf
* @param {array} wantToReadBooks - books present in currently reading shelf
* @param {string} selectedShelf - represents selected shelf
* @param {func} handleChange - handles the shelf change
* @returns {component} return component
*/
const SearchBook = ({ setUpdateBook, searchedText, setSearchedText, dropdownOptions, currentlyReadingBooks, readBooks, wantToReadBooks, selectedShelf, handleChange }) => {
  const [searchedBook, setSearchedBook] = useState([]);

  useEffect(() => {
    let searched = true;
    const getSearchedBook = async () => {
      if(searched && searchedText!==""){
        await BooksAPI.search(searchedText, 5).then((books)=> {
          if(Object.values(books)[0] !== "empty query" && typeof books !== "undefined") {
            setSearchedBook([
              Object.values(books).map((book)=>{
                let cval = currentlyReadingBooks[0].filter((cbook) => { return cbook.id === book.id});
                let wval = wantToReadBooks[0].filter((cbook) => { return cbook.id === book.id ? true : false; });
                let rval = readBooks[0].filter((cbook) => { return cbook.id === book.id ? true : false; });
                if(cval.length> 0) { 
                  book["shelf"]="currentlyReading";
                } else if(wval.length> 0) { 
                  book["shelf"]="wantToRead";
                } else if(rval.length> 0) { 
                  book["shelf"]="read";
                }else{
                  book["shelf"]="none";
                }
                return book;
              })
            ]);
          } else {
            setSearchedBook([]);
          }
        });
      }else {
        setSearchedBook([]);
      }
    }
    if(searched) {
      if(searchedText !== "") {
        getSearchedBook();
      } else {
        setSearchedBook([]);
      }
    } else {
      setSearchedBook([]);
    }
    return () => {
      searched = false;
      setSearchedBook([]);
    }
  }, [searchedText, currentlyReadingBooks, wantToReadBooks, readBooks]);

  const handleSearch = (value) =>{
    setSearchedText(value);
  }

  return(
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={searchedText}
            onChange={(event)=>handleSearch(event.target.value)}
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <Book books={searchedBook} setUpdateBook={setUpdateBook} dropdownOptions={dropdownOptions} handleChange={handleChange} selectedShelf={selectedShelf}/>
    </div>
  );
}

//propTypes of the SearchBook component are defined
SearchBook.propTypes = {
  setUpdateBook: PropTypes.func,
  searchedText: PropTypes.string,
  setSearchedText: PropTypes.func,
  dropdownOptions: PropTypes.array,
  selectedShelf: PropTypes.string,
  handleChange: PropTypes.func
};

export default SearchBook;