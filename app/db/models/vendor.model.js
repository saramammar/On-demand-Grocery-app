const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const vendorSchema = new mongoose.Schema({
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
        required: true,
        validate(value){
            if(!validator.isMobilePhone(value, ['ar-EG'])) throw new Error('invalid phone number')
        }
    },
    addresses :[
        {
            address:{
                type: String,
                trim: true
            }
        }
    ],
    workHours:{
        type: String,
        trim: true
    },
    image:{
        type: String,
        trim: true
    },
    menuImage:{
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
vendorSchema.pre('save', async function(next) {
    const vendor = this;
    if (vendor.isModified('password')) {
        vendor.password = await bcrypt.hash(vendor.password, 10)
    }
    next()
})

// Login Vendor
vendorSchema.statics.findByCredintials = async(email, password) => {
    const vendor = await Vendor.findOne({email});
    if (!vendor) throw new Error('Invalid email')
    const isValidPass = await bcrypt.compare(password, vendor.password)
    if (!isValidPass) throw new Error('Invalid password')
    if (vendor.tokens.length > 5) throw new Error('Number of login exceeded')
    return vendor
}

// Generate Token
vendorSchema.methods.generateToken = async function() {
    const vendor = this;
    const token = jwt.sign({_id: vendor._id}, process.env.JWTSECURITY)
    vendor.tokens = vendor.tokens.concat({token})
    await vendor.save()
    return token
}

const Vendor = new mongoose.model('vendor', vendorSchema)

module.exports = Vendor;