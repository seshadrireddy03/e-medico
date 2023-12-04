const mongoose = require('mongoose')
const formSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    dname:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    phoneno:{
        type:String,
        required:true,
    },
    comments:{
        type:String, 
        required: false, 
    },

})

const Form = mongoose.model('MForm',formSchema)

module.exports = Form