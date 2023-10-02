const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const app = express()
const httpServer = http.createServer(app)
const {MONGODB_URI} = require('./utils/config')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const chatRoomRouter = require('./controllers/chatroom')
const {userExtractor} = require('./utils/middleware')
const cors = require('cors')

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
app.use('/chatroom',chatRoomRouter)

app.use('/api/users',userRouter)

app.get('/', (req, res) => {
  if(req.user){
    return res.json(req.user)
  }
  return res.json('Login first')
})


module.exports = httpServer
