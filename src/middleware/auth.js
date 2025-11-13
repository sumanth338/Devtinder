const jwt = require('jsonwebtoken')
const User = require('../model/user')

const userAuth = async(req, res, next) =>{

    try{
        const cookies = req.cookies;
    
        const {token} = cookies;
        if(!token){
            return res.status(401).send("Please login")
        }
    
        const decodedObj = await jwt.verify(token,"secretkey777")
    
        const{_id} = decodedObj
    
        const user = await User.findById(_id)
        if(!user){
            throw new Error("User not found")
        }
        req.user = user;
        next();
    }
    catch(err){
        res.status(401).send("Error:"+err.message)
    }
    
 





    
    // console.log("User auth is getting checked");
    // const token = "xyz";
    // const isuserAuth = token === "xyzz";
    // if(!isuserAuth){
    //     res.status(401).send("User is not authorized")
    // }
    // else{
    //     next();
    // }
}

module.exports = userAuth;