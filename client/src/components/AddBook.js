import React, { useState } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from 'lodash';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

const displayAuthors = (props) => {
    let data = props.getAuthorsQuery;
    if (data.loading) {
        return (<option disabled>Loading Authors...</option>);
    } else {
        return data.authors.map(author => {
            return (<option key={author.id} value={author.id}>{author.name}</option>);
        });
    }
}

const AddBook = (props) => {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addBookMutation({
            variables: {
                name: name,
                genre: genre,
                authorId: authorId
            },
            refetchQueries: [{ query: getBooksQuery }],
        });
    }

    return (
        <form id="add-book" onSubmit={handleSubmit}>
            <div className="field">
                <label>Book Name:</label>
                <input type="text" onChange={e => setName(e.target.value)} />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={e => setGenre(e.target.value)} />
            </div>
            <div className="field">
                <label>Author:</label>
                <select onChange={e => setAuthorId(e.target.value)}>
                    <option>Select Author</option>
                    {displayAuthors(props)}
                </select>
            </div>
            <button>+</button>
        </form>
    );
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
