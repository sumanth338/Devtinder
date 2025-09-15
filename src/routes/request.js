const express = require("express")

const requestRouter = express.Router()
const userAuth = require("../middleware/auth")
const ConnectionRequest = require("../model/ConnectionRequest")
const User = require("../model/user")

//practice
requestRouter.post('/request/send/:status/:toUserId',userAuth, async(req, res)=>{
	try{
		const fromUserId = req.user.id;
		const toUserId = req.params.toUserId;
		const status = req.params.status;

		const allowedStatus = ["interested", "ignored"]
		if (!allowedStatus.includes(status)) {
			return res.status(400).json({
				message: "Invalid status"
			})
		}
		const toUser = await User.findById(toUserId);
		if (!toUser) {
			return res.status(404).json({
				message: "User not found"
			})
		}


		const existingConnectionRequest = await ConnectionRequest.findOne({
			$or: [{
					fromUserId,
					toUserId
				},
				{
					fromUserId: toUserId,
					toUserId: fromUserId
				}
			]
		})
		if (existingConnectionRequest) {
			return res.status(400).json({
				message: "Connection request already exists"
			})
		}

		const connectionRequest = new ConnectionRequest({
			fromUserId,
			toUserId,
			status,
		})
		const data = await connectionRequest.save();

		res.json({
			// message:"Connection request sent successfully",
			message: req.user.firstName + " is " + status + " to " + toUser.firstName,
			data,
		})
	} catch (error) {
		res.status(400).send("error" + error.message)
	}
})

requestRouter.get('/request/review/:status/:requestId', userAuth, async (req, res) => {
	//validate status

	//loggedInId = touserId
	//status = interested
	try {
		const loggedInUser = req.user;
		const {
			status,
			requestId
		} = req.params;

		const allowedStatus = ["accepted", "rejected"]
		if (!allowedStatus.includes(status)) {
			return res.status(400).json({
				message: "Invalid status"
			})
		}
		const connectionRequest = await ConnectionRequest.findOne({
			_id: requestId,
			toUserId: loggedInUser.id,
			status: "interested"
		})
		if (!connectionRequest) {
			return res.status(404).json({
				message: "Connection request not found"
			})
		}

		connectionRequest.status = status;
		const data = await connectionRequest.save();

		res.json({
			message: "Connection request " + status , data
		})
	} catch (err) {
		res.status(400).send("error" + err.message)
	}
})

module.exports = requestRouter