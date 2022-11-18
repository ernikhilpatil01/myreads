import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import "../App.css";

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

AddBook.propTypes = {
    currentlyReadingBooks: PropTypes.array,
    readBooks: PropTypes.array,
    wantToReadBooks: PropTypes.array,
    searchedText: PropTypes.string,
    setSearchedText: PropTypes.func
};

export default AddBook;