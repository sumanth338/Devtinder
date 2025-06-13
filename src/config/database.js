const mongoose = require('mongoose')

const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://kattasumanth777:OxojR9ki1gYmp@devtinder.bjbyjpf.mongodb.net/DevTinder')
    // await mongoose.connect('mongodb+srv://kattasumanth777:OxojR9ki1gYmp@devtinder.bjbyjpf.mongodb.net/')
    

}
module.exports = connectDB
