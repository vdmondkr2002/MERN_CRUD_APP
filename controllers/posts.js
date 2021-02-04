const mongoose = require('mongoose')
const PostMessage = require('../models/Post')

exports.getPosts = async(req,res)=>{
    try{
        const PostMessages = await PostMessage.find()

        return res.status(200).json(PostMessages)
    }catch(err){
        return res.status(404).json({message:err.message})
    }
}

exports.createPost = async(req,res)=>{
    const post = req.body
    const newPost = new PostMessage({...post,creator:req.userId,createdAt:new Date().toISOString()})
    try{
        await newPost.save()
        return res.status(201).json(newPost)
    }catch(err){
        return res.status(409).json({message:err.message})
    }
}

exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

exports.deletePost = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id:${id}`)
        
    await PostMessage.findByIdAndRemove(id)
    console.log("deleted!!")
    res.json({ message: "Post deleted successfully." }); 
}

exports.likePost = async(req,res)=>{
    const {id} = req.params

    if(!req.userId)
        return res.status(403).json({msg:"Unauthorized"})

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id:${id}`)

    const post = await PostMessage.findById(id)

    const userId = post.likes.findIndex(id=>id===String(req.userId)) //check whether that person has already liked the post

    if(userId==-1){         //if not
        post.likes.push(req.userId)
    }else{                  //if he has liked it already remove the like
        post.likes = post.likes.filter(id=>id!==String(req.userId))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true})

    res.json(updatedPost)
    
}