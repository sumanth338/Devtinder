const userAuth = (req, res, next) =>{
    console.log("User auth is getting checked");
    const token = "xyz";
    const isuserAuth = token === "xyzz";
    if(!isuserAuth){
        res.status(401).send("User is not authorized")
    }
    else{
        next();
    }
}

module.exports = userAuth;