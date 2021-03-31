const mongoose=require('mongoose')
const Schema=mongoose.Schema
const jwt = require("jsonwebtoken")

const userSchema=new Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    mobileNumber:{
        type:String,
    },
    fullAddress:{
        type:String,
    },
    adharNumber:{
        type:String,
    }
})

userSchema.pre('save', function (next) {
    const user = this
    if (user.isNew) {
        const encrytedAdhar = jwt.sign(user.adharNumber, "adhar")
        user.adharNumber = encrytedAdhar
        next()
   
    } else {
        next()
    }
  })

const User=mongoose.model('User',userSchema)

module.exports = {
    User
}