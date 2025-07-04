const validator = require('validator');

const validateSignupData = (req)=>{
    const{firstName, lastName, email, password} = req.body
    if(!firstName || !lastName){
        throw new Error('First name and last name is required')
    }
    else if(!validator.isEmail(email)){
        throw new Error('Invalid email')
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error('Password must be strong')
    }

}

module.exports = {validateSignupData}