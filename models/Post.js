const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    likeCount:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const PostMessage = mongoose.model('Post',PostSchema)

module.exports = PostMessage