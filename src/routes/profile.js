const express = require('express')
const profileRouter = express.Router()
const userAuth = require("../middleware/auth")

profileRouter.get("/profile",userAuth, async(req, res)=>{
	try{

		// const cookie =  req.cookies;
		// console.log(cookie)
		// const{token} = cookie
		// const decodedmessage = jwt.verify(token,"secretkey777")
		// console.log(decodedmessage)
		// const {_id} = decodedmessage
		// console.log("Logged in user id is",_id)
		// const user = await User.findById(_id)
		const user = req.user;
		console.log("Logged in user is",user)
		res.send(user)
	}
	catch(err){
		res.status(500).send('Error:'+ err.message)
	}
})

module.exports = profileRouter