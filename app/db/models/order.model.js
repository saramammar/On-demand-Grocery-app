const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    weight: {
        type: Number
    },
    cost: {
        type: Number
    },
    address: {
        type: String
    },
    status: {
        type: String
    }
},
{
    timestamps:true
})

const Order = new mongoose.model('order', orderSchema)

module.exports = Order;
