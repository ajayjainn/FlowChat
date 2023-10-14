const router = require('express').Router()
const ChatRoom = require('../models/ChatRoom')
const User = require('../models/User')

router.get('/', async (req, res) => {

  if (!req.user) {
    return res.status(401).send('No bearer token')
  }

  try {
    await req.user.populate({
      path: 'chatRooms',
      populate: [
        {
          path: 'users'
        },
        {
          path:'messages',
          populate: [{path:'file'}]
        }
      ],
    })

    res.json(req.user.chatRooms)

  } catch (err) {
    console.log(err)
    return res.status(500).send('Error')
  }

})

router.post('/', async (req, res) => {
  if (!req.user) {
    return res.status(401).send('No bearer token')
  }

  const alreadyExist = await ChatRoom.findOne({ users: [req.user._id, req.body.receiver].sort() })
  if (alreadyExist) {
    return res.status(400).send({
      error: 'ChatRoom Already Exists.'
    })
  }

  const chatroom = await new ChatRoom({ users: [req.user._id.toString(), req.body.receiver].sort() }).save()

  req.user.chatRooms = req.user.chatRooms.concat(chatroom._id)
  await req.user.save()

  const receiver = await User.findById(req.body.receiver)
  receiver.chatRooms = receiver.chatRooms.concat(chatroom._id)
  await receiver.save()

  if (chatroom) {
    return res.json({ chatroom })
  }
  res.status(404).end()
})

module.exports = router