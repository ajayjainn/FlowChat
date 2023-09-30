const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

router.get('/',async (req,res)=>{
  const users = await User.find({})
  res.json(users)
})

router.post('/',async (req,res)=>{
  const cred = req.body
  if(!cred.username || !cred.password || !cred.name){
    return res.status(401).json('Provide all the fields.')
  }

  const pHash = await bcrypt.hash(cred.password,10)

  const newUser = await User({
    username:cred.username,
    passwordHash:pHash,
    name:cred.name
  }).save()
  return res.json({user:newUser,token:newUser.generateVerificationToken()})
})

// router.delete('/:id',(req,res)=>{

// })

module.exports = router