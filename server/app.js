const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const app = express()
const jwt = require('jsonwebtoken')
const {MONGODB_URI , SECRET} = require('./utils/config')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const chatRoomRouter = require('./controllers/chatroom')
const verifyRouter = require('./controllers/verify')
const profileRouter = require('./controllers/profile')
const {userExtractor} = require('./utils/middleware')
const cors = require('cors')
const { Server } = require('socket.io');
const User = require('./models/User')
const ChatRoom = require('./models/ChatRoom')
const Message = require('./models/Message')

const httpServer = http.createServer(app)
const io = new Server(httpServer,{
  cors:'*'
})

try{
  mongoose.connect(MONGODB_URI)
  console.log('Connected to MongoDB')
}catch{
  console.log('Error connecting to db');
}
app.use(express.json())

app.use(userExtractor)

app.use(cors())

app.use('/login',loginRouter)
app.use('/api/rooms',chatRoomRouter)

app.use('/api/users',userRouter)
app.use('/verify',verifyRouter)
app.use('/profile',profileRouter)

app.get('/', (req, res) => {
  if(req.user){
    return res.json(req.user)
  }
  return res.json('Login first')
})


io.on('connection',(socket)=>{
  console.log(`New connection`,socket.id)

  let user = null
  const token = socket.handshake.auth
  if(!token){
    console.log('no toekm')
    return socket.disconnect()
  }
  jwt.verify(token.token , SECRET, async (err,decoded)=>{
    if(err){
      return socket.disconnect()
    }
    user = await User.findByIdAndUpdate(decoded.id , {
      socketId : socket.id
    },{new:true})
  })
  console.log('A user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })

  socket.on('message', async (msg , to , chatRoomId)=>{
      const message = new Message({
          text : msg ,
          from : user._id ,
          chatRoomId : chatRoomId 
      })
      
      await message.save()

      const chatRoom = await ChatRoom.findById(chatRoomId)
      const reciever = await User.findById(to)
      chatRoom.messages = chatRoom.messages.concat(message._id)
      chatRoom.save()

      console.log('rec',reciever.socketId)

      io.to(user.socketId).emit('SendMessage',message);
      
      if(reciever.socketId){
        io.to(reciever.socketId).emit('SendMessage',message); 
      }
      
  })

})


module.exports = httpServer
