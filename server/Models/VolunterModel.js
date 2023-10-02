const mongoose = require('mongoose')
const volunterSchema = new mongoose.Schema({
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

const volunter = mongoose.model('Volunter',volunterSchema)

module.exports = volunter