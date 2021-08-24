const express = require('express');
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const vendorRoutes = require('./routes/vendor.routes');

require('dotenv').config();
require('./db/connection');

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/product', productRoutes)
app.use('/user', userRoutes)
app.use('/vendor', vendorRoutes)

module.exports = app;