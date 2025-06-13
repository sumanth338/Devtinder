const express = require("express")
const userAuth = require("./middleware/auth")
const connectDB = require("./config/database")
const User = require("./model/user")

const app = express()

app.post("/signup", async(req, res)=>{
	const user = new User({
		firstName: "sumanth",
		lastName: "katta",
		email: "sumanth@gmail.com",
		password: "123456",
	})
	try{	
		await user.save()
		res.send("user created successfully")
	}catch(err){
		res.status(500).send('Error saving user')
	}
})



connectDB().then(()=>{
    console.log("Connected to MongoDB")
	app.listen(3000,()=>{
		console.log('server is running on port 3000')
	})
}).catch((err)=>{
    console.log("Error connecting to MongoDB")
})




