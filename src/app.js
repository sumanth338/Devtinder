const express = require("express")
const userAuth = require("./middleware/auth")

const app = express()

app.get('/user', (req,res, next)=>{
	try{
		throw new Error('something went wrong')
		res.send("first response");
	}
	catch(err){
		res.status(500).send('Internal server error')
	}
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


