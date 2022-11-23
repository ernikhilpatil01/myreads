import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from '../BooksAPI';
import "../App.css";

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
* @returns {component} return component
*/
const SearchBook = ({ setUpdateBook, searchedText, setSearchedText, dropdownOptions, currentlyReadingBooks, readBooks, wantToReadBooks }) => {
  const [searchedBook, setSearchedBook] = useState([]);
  const [selectedShelf, setSelectedShelf] = useState('none');
  
  const handleChange = (value, book) => {
    if(value !== 'none'){
      book["shelf"] = value;
      setUpdateBook({book:book, shelf:value, update:true});
    }
    setSelectedShelf('none');
  }

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
      <div className="search-books-results">
        <ol className="books-grid">
        {
          searchedBook.map((book) => {
            
            return Object.values(book).map((bk)=>{
              let imageLink;
              if(bk.imageLinks !== undefined)
              {    
                imageLink = `url("${Object.values(bk.imageLinks)[0]}")`;
              }
              return(
                <li key={bk.id}>
                  <div className="book">
                      <div className="book-top">
                          <div
                              className="book-cover"
                              style={{
                                  width: 128,
                                  height: 192,
                                  backgroundImage: imageLink,
                              }}
                          ></div>
                          <div className="book-shelf-changer">
                              <select value={selectedShelf} onChange={(event)=>handleChange(event.target.value, bk)}>
                                {
                                  dropdownOptions.map((option)=>{
                                    return <option key={option.value} value={option.value} disabled={option.value === bk.shelf}>{option.name}</option>
                                  })
                                }
                              </select>
                          </div>
                      </div>
                      <div className="book-title">{bk.title}</div>
                      <div className="book-authors">{bk.authors}</div>
                  </div>
                </li>
              );
            });
          })
        }
        </ol>
      </div>
    </div>
  );
}

//propTypes of the SearchBook component are defined
SearchBook.propTypes = {
  setUpdateBook: PropTypes.func,
  searchedText: PropTypes.string,
  setSearchedText: PropTypes.func,
  dropdownOptions: PropTypes.array
};

export default SearchBook;