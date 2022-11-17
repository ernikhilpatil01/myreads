import "../App.css";
import CurrentlyReading from "./CurrentlyReading";
import Read from "./Read";
import WantToRead from "./WantToRead";

// TODO: add function comments here
function Handler({ currentlyReadingBooks, wantToReadBooks, readBooks }) {
  return (
    <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <CurrentlyReading currentlyReadingBooks={currentlyReadingBooks} />
              <WantToRead wantToReadBooks={wantToReadBooks} />
              <Read readBooks={readBooks} />
            </div>
          </div>
        </div>
    </div>
  );
}
// TODO: add propTypes here

export default Handler;
