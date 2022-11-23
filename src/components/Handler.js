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
* @returns {component} return component
*/
function Handler({ currentlyReadingBooks, wantToReadBooks, readBooks, setUpdateBook, dropdownOptions }) {
  return (
    <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf booksInTheShelf={currentlyReadingBooks} setUpdateBook={setUpdateBook} shelfName={"Currently Reading"} dropSelected={"currentlyReading"} dropdownOptions={dropdownOptions}/>
              <BookShelf booksInTheShelf={wantToReadBooks} setUpdateBook={setUpdateBook} shelfName={"Want To Read"} dropSelected={"wantToRead"} dropdownOptions={dropdownOptions}/>
              <BookShelf booksInTheShelf={readBooks} setUpdateBook={setUpdateBook} shelfName={"Read"} dropSelected={"read"} dropdownOptions={dropdownOptions}/>
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
  dropdownOptions: PropTypes.array
};

export default Handler;
