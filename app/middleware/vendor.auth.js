const Vendor = require('../db/models/vendor.model')
const jwt = require('jsonwebtoken')
const responseStatus = require('../helpers/response.helper')

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decodedToken = jwt.verify(token, process.env.JWTSECURITY)
        const vendor = await Vendor.findOne({_id:decodedToken._id, 'tokens.token':token})
        if (!vendor) throw new Error('Please authinticate')
        req.vendor = vendor;
        req.token = token;
        next()
    }
    catch(err) {
        res.status(500).send(responseStatus(false, err.message, 'Not authorized'))
    }
}

module.exports = auth;