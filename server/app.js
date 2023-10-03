const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const app = express()
const {MONGODB_URI} = require('./utils/config')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const chatRoomRouter = require('./controllers/chatroom')
const verifyRouter = require('./controllers/verify')
const profileRouter = require('./controllers/profile')
const {userExtractor} = require('./utils/middleware')
const cors = require('cors')
const { Server } = require('socket.io');

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
app.use('/room',chatRoomRouter)

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
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message',(msg)=>{
    console.log(msg);
  })

})


module.exports = httpServer
