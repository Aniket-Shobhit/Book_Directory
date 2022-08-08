const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    likes: {
        type: Number,
        default: 0,
        required: true
    },
    isbn: {
        type: Number,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

bookSchema.virtual('usersLiked', {
    ref: 'User',
    localField: '_id',
    foreignField: 'likedBooks'
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;