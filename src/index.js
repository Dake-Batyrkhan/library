const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const config = require('./config.ts');
const booksRoutes = require('./routes/books');
const authorsRoutes = require('./routes/authors');
const genreRoutes = require('./routes/genre');

const app = express();
const dbMongo = process.env.MONGO_URL;
const mongoose = require('mongoose');

mongoose
  .connect(dbMongo)
  .then((result) => console.log('Success MongoDB'))
  .catch((err) => console.log(err));

app.use(bodyParser.json());

app.use('/books', booksRoutes);

app.use('/authors', authorsRoutes);

app.use('/genre', genreRoutes);

app.get('/', (req, res) => {
  console.log("GET '/' rout");
  res.send('Hello from Homepage');
});

app.listen(process.env.PORT, () => {
  console.log(`Server Started on localhost: ${process.env.PORT}`);
});
