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

//validate edit profile data
const validateEditProfileData = (req)=>{
    const allowedFields = ['firstName', 'lastName', 'email', 'photoUrl','gender', 'age', 'about', 'skills']

    const isEditAllowed = Object.keys(req.body).every((feild)=>allowedFields.includes(feild))
    return isEditAllowed;
}

module.exports = {validateSignupData, validateEditProfileData}