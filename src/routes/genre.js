const Genre = require('../models/genre.js');
const Books = require('../models/books.js');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  Genre.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/:id/books', async (req, res) => {
  const genreId = req.params.id;
  const result = await Genre.findById(genreId);

  if (!result) {
    return res.status(404).send('Genre not found');
  }
  const genreBooks = await Books.find({ genreId });

  if (genreBooks.length === 0) {
    return res.status(404).send('Books not found for that genre');
  }

  res.send(genreBooks);
});

router.get('/:id', (req, res) => {
  Genre.findById(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/', (req, res) => {
  const postGenre = new Genre(req.body);
  postGenre
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put('/:id', (req, res) => {
  Genre.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.patch('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;
    const result = await Genre.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await Genre.findByIdAndDelete(userId);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
module.exports = router;
