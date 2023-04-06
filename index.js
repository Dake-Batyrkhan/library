const express = require('express');
const bodyParser = require('body-parser');
const booksRoutes = require('./routes/books.js');
const authorsRoutes = require('./routes/authors.js');

const app = express();

const dbMongo = 'mongodb://localhost:27017/admin';
const mongoose = require('mongoose');
mongoose.connect(dbMongo)
    .then((result) => console.log("Success MongoDB"))
    .catch((err) => console.log(err));

const PORT = 3000;

app.use(bodyParser.json());

app.use('/books', booksRoutes);

app.use('/authors', authorsRoutes);

app.get('/', (req, res) => {
    console.log("GET '/' rout");
    res.send("Hello from Homepage");
});


app.listen(PORT, () => {
    console.log(`Server Started on localhost: ${PORT}`);
});