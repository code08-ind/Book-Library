const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const port = 8000;
const localHost = '127.0.0.1'

//? allow cross origin requests
app.use(cors());

//? database name is : "graphql".
mongoose.connect('mongodb+srv://aryan:rishu08032000@cluster0.hyz6u.mongodb.net/graphql?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('Connected To Database')
})
    .on('error', (error) => {
        console.log(error.message);
    });

//? Also we don't need to take all the components of the book and use it further for it. If Access Anything not present, so it will return us that we cannot find that. If we put wrong id to find some data, so we will not get the data to be back.
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port, localHost, () => {
    console.log(`Server Listening At Port ${port}`);
});