const express = require("express")
const userAuth = require("./middleware/auth")
const connectDB = require("./config/database")
const User = require("./model/user")
const {validateSignupData} = require("./utils/validation")
const bcrypt = require("bcrypt")

const app = express()

app.use(express.json())

// add user
app.post("/signup", async(req, res)=>{
	
	try{	
		validateSignupData(req)

		const {firstName, lastName, email, password} = req.body

		const hashedPassword = await bcrypt.hash(password, 10)
		const user = new User({firstName, lastName, email, password:hashedPassword})
		await user.save()
		res.send("user created successfully")
	}catch(err){
		res.status(500).send('Error:'+ err.message)
	}
})

// login
app.post("/login", async(req, res)=>{
	try{
		const {email, password} = req.body
        const user = await User.findOne({email:email})
		if(!user){
			return res.status(400).send("email id is not present in the database")
		}
		const isPasswordValid = await bcrypt.compare(password, user.password)
		console.log(user.password)
		if(isPasswordValid){
			res.send('login successful')
		}
		else{
			res.status(400).send("password is incorrect")
		}
	}
	catch(err){
		res.status(500).send('Error:'+ err.message)
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




