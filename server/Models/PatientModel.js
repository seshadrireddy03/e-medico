const mongoose = require('mongoose')
const patientSchema = new mongoose.Schema({
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
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    dob:{
        type:Date,
        required:true,
    },
    
})

const patient= mongoose.model('patient',patientSchema)

module.exports = patient