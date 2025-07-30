const express = require('express')
const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validateSignupData, validateEditProfileData } = require('../utils/validation')
const userAuth = require('../middleware/auth')

const authRouter = express.Router()

// add user
authRouter.post("/signup", async(req, res)=>{
	
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
authRouter.post("/login", async(req, res)=>{
	try{
		const {email, password} = req.body
        const user = await User.findOne({email:email})
		if(!user){
			return res.status(400).send("email id is not present in the database")
		}
		const isPasswordValid = await bcrypt.compare(password, user.password)
		console.log(user.password)
		if(isPasswordValid){

			const token = await jwt.sign({_id:user._id},"secretkey777",{expiresIn:"1h"})
			res.cookie("token",token)

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


//logout
authRouter.post("/logout", async(req, res)=>{
	// try{
	// 	res.clearCookie("token")
	// 	res.send("logout successful")
	// }
	// catch(err){
	// 	res.status(500).send('Error:'+ err.message)
	// }
	res.cookie("token", null,{
		expires: new Date(Date.now()),
	})
	res.send("logout successful")
})

//profile update
authRouter.patch("/profile/edit",userAuth, async(req, res)=>{
	try{
		const isEditAllowed = validateEditProfileData(req)
		if(!isEditAllowed){
			throw new Error('Invalid fields')
		}
		else{
			res.send("profile updated successfully")
		}
	}
	catch(err){
			res.status(500).send('Error:'+ err.message)
		}
		const loggedInUser = req.user
		console.log(loggedInUser)
		const {firstName, lastName, email, photoUrl, gender, age, about, skills} = req.body
		const updatedUser = await User.findByIdAndUpdate(loggedInUser._id, {firstName, lastName, email, photoUrl, gender, age, about, skills}, {new:true})
		res.send(updatedUser)
})

//forgot password
authRouter.post("/forgot-password", async(req, res)=>{
	try{
		const {email} = req.body
		const user = await User.findOne({email:email})
		if(!user){
			return res.status(400).send("email id is not present in the database")
		}
		const token = await jwt.sign({_id:user._id},"secretkey777",{expiresIn:"1h"})
	}
	catch(err){
		res.status(500).send('Error:'+ err.message)
	}
})
module.exports = authRouter