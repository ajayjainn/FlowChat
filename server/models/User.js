const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {SECRET} = require('../utils/config')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type:String,
    required:true
  },
  avatarPhoto: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
})

schema.methods.generateVerificationToken = function generateVerificationToken() {
  const token = jwt.sign({id:this.id},SECRET,{expiresIn:'7d'})
  return token
}

schema.set('toJSON',{
  virtuals:true,
  versionKey:false,
  transform:(doc,ret)=>{
    delete ret._id
    delete ret.passwordHash
  }
})

const User = mongoose.model('User',schema)
module.exports = User
