const express = require('express');
const router = express.Router();
const Books = require('../models/books.js');

router.get('/', (req, res) => {
    Books.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Books.findById(id)
    .then((result)=> {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

router.post('/', (req, res) => {
    const postBook = new Books(req.body);
    postBook.save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    Books.findOneAndUpdate({_id : id}, req.body)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    Books.findByIdAndUpdate(id, req.body)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Books.findByIdAndDelete(id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
