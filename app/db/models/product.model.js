const mongoose = require('mongoose')
const validator = require('validator')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true,
        default: 1
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        trim: true,
        default: "",
        required: true
    }
}, 
{
    timestamps:true
})

const Product = new mongoose.model('product', productSchema)

module.exports = Product;