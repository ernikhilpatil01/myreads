import PropTypes from 'prop-types';
import "../App.css";
import Book from "./Book";

/**
* @description Represents a CurrentlyReading component
* @constructor
* @param {array} booksInTheShelf - books present in currently reading shelf
* @param {string} shelfName - a bookshelf name
* @param {func} setUpdateBook - to update the book shelf
* @param {string} shelfName - selected drop down 
* @param {array} dropdownOptions - drop down options array
* @param {string} selectedShelf - represents selected shelf
* @param {func} handleChange - handles the shelf change
* @returns {component} return component
*/
const BookShelf = ({ booksInTheShelf, setUpdateBook, shelfName, dropdownOptions, selectedShelf, handleChange }) =>{

    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfName}</h2>
            <Book books={booksInTheShelf} setUpdateBook={setUpdateBook} dropdownOptions={dropdownOptions} handleChange={handleChange} selectedShelf={selectedShelf}/>
        </div>
    );
}

//propTypes of the Bookshelf component are defined
BookShelf.propTypes = {
    booksInTheShelf: PropTypes.array,
    setUpdateBook: PropTypes.func,
    shelfName: PropTypes.string,
    dropdownOptions: PropTypes.array,
    selectedShelf: PropTypes.string,
    handleChange: PropTypes.func
};

export default BookShelf;