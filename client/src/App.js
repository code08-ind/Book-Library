import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

//? Components
import BookList from './components/BookList';
import AddBook from './components/AddBook';

//? apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql'
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App" id="main">
        <h1>Book Library</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
