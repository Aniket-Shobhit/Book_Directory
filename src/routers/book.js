const express = require('express');
const Book = require('../model/book');
const router = new express.Router();
const auth = require('../middleware/auth');

router.get('/getBooks', async (req,res) => {
    const books = await Book.find();

    if(req.query.sortByLikes === 'asc') {
        books.sort((a,b) => a.likes - b.likes);
    }
    else {
        books.sort((a,b) => b.likes - a.likes);
    }

    res.send(books);
});

router.get('/getBooks/:id', async (req,res) => {
    const id = parseInt(req.params.id);
    const book = await Book.findOne({ isBn:id });
    if(!book) {
        res.status(404).send('Book Not Found!');
    }
    else {
        res.status(201).send(book);
    }
});

router.get('/likedBooks', auth , async (req,res) => {
    await req.user.populate('likedBooks') ;
    res.status(201).send(req.user.likedBooks);  
});

router.post('/books', async (req,res) => {
    const book = new Book(req.body);
    try {
        await book.save();
        res.status(201).send(book);
    } catch(e) {
        res.status(400).send(e);
    }
});

//feature of providing a like button keeping its count
router.post('/likeBook/:id', auth, async (req,res) => {
    const id = parseInt(req.params.id);
    const book = await Book.findOne( {isBn: id} );
    if(!book) {
        return res.status(404).send('Book Not Found!');
    }
    const flag = req.user.likedBooks.includes(book._id);
    if(flag) {
        return res.status(200).send('You already liked the book!');
    }
    req.user.likedBooks.push(book._id);
    book.likes++;
    try {
        await book.save();
        await req.user.save();
        res.status(201).send(book);
    } catch(e) {
        res.status(400).send(e);
    }
});

module.exports = router;