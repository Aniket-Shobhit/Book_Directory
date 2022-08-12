const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Book = require('./book');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is Invalid!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password should not contain the word password!');
            }
        }
    },
    phoneNo: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    likedBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }]
});

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    // delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

//generates the token when a new user in created or when a user is logged in
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign( {_id: user._id.toString()}, process.env.JWT);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({ email });
    if(!user) {
        throw new Error('Unable to login');
    }
    const isValid = await bcrypt.compare(password,user.password);
    if(!isValid) {
        throw new Error('Unable to login!');
    }
    return user;
}

userSchema.pre('save', async function(next) {
    const user = this;

    if(user.isModified('password')) {
        console.log(user.password);
        user.password = await bcrypt.hash(user.password,8);
        console.log(user.password);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;