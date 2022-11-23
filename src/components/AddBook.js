import { Link } from 'react-router-dom';
import "../App.css";

/**
* @description Represents a Addbook component
* @constructor
* @returns {component} return component
*/
const AddBook = () =>{
    return(
        <div className="open-search">
            <Link to="/search">Add a book</Link>
        </div>
    );
}

export default AddBook;