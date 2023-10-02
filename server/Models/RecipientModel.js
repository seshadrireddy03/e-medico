const mongoose = require('mongoose')
const recipientSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    dob:{
        type:Date,
        required:true,
    }
})

const recipient = mongoose.model('Recipient',recipientSchema)

module.exports = recipient