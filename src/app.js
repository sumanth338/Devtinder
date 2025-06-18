const express = require("express")
const userAuth = require("./middleware/auth")
const connectDB = require("./config/database")
const User = require("./model/user")

const app = express()

app.use(express.json())

// add user
app.post("/signup", async(req, res)=>{
	const user = new User(req.body)
	try{	
		await user.save()
		res.send("user created successfully")
	}catch(err){
		res.status(500).send('Error saving user')
	}
})

// Get user by emailid
app.get('/user',async(req, res)=>{
	const userEmail = req.body.email
	try{
		const users = await User.find({email:userEmail})
		if(users.length === 0){
			res.send("User not found")
		}else{
			res.send(users)
		}
	}catch(err){
		res.status(400).send('Error fetching user')
	}
})

// Delete user by id
app.delete('/user', async(req, res)=>{
	const userId = req.body.userId
	try{
		const user = await User.findByIdAndDelete(userId)
		res.send('User deleted successfully')
	}catch(err){
		res.status(400).send('Error deleting user')
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




