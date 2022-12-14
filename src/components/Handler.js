import PropTypes from 'prop-types';
import "../App.css";
import AddBook from "./AddBook";
import BookShelf from './BookShelf';

/**
* @description Represents a Handler component
* @constructor
* @param {array} currentlyReadingBooks - books present in currently reading shelf
* @param {array} readBooks - books present in currently reading shelf
* @param {array} wantToReadBooks - books present in currently reading shelf
* @param {func} setUpdateBook - to update the book shelf
* @param {array} dropdownOptions - drop down options array
* @param {string} selectedShelf - represents selected shelf
* @param {func} handleChange - handles the shelf change
* @returns {component} return component
*/
function Handler({ currentlyReadingBooks, wantToReadBooks, readBooks, setUpdateBook, dropdownOptions, selectedShelf, handleChange }) {
  return (
    <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf booksInTheShelf={currentlyReadingBooks} setUpdateBook={setUpdateBook} shelfName={"Currently Reading"} dropdownOptions={dropdownOptions} selectedShelf={selectedShelf} handleChange={handleChange}/>
              <BookShelf booksInTheShelf={wantToReadBooks} setUpdateBook={setUpdateBook} shelfName={"Want To Read"} dropdownOptions={dropdownOptions} selectedShelf={selectedShelf} handleChange={handleChange}/>
              <BookShelf booksInTheShelf={readBooks} setUpdateBook={setUpdateBook} shelfName={"Read"} dropdownOptions={dropdownOptions} selectedShelf={selectedShelf} handleChange={handleChange}/>
              <AddBook />
            </div>
          </div>
        </div>
    </div>
  );
}

//propTypes of the Handler component are defined
Handler.propTypes = {
  currentlyReadingBooks: PropTypes.array,
  wantToReadBooks: PropTypes.array,
  readBooks: PropTypes.array,
  setUpdateBook: PropTypes.func,
  dropdownOptions: PropTypes.array,
  selectedShelf: PropTypes.string,
  handleChange: PropTypes.func
};

export default Handler;
