const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error('invalid email format')
        }
    }, 
    password:{
        type: String,
        trim: true, 
        required: true,
        min:8,
        match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/
     },
    phone:{
        type: String,
        trim: true,
        validate(value){
            if(!validator.isMobilePhone(value, ['ar-EG'])) throw new Error('invalid phone number')
        }
    },
    address:{
        type: String,
        trim: true
    },
    image:{
        type: String,
        trim: true
    },
    tokens:[
        { token: { type: String } }
    ]
}, 
{
    timestamps:true
});

// Encrypt Password
userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

// Login User
userSchema.statics.findByCredintials = async(email, password) => {
    const user = await User.findOne({email});
    if (!user) throw new Error('Invalid email')
    const isValidPass = await bcrypt.compare(password, user.password)
    if (!isValidPass) throw new Error('Invalid password')
    if (user.tokens.length > 5) throw new Error('Number of login exceeded')
    return user
}

// Generate Token
userSchema.methods.generateToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWTSECURITY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

const User = new mongoose.model('user', userSchema)

module.exports = User;