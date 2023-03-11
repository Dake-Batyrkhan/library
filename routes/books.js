const express = require('express');
const router = express.Router();

let allBooks = [];
router.get('/', (req, res) => {
    res.send(allBooks);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const bookWithId = allBooks.find((book) => book.id == id);
    res.send(bookWithId);
});

router.post('/', (req, res) => {
    const postBody = req.body;
    allBooks.push(postBody);
    console.log(allBooks);
    res.send({ success: true });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, year, authorId, genreId, rating } = req.body;
    let bookToUpd = allBooks.find((book) => book.id == id);

    bookToUpd.title = title;
    bookToUpd.year = year;
    bookToUpd.authorId = authorId;
    bookToUpd.genreId = genreId;
    bookToUpd.rating = rating;
    res.send({ success: true });
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { title, year, authorId, genreId, rating } = req.body;
    let bookToUpd = allBooks.find((book) => book.id == id);

    if (title) bookToUpd.title = title;
    if (year) bookToUpd.year = year;
    if (authorId) bookToUpd.authorId = authorId;
    if (genreId) bookToUpd.genreId = genreId;
    if (rating) bookToUpd.rating = rating;
    res.send({ success: true });

});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    allBooks = allBooks.filter((book) => book.id != id);
    res.send({ success: true });
});

module.exports = router;
