import { useState } from "react";
import PropTypes from 'prop-types';
import "../App.css";

/**
* @description Represents a CurrentlyReading component
* @constructor
* @param {array} booksInTheShelf - books present in currently reading shelf
* @param {string} shelfName - a bookshelf name
* @param {func} setUpdateBook - to update the book shelf
* @param {string} shelfName - selected drop down 
* @param {array} dropdownOptions - drop down options array
* @returns {component} return component
*/
const BookShelf = ({ booksInTheShelf, setUpdateBook, shelfName, dropSelected, dropdownOptions }) =>{
    const [selectedShelf, setSelectedShelf] = useState('none');
    const handleChange = (value, book) =>{
        console.log("moving "+book['title']+" to "+value);
        if(value !== 'none'){
            //added shelf update function
            setUpdateBook({book:book, shelf:value, update:true});
        }
        setSelectedShelf('none');
    }

    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfName}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                {
                    booksInTheShelf.map((book)=>{
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
                                                            return <option key={option.value} value={option.value} disabled={option.value===dropSelected}>{option.name}</option>
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
        </div>
    );
}

//propTypes of the CurrentlyReading component are defined
BookShelf.propTypes = {
    booksInTheShelf: PropTypes.array,
    setUpdateBook: PropTypes.func,
    shelfName: PropTypes.string,
    dropSelected: PropTypes.string,
    dropdownOptions: PropTypes.array
};

export default BookShelf;