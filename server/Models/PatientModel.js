const mongoose = require('mongoose')
const patientSchema = new mongoose.Schema({
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
        type:Date
    }
})

const patient = mongoose.model('Patient',patientSchema)

module.exports = patient