const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
    },
    age:{
      type:Number,
      min:18,
    },
    gender: {
        type:String,
        validate(value){
          if(!['male','female','other'].includes(value)){
            throw new Error('Invalid gender')
          }
        }
    },
  photoUrl:{
    type:String,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCpY5LtQ47cqncKMYWucFP41NtJvXU06-tnQ&s"
  },
  about:{
    type:String,
    default:"This is my about section"
  },
  skills:{
    type:[String],
  },

},
{
  timestamps:true,
}
)

const User = mongoose.model('User',userSchema);
module.exports = User;