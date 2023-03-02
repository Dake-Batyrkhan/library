const express = require('express');
const router = express.Router();

let allBooks = [
    {
        "id": 1,
        "title": "Abai joly 1",
        "year": "1934",
        "authorId": 1,
        "genreId": 2,
        "rating": 8
    },
    {
        "id": 2,
        "title": "Uwkan uia",
        "year": "1954",
        "authorId": 2,
        "genreId": 2,
        "rating": 6
    },
    {
        "id": 3,
        "title": "Alchemist",
        "year": "1965",
        "authorId": 3,
        "genreId": 3,
        "rating": 7
    }

]
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
    res.sendStatus(201);
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
    res.send(bookToUpd);
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
    res.send(bookToUpd);

});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    allBooks = allBooks.filter((book) => book.id != id);
    res.send({ success: true });
});

module.exports = router;
