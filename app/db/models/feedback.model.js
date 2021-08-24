const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    stars: {
        type: String,
        trim: true
    },
    comment: {
        type: String
    }
},
{
    timestamps:true
})

const Feedback = new mongoose.model('feedback', feedbackSchema)

module.exports = Feedback;
