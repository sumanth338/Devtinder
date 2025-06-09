const express = require("express")
const userAuth = require("./middleware/auth")

const app = express()

app.get('/user',userAuth, (req,res, next)=>{
	console.log("Handling the route user")
	// res.send("first response");
	next();
},
(req,res,next)=>{
	console.log("Handling the route user")
	// res.send("second response");
	next();
},
(req,res,next)=>{
	console.log("Handling the route user")
	res.send("third response");
})

app.listen(3000,()=>{
	console.log('server is running on port 3000')
})


