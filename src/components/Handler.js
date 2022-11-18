import PropTypes from 'prop-types';
import "../App.css";
import AddBook from "./AddBook";
import CurrentlyReading from "./CurrentlyReading";
import Read from "./Read";
import WantToRead from "./WantToRead";

/**
* @description Represents a Handler component
* @constructor
* @param {array} currentlyReadingBooks - books present in currently reading shelf
* @param {array} readBooks - books present in currently reading shelf
* @param {array} wantToReadBooks - books present in currently reading shelf
* @param {func} setUpdateBook - to update the book shelf
* @returns {component} return component
*/
function Handler({ currentlyReadingBooks, wantToReadBooks, readBooks, setUpdateBook }) {
  return (
    <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <CurrentlyReading currentlyReadingBooks={currentlyReadingBooks} setUpdateBook={setUpdateBook}/>
              <WantToRead wantToReadBooks={wantToReadBooks} setUpdateBook={setUpdateBook}/>
              <Read readBooks={readBooks} setUpdateBook={setUpdateBook}/>
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
  setUpdateBook: PropTypes.func
};

export default Handler;
