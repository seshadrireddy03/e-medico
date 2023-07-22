const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    doctor:{
        type:String,
        required:true
    },
    patient:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
})
const Comments = mongoose.model('Comments',commentSchema)

module.exports = Comments