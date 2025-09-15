const express = require('express');
const userRouter = express.Router();
const userAuth = require('../middleware/auth');
const ConnectionRequest = require('../model/connectionRequest');



userRouter.get("/user/requests/received",userAuth, async(req,res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.
        find({toUserId:loggedInUser._id,status:"interested"}).populate("fromUserId",["firstName","lastName"]);
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
        const connections = await ConnectionRequest.find({$or:[{fromUserId:loggedInUser._id,status:"accepted"},{toUserId:loggedInUser._id,status:"accepted"}]}).populate("fromUserId",["firstName","lastName"]).populate("toUserId",["firstName","lastName"]);
        res.json({
            message:"Data fetched successfully",
            data:connections
        })
    }
    catch(err){
        res.status(400).send("Error:"+err.message)
    }
})

module.exports = userRouter