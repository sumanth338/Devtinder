const express = require("express")
const connectDB = require("./config/database")
const User = require("./model/user")
const cookieParser = require("cookie-parser")

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/",authRouter);
app.use("/",profileRouter)
app.use("/",requestRouter)





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

// Update user by id
app.patch('/user/:userId', async(req, res)=>{
	const userId = req.params?.userId
	const data = req.body
	
	try{
		const ALLOWED_UPDATES = ["photoUrl","age","gender","skills"]
	const updates = Object.keys(data)
	const isValidUpdate = updates.every((update)=>ALLOWED_UPDATES.includes(update))
	if(!isValidUpdate){
		return res.status(400).send('Invalid updates')
	}
		const user = await User.findByIdAndUpdate({_id:userId}, data)
		res.send('User updated successfully')
		runValidators:true
	}catch(err){
		res.status(400).send('Error updating user')
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




