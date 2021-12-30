const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    }
    ,
    gander: {
        type: String
    },
    date: {
        type: String
    }

}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema)
module.exports = Employee