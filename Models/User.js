const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 64,
    },
    phone: {
        type: Number
    },
    date: {
        type: String
    }
    ,
    gender: {
        type: String
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true })
const User = mongoose.model('User', userSchema)
module.exports = User