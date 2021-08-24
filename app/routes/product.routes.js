const router = require('express').Router();
const auth = require('../middleware/vendor.auth')

router.post('/add', auth, (req, res) => {
    res.send('product add')
})

module.exports = router;