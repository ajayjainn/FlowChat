const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {SECRET} = require('../utils/config')
var uniqueValidator = require('mongoose-unique-validator');
const sharp = require('sharp')
const path = require('path')

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique:true
  },
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type:String,
    required:true
  },
  avatarPhoto: {
    type:Buffer,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
})

schema.pre('save',async function(){
  this.avatarPhoto =await sharp(path.join(__dirname,'../public/avatar/default.png'))
    .resize(120,120)
    .png()
    .toBuffer()
})

schema.plugin(uniqueValidator,{ type: 'mongoose-unique-validator' })

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
