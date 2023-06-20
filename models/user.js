const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LaststName:String,
    age: Number,
    email:{
        type:String,
        required:true
    }
})


const user = mongoose.model('userDetail', userSchema)
module.exports = user