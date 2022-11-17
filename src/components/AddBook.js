import { Link } from 'react-router-dom';

import "../App.css";
const AddBook = ({currentlyReadingBooks, readBooks, wantToReadBooks, searchedText, setSearchedText}) =>{
    return(
        <div className="open-search">
            <Link 
                to={{
                pathname:'/add-book',
                state:{currentlyReadingBooks, readBooks, wantToReadBooks, searchedText, setSearchedText}
                }}>Add a book</Link>
        </div>
    );
}

export default AddBook;