const express = require('express');
const router = express.Router();

let allAuthors = [
    {
        "id": 1,
        "fullname": "Mukhtar Auezov"
    },
    {
        "id": 2,
        "fullname": "Bauyrzhan Momyshuly"
    },
    {
        "id": 3,
        "fullname": "Paolo Koelo"
    }
]

router.get('/', (req, res) => {
    res.send(allAuthors);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const authorWithId = allAuthors.find((author) => author.id == id);
    res.send(authorWithId);
});

router.post('/', (req, res) => {
    const postB = req.body;
    allAuthors.push(postB);
    console.log(allAuthors);
});

module.exports = router;