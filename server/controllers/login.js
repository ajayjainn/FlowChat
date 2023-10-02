const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

router.post('/',async (req,res)=>{
  const {username,password} = req.body

  const user = await User.findOne({username:username})

  const result = await bcrypt.compare(password, user.passwordHash);
  if(result){
    return res.json({user:user,token:user.generateVerificationToken()})
  }
  return res.status(401).send({error:'Unauthorized'})
})


module.exports = router