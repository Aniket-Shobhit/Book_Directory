const express = require('books');
const Book = require('../model/book');
const router = new express.Router();
// router.get('/getBooks', async (req,res) => {
//     const books = await Book.find();

//     if(req.query.sortByLikes === 'asc') {
//         books.sort((a,b) => a.likes - b.likes);
//     }
//     else {
//         books.sort((a,b) => b.likes - a.likes);
//     }

//     res.send(books);
//     // await req.user.populate({
//     //     path: 'books',
//     //     options: {
//     //         limit: parseInte(req.query.limit),
//     //         skip: parseInt(req.query.skip),
//     //     }
//     // });
// });

// router.get('/getBooks/:id', async (req,res) => {
//     try {
//         const book = Book.findOne({ isBn:req.params.id });

//     } catch(e) {
//         res.status(404).send('Book Not Found!');
//     }
// });

// router.get('/getBooks/likedBooks', auth, async (req,res) => {
//     const match = {};
//     const sort = {};
//     // try {
//     //     await req.user.populate();
//     // }
// });

router.post('/books', async (req,res) => {
    console.log('p');
    const book = new Book(req.body);
    try {
        await book.save();
        res.status(201).send(book);
    } catch(e) {
        res.status(400).send(e);
    }
});

module.exports = router;