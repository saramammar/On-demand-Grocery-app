const User = require('../db/models/user.model')
const jwt = require('jsonwebtoken')
const responseStatus = require('../helpers/response.helper')

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decodedToken = jwt.verify(token, process.env.JWTSECURITY)
        const user = await User.findOne({_id:decodedToken._id, 'tokens.token':token})
        if (!user) throw new Error('Please authinticate')
        req.user = user;
        req.token = token;
        next()
    }
    catch(err) {
        res.status(500).send(responseStatus(false, err.message, 'Not authorized'))
    }
}

module.exports = auth;