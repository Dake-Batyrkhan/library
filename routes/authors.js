const express = require('express');
const router = express.Router();
const Authors = require('../models/authors.js');

router.get('/', async (req, res) => {
    const fullname = req.query.fullname;
    if(fullname){
        const authors = await Authors.find({fullname});
        res.send(authors);
    }
    else { 
        const authors = await Authors.find();
        res.send(authors);
    }
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Authors.findById(id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

router.post('/', (req, res) => {
    const postAuthor = new Authors(req.body);
    postAuthor.save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});


router.put('/:id', (req,res) =>{
    const { id } = req.params;
    Authors.findOneAndUpdate({_id : id}, req.body, {new: true}, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({error: 'Update failed.'});
        } else {
            res.send(result);
        }
    });
});


router.patch('/:id', (req,res) => {
    const { id } = req.params;
    Authors.findByIdAndUpdate(id, req.body)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
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