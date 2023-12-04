const mongoose = require('mongoose')
const doctorSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
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

const doctor = mongoose.model('doctor',doctorSchema)

module.exports = doctor