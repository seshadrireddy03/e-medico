const mongoose = require('mongoose')
const formSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        ref:'Patient'
    },
    age:{
        type:Number,
        required:true,
        unique:true
    },
    url:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        requires:true
    },
    doctor:{
        type:String,
        required:true,
        ref:'Doctor'
    }
})

const form = mongoose.model('Form',formSchema)

module.exports = form