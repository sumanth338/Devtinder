const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`,
        }
    },
},
{ timestamps:true}
);

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    //check if fromuserid is same to touserid
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        const error = new Error("From user and to user cannot be the same");
        return next(error);
    }
    next();
})

const ConnectionRequest = mongoose.model("ConnectionRequest",connectionRequestSchema)
module.exports = ConnectionRequest