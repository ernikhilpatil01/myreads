import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from '../BooksAPI';
import "../App.css";

// TODO: add function comments here
const SearchBook = ({ setUpdateBook, searchedText, setSearchedText}) => {
  const [searchedBook, setSearchedBook] = useState([]);
  const [selectedShelf, setSelectedShelf] = useState('none');
  const handleChange = (value, book) => {
    if(value !== 'none'){
      setUpdateBook({book:book, shelf:value, update:true});
    }
    setSelectedShelf('none');
  }
  useEffect(() => {
    let searched = true;
    const getSearchedBook = async (query) =>{
      if(searched){
        await BooksAPI.search(query, 5).then((books)=>{
          console.log(Object.values(books)[0]);
          if(typeof books !== "undefined" || Object.values(books)[0] !== "empty query"){
            setSearchedBook([Object.values(books).map((book)=>book)]);
          }
        })
      }
    }
    if(searched){
      if(searchedText !== ''){
        getSearchedBook(searchedText);
      }else{
        setSearchedBook([]);
      }
    }
    return () => {
      searched = false;
      if(searchedText === ''){
        setSearchedBook([]);
      }
    }
  }, [searchedText]);
  
  return(
    <div className="search-books">
      <div className="search-books-bar">
        <Link
          to="/"
          className="close-search"
        >
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={searchedText}
            onChange={(event)=>setSearchedText(event.target.value)}
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid" key={1}>
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
                                  <option value="none" disabled>
                                  Move to...
                                  </option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
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

SearchBook.propTypes = {
  setUpdateBook: PropTypes.func,
  searchedText: PropTypes.string,
  setSearchedText: PropTypes.func
};

export default SearchBook;