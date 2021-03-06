import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

//?components
import BookDetails from './BookDetails';

const BookList = (props) => {
    const [selected, setSelected] = useState(null);
    const displayBooks = () => {
        let data = props.data;
        if (data.loading) {
            return (
                <div>Loading Books...</div>
            );
        }
        else {
            return data.books.map(book => {
                return <li key={book.id} onClick={(e) => setSelected(book.id)}>{book.name}</li>
            });
        }
    }
    return (
        <>
            <ul id="book-list">
                {displayBooks()}
            </ul>
            <BookDetails bookId={selected} />
        </>
    );
}

export default graphql(getBooksQuery)(BookList);
