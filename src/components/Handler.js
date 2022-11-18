import PropTypes from 'prop-types';
import "../App.css";
import AddBook from "./AddBook";
import CurrentlyReading from "./CurrentlyReading";
import Read from "./Read";
import WantToRead from "./WantToRead";

// TODO: add function comments here
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

Handler.propTypes = {
  currentlyReadingBooks: PropTypes.array,
  wantToReadBooks: PropTypes.array,
  readBooks: PropTypes.array,
  setUpdateBook: PropTypes.func
};

export default Handler;
