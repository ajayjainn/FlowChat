const router = require('express').Router()
const ChatRoom = require('../models/ChatRoom')
const { userExtractor } = require('../utils/middleware')

router.get('/chatrooms', userExtractor, async (req, res) => {
  if (!req.user) {
    return res.status(401).send('No bearer token')
  }
  try {
    await req.user.populate('chatRooms')
    req.user.chatRooms.forEach(async (chatRoom) => {
      await chatRoom.populate('messages')
    });
    res.json(req.user.chatRooms)
  } catch (err) {
  }

})

router.post('/', async (req, res) => {
  if (!req.user) {
    return res.status(401).send('No bearer token')
  }
  const chatroom = await new ChatRoom({ users: [req.user._id.toString()] }).save()
  if (chatroom) {
    return res.json(chatroom)
  }
  res.status(404).end()
})

module.exports = router