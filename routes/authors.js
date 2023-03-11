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
    const postBody = req.body;
    allAuthors.push(postBody);
    res.send({ success: true });
});

router.put('/:id', (req,res) =>{
    const { id } = req.params;
    const { fullname } = req.body;
    let putId = allAuthors.find((author) => author.id == id);
    putId.fullname = fullname;
    res.send({ success: true });
});

router.patch('/:id', (req,res) => {
    const { id } = req.params;
    const {fullname} = req.body;
    let patchId = allAuthors.find((author) => author.id == id);
    if(fullname) patchId.fullname = fullname;
    res.send({ success: true });
});

router.delete('/:id', (req,res) => {
    const { id } = req.params;
    let leftAuthors = allAuthors.filter((author) => author.id != id);
    allAuthors = leftAuthors;
    res.send(leftAuthors);
});



module.exports = router;