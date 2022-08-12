const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    likes: {
        type: Number,
        default: 0
    },
    author: {
        type: String,
        required: true
    },
    isBn: {
        type: Number,
        required: true,
        unique: true
    }
});

bookSchema.virtual('usersLiked', {
    ref: 'User',
    localField: '_id',
    foreignField: 'likedBooks'
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;