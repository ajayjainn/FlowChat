const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const User = require('../models/User')
const S3ClientManager = require('./S3ClientManager')

function s3Instance(req, res, next) {
  req.s3 = S3ClientManager.getInstance()
  next()
}

const userExtractor = async (req,res,next)=>{
  const token = req.headers['authorization']
  if(!token){
    req.user = null
    return next()
  }
  
  jwt.verify(token.split(' ')[1], SECRET, async (err,decoded)=>{
    if(err){
      return res.status(401).json(err.message)
    }
    req.user = await User.findById(decoded.id)
    next()
  })
}

module.exports = {
  userExtractor,
  s3Instance
}