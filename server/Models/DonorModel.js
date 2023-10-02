const mongoose = require('mongoose')
const donorSchema = new mongoose.Schema({
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
    dob:{
        type:Date,
        required:true,
    }
})

const donor= mongoose.model('donor',donorSchema)

module.exports = donor