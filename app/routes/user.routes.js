const router = require('express').Router();
const User = require('../db/models/user.model')
const auth = require('../middleware/auth')
const responseStatus = require('../helpers/response.helper')

router.post('/register', async(req, res) => {
    try {
        const newUser = new User(req.body)
        await newUser.save()
        res.status(200).send(responseStatus(true, newUser, 'User added successfully'))
    }
    catch(err) {
        res.status(500).send(responseStatus(false, err.message, 'Register error'))
    }
});

router.post('/login', async(req, res) => {
    try {
        const userData = await User.findByCredintials(req.body.email, req.body.password)
        const token = await userData.generateToken()
        res.status(200).send(responseStatus(true, {userData, token}, 'User login success'))
    }
    catch(err) {
        res.status(500).send(responseStatus(false, err.message, 'Login error'))
    }
});

router.post('/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(obj => obj.token != req.token)
        await req.user.save()
        res.status(200).send(responseStatus(true, {}, 'User logout success'))
    }
    catch(err) {
        res.status(500).send(responseStatus(false, err.message, 'Logout error'))
    }
});

module.exports = router;