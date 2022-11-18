import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import "../App.css";

/**
* @description Represents a Addbook component
* @constructor
* @param {array} currentlyReadingBooks - books present in currently reading shelf
* @param {array} readBooks - books present in currently reading shelf
* @param {array} wantToReadBooks - books present in currently reading shelf
* @param {string} searchedText - books present in currently reading shelf
* @param {func} setSearchedText - books present in currently reading shelf
* @returns {component} return component
*/
const AddBook = ({currentlyReadingBooks, readBooks, wantToReadBooks, searchedText, setSearchedText}) =>{
    return(
        <div className="open-search">
            <Link 
                to={{
                pathname:'/add-book',
                state:{currentlyReadingBooks, readBooks, wantToReadBooks, searchedText, setSearchedText}
                }}
            >Add a book</Link>
        </div>
    );
}

//propTypes of the AddBook component are defined
AddBook.propTypes = {
    currentlyReadingBooks: PropTypes.array,
    readBooks: PropTypes.array,
    wantToReadBooks: PropTypes.array,
    searchedText: PropTypes.string,
    setSearchedText: PropTypes.func
};

export default AddBook;