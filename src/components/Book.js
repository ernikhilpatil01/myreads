import PropTypes from 'prop-types';
import "../App.css";

/**
* @description Represents a Book component
* @constructor
* @param {array} books - books present
* @param {array} dropdownOptions - drop down options array
* @param {func} handleChange - function to handle change in the shelf
* @param {array} selectedShelf - represent selected shelf
* @returns {component} return component
*/
const Book = ({ books, dropdownOptions, handleChange, selectedShelf }) =>{
    
    return(
        <div className="search-books-results">
        <ol className="books-grid">
        {
          books.map((book) => {
            
            return Object.values(book).map((bk)=>{
              let imageLink;
              if(bk.imageLinks !== undefined)
              {    
                imageLink = `url("${Object.values(bk.imageLinks)[0]}")`;
              }
              return(
                <li key={bk.id}>
                  <div className="book">
                      <div className="book-top">
                          <div
                              className="book-cover"
                              style={{
                                  width: 128,
                                  height: 192,
                                  backgroundImage: imageLink,
                              }}
                          ></div>
                          <div className="book-shelf-changer">
                              <select value={selectedShelf} onChange={(event)=>handleChange(event.target.value, bk)}>
                                {
                                  dropdownOptions.map((option)=>{
                                    return <option key={option.value} value={option.value} disabled={option.value === bk.shelf || option.disabled}>{option.name}</option>
                                  })
                                }
                              </select>
                          </div>
                      </div>
                      <div className="book-title">{bk.title}</div>
                      <div className="book-authors">{bk.authors}</div>
                  </div>
                </li>
              );
            });
          })
        }
        </ol>
      </div>
    );
}

//propTypes of the Book component are defined
Book.propTypes = {
    books: PropTypes.array,
    dropdownOptions: PropTypes.array,
    handleChange: PropTypes.func,
    selectedShelf: PropTypes.string
};

export default Book;