const router = require('express').Router()
const ChatRoom = require('../models/ChatRoom')

router.get('/:code',async (req,res)=>{
  if(!req.user){
    return res.status(401).send('No bearer token')
  }
  const chatroom = await ChatRoom.findOne({code:req.params.code}).populate('users','name id').exec()
  if(chatroom){
    return res.json(chatroom)
  }
  console.log(chatroom);
  res.status(404).end()
})

router.post('/',async (req,res)=>{
  if(!req.user){
    return res.status(401).send('No bearer token')
  }
  const chatroom =await new ChatRoom({users:[req.user._id.toString()]}).save()
  if(chatroom){
    return res.json(chatroom)
  }
  res.status(404).end()
})

module.exports = router