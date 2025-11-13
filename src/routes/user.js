const express = require('express');
const userRouter = express.Router();
const userAuth = require('../middleware/auth');
const ConnectionRequest = require('../model/connectionRequest');
const User = require('../model/user');



userRouter.get("/user/requests/received",userAuth, async(req,res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.
        find({toUserId:loggedInUser._id,status:"interested"}).populate("fromUserId",["firstName","lastName","photoUrl","about"]);
        res.json({
            message:"Data fetched successfully",
            data:connectionRequests
        })
    }
    catch(err){
        res.status(400).send("Error:"+err.message)
    }
})

userRouter.get("/user/connections",userAuth, async(req, res)=>{
    try{
        //sumanth=>Dhoni=>accepted
        //Dhoni=>elon=>accepted
        const loggedInUser = req.user;
        const connections = await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id,status:"accepted"},
                {toUserId:loggedInUser._id,status:"accepted"}
            ]
        }).populate("fromUserId").populate("toUserId");
        
        // Extract only the other user's details (not the logged-in user)
        const connectionsData = connections.map(connection => {
            if(connection.fromUserId._id.toString() === loggedInUser._id.toString()){
                return connection.toUserId;
            } else {
                return connection.fromUserId;
            }
        });
        
        res.json({
            message:"Data fetched successfully",
            data:connectionsData
        })
    }
    catch(err){
        res.status(400).send("Error:"+err.message)
    }
})

userRouter.get("/user/feed",userAuth, async(req, res)=>{        
    try{
        const loggedInUser = req.user;
       // find all the connections requests
       const connectionRequests = await ConnectionRequest.find({
        $or:[{fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}],
       }).select("fromUserId toUserId").populate("fromUserId",["firstName","lastName"]).populate("toUserId",["firstName","lastName"]);
       
       const hideUsersFromFeed = new Set();
       connectionRequests.forEach(connectionRequest=>{
        hideUsersFromFeed.add(connectionRequest.fromUserId._id);
        hideUsersFromFeed.add(connectionRequest.toUserId._id);
       })
       console.log(hideUsersFromFeed);       
       const usersToShow = await User.find({
        $and:[{_id:{$nin:Array.from(hideUsersFromFeed)}},{_id:{$ne:loggedInUser._id}}]
        }).select("firstName lastName photoUrl about skills");


       res.json({
           message:"Data fetched successfully",
           data:usersToShow
       })
    }
    catch(err){
        res.status(400).send("Error:"+err.message)
    }
})

module.exports = userRouter