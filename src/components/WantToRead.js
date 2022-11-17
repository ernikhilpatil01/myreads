import { useState } from 'react';

// TODO: add function comments here
const WantToRead = ({ wantToReadBooks, setUpdateBook }) =>{
    const [selectedShelf, setSelectedShelf] = useState('none');
    const handleChange = (value, book) =>{
        console.log("moving "+book['title']+" to "+value);
        if(value!=="wantToRead" && value !== 'none'){
            //added shelf update function
            setUpdateBook({book:book, shelf:value, update:true});
        }
        setSelectedShelf('none');
    }
    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                {
                    wantToReadBooks.map((book)=>{
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

export default WantToRead;