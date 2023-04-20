const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const booksSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    authorId: {
      type: mongoose.ObjectId,
      required: true,
    },
    genreId: {
      type: mongoose.ObjectId,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Books = mongoose.model('Book', booksSchema);
module.exports = Books;
