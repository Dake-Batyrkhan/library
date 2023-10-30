const express = require('express');
const router = express.Router();
const Authors = require('../models/authors.ts');
const Books = require('../models/books.js');

router.get('/', async (req, res) => {
  const fullname = req.query.fullname;
  if (fullname) {
    const authors = await Authors.find({ fullname });
    res.send(authors);
  } else {
    const authors = await Authors.find();
    res.send(authors);
  }
});

router.get('/:id/books', async (req, res) => {
  const authorId = req.params.id;
  const bookName = req.query.title;

  if (bookName) {
    const booksOfAuthor = await Books.find({ authorId, title: bookName });
    return res.send(booksOfAuthor);
  } else {
    const author = await Authors.findById(authorId);

    if (!author) {
      return res.status(404).send('Author not found');
    }

    const authorBooks = await Books.find({ authorId });

    if (authorBooks.length === 0) {
      return res.status(404).send('No books found for this author');
    }

    res.send(authorBooks);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  res.send(await Authors.findById(id));
});

router.post('/', (req, res) => {
  const postAuthor = new Authors(req.body);
  postAuthor
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  if (!body?.fullname) {
    return res.status(400).send({ message: 'fullname is required.' });
  }

  const allowedFields = ['fullname'];
  const disallowedFields = Object.keys(body).filter(
    (key) => !allowedFields.includes(key)
  );
  if (disallowedFields.length) {
    return res.status(400).send({
      message: `only ${allowedFields.join(', ')} fields are allowed.`,
    });
  }

  const updatedAuthor = await Authors.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  return res.send(updatedAuthor);
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updated = await Authors.findByIdAndUpdate(id, req.body);
  return res.send(updated);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Authors.findByIdAndDelete(id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Failed to delete author' });
    });
});

module.exports = router;
