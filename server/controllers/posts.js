import express from 'express';
import User from '../models/User.js';
import Post from '../models/Post.js';

//CreatePost
export const createPost =async(req,res)=>
{

    try{
const {userId,picturePath,description}=req.body;
const user=await User.findById(userId);
const newPost=new Post({
    userId,
    firstName: user.firstName,
    lastName: user.lastName,
    location: user.location,
    description,
    userPicturePath: user.picturePath,
    picturePath,
    likes: {},
    comments: [],
})

await newPost.save();
console.log('create post working');
const post=await Post.find();
res.status(201).json(post);
    }catch(error){
  res.json(404).json({message:error.message});
    }
}


export const userPosts=async(req,res)=>{

try {
    const {userId}=req.params;
    console.log(userId);
const post=await Post.findById(userId);
res.status(200).json(post);
console.log('user post route touched')

} catch (error) {
    res.status(404).json({message:error.message})
}

}

export const getFeedPosts=async(req,res)=>
{
try
  { 
     const post=await Post.find();
    res.status(200).json(post);
console.log('get feedpost route touched')
}
    catch(error)
    {
res.status(404).json({message:error.message})
    }
}

export const likePost=async(req,res)=>
{
try {
    
const {id}=req.params;
const {userId}=req.body;
const post =await Post.findById(id);
const isLiked=post.likes.get(userId);

if(isLiked)
{
    post.likes.delete(userId);
}
else 
{
    post.likes.set(userId,true );
}

const updatedPost=await Post.findByIdAndUpdate(
    id,
    {likes:post.likes},
    {new:true}
)
res.status(200).json(updatedPost);
} catch (error) {
    res.status(400).json({message:error.message});
}
}