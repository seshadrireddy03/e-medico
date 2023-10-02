const mongoose = require('mongoose')
const formSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        ref:'donor'
    },
    location:{
        type:String,
        required:true,
        ref:'Volunter'
    },
    description:{
        type:String,
        required:true
    },
    dphoneno:{
        type:String,
        required:true,
    },
    rphoneno:{
        type:String,
        required:true,
    },
    vphoneno:{
        type:String,
        required:true,
    },
    raccepted:{
        type:Boolean, 
        required: true, 
    },
    accepted:{
        type:Boolean, 
        required: true, 
    },
    vname:{
        type:String,
        required:true
    },
    rname:{
        type:String,
        required:true
    }

})

const Form = mongoose.model('Form',formSchema)

module.exports = Form