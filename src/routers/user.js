const express = require('express');
const User = require('../model/user');
const router = new express.Router();
const auth = require('../middleware/auth');

router.post('/users', async (req,res) => {
    const user = new User(req.body);
    try {
        const token = await user.generateAuthToken();
        await user.save(); 
        res.status(201).send( { user,token });
    } catch(e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        console.log('p');
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token});
    } catch(e) {
        console.log(e);
        res.status(402).send(e);
    }
});

router.post('/users/logout', auth, async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        });
        await req.user.save();
        res.send();
    } catch(e) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async (req,res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch(e) {
        res.status(500).send();
    }
});

router.get('/users/me', auth, async (req,res) => {
    res.send(req.user);
});


module.exports = router;