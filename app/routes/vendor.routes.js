const router = require('express').Router();
const Vendor = require('../db/models/vendor.model')
const auth = require('../middleware/vendor.auth')
const responseStatus = require('../helpers/response.helper')

router.post('/register', async(req, res) => {
    try {
        const newVendor = new Vendor(req.body)
        await newVendor.save()
        res.status(200).send(responseStatus(true, newVendor, 'Vendor added successfully'))
    }
    catch(err) {
        res.status(500).send(responseStatus(false, err.message, 'Register error'))
    }
});

router.post('/login', async(req, res) => {
    try {
        const vendorData = await Vendor.findByCredintials(req.body.email, req.body.password)
        const token = await vendorData.generateToken()
        res.status(200).send(responseStatus(true, {vendorData, token}, 'Vendor login success'))
    }
    catch(err) {
        res.status(500).send(responseStatus(false, err.message, 'Login error'))
    }
});

router.post('/logout', auth, async(req, res) => {
    try {
        req.vendor.tokens = req.vendor.tokens.filter(obj => obj.token != req.token)
        await req.vendor.save()
        res.status(200).send(responseStatus(true, {}, 'Vendor logout success'))
    }
    catch(err) {
        res.status(500).send(responseStatus(false, err.message, 'Logout error'))
    }
});

module.exports = router;