const express = require("express")

const requestRouter = express.Router()
const userAuth = require("../middleware/auth")

//practice
requestRouter.post('/sendConnectionRequest',userAuth, async(req, res)=>{
	const user = req.user;
	console.log("sending connection request");
	res.send(user.firstName + "sent the connection request")
})

module.exports = requestRouter