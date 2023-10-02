const router = require('express').Router()
const ChatRoom = require('../models/ChatRoom')

router.post('/',async (req,res)=>{
  if(!req.user){
    return res.status(401).send({error:'Unauthorized'})
  }
  const newChatRoom = new ChatRoom({users:[req.user._id.toString()]})
  await newChatRoom.save()
  res.json(newChatRoom)
})



module.exports = router