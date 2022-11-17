import { useState } from "react";
import "../App.css";

// TODO: add function comments here
const CurrentlyReading = ({currentlyReadingBooks}) =>{
    const [selectedShelf, setSelectedShelf] = useState('none');
    const handleChange = (value, book) =>{
        console.log("moving "+book['title']+" to "+value);
        if(value!=="currentlyReading" && value !== 'none'){
            // TODO: add update function here
        }
        setSelectedShelf('none');
    }
    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                {
                    currentlyReadingBooks.map((book)=>{
                        return Object.values(book).map((bk)=>{
                            let imageLink;
                            if(bk.imageLinks !== undefined)
                            {    
                              imageLink = `url("${Object.values(bk.imageLinks)[0]}")`;
                            }
                            return(<li key={bk.id}>
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
                                                <option value="none" disabled>
                                                Move to...
                                                </option>
                                                <option value="currentlyReading">
                                                Currently Reading
                                                </option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
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
// TODO: add propTypes here

export default CurrentlyReading;