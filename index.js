const express = require('express');
const bodyParser = require('body-parser');
const booksRoutes = require('./routes/books.js');
const authorsRoutes = require('./routes/authors.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/books/:id', booksRoutes);

app.use('/authors', authorsRoutes);

app.get('/', (req, res) => {
    console.log("GET '/' rout");
    res.send("Hello from Homepage");
});


app.listen(PORT, () => {
    console.log(`Server Started on localhost: ${PORT}`);
});