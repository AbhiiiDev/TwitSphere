import User from "../models/User.js";

//READ

export const getUser=async(req,res)=>
{

    try {
       
        const {id}=req.params; //params to fetch id from string
   
        const user=await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message:error.message});
    }

}

//GRAB USER FRIENDS

export const getUserFriends=async(req,res)=> 
{
 try  {

const {id}=req.params;
const user=await User.findById(id);

const friends=await Promise.all(
    user.friends.map((id)=>User.findById(id))
);

const formattedFriends=friends.map(({
    _id, firstName, lastName, occupation, location, picturePath
})=>
{
    return { _id, firstName, lastName, occupation, location, picturePath}
})

res.status(400).json(formattedFriends);
console.log('get friends route touched')
}
catch(error){
res.status(404).json({message:error.message})
}
}


//ADD OR REMOVE FRIENDS

export const addRemoveFriends=async(req,res)=>
{
try {
    const {id,friendId }=req.params;
    const user=await User.findById(id);
    const friend=await User.findById(friendId); 
    
    //checking if friend exists or not 
    if (user.friends.includes(friendId)) {
        user.friends = user.friends.filter((id) => id !== friendId);
        friend.friends = friend.friends.filter((id) => id !== id);
      }
      else {
        user.friends.push(friendId);
        friend.friends.push(id);
      }
    await  user.save();
    await friend.save();

    const formattedFriends=friends.map(({
        _id, firstName, lastName, occupation, location, picturePath
    })=>
    {
        return { _id, firstName, lastName, occupation, location, picturePath}
    })
res.status(200).json(formattedFriends);

} catch (error) {
    res.status(404).json({message:error.message});
}
};