const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const app = express()
const jwt = require('jsonwebtoken')
const { MONGODB_URI, SECRET } = require('./utils/config')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const chatRoomRouter = require('./controllers/chatroom')
const verifyRouter = require('./controllers/verify')
const profileRouter = require('./controllers/profile')
const { userExtractor, s3Instance } = require('./utils/middleware')
const cors = require('cors')
const { Server } = require('socket.io');
const User = require('./models/User')
const ChatRoom = require('./models/ChatRoom')
const Message = require('./models/Message')
const multer = require('multer')
const S3ClientManager = require('./utils/S3ClientManager')
const File = require('./models/File')

const httpServer = http.createServer(app)
const io = new Server(httpServer, {
  cors: '*'
})

try {
  mongoose.connect(MONGODB_URI)
  console.log('Connected to MongoDB')
} catch {
  console.log('Error connecting to db');
}
app.use(express.json())

app.use(userExtractor)

app.use(cors())

app.use('/login', loginRouter)
app.use('/api/rooms', chatRoomRouter)

app.use('/api/users', userRouter)
app.use('/verify', verifyRouter)
app.use('/profile', profileRouter)

app.get('/', (req, res) => {
  if (req.user) {
    return res.json(req.user)
  }
  return res.json('Login first')
})

io.on('connection', (socket) => {
  console.log(`New connection`, socket.id)

  let user = null
  const token = socket.handshake.auth
  if (!token) {
    console.log('no toekm')
    return socket.disconnect()
  }
  jwt.verify(token.token, SECRET, async (err, decoded) => {
    if (err) {
      return socket.disconnect()
    }
    user = await User.findByIdAndUpdate(decoded.id, {
      socketId: socket.id
    }, { new: true })
  })
  console.log('A user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })

  socket.on('image', async (meta, bs64, to, chatRoomId) => {
    console.log('rec image')

    const buffer = Buffer.from(bs64, 'base64');
    const file = {
      ...meta,
      buffer
    }
    const s3 = S3ClientManager.getInstance()
    const fileName = await s3.writeFile(file)
    const newFile = new File({ ...meta, name: fileName })
    await newFile.save()

    const message = new Message({
      file: newFile._id,
      from: user._id,
      chatRoomId: chatRoomId
    })

    await message.save()

    const chatRoom = await ChatRoom.findById(chatRoomId)
    const reciever = await User.findById(to)
    chatRoom.messages = chatRoom.messages.concat(message._id)
    chatRoom.save()
    await Message.findById(message._id)
    await message.populate('file')

    io.to(user.socketId).emit('SendMessage', message);

    // console.log(message);

    if (reciever.socketId) {
      io.to(reciever.socketId).emit('SendMessage', message);
    }
  })

  socket.on('message', async (msg, to, chatRoomId) => {
    const message = new Message({
      text: msg,
      from: user._id,
      chatRoomId: chatRoomId
    })

    await message.save()

    const chatRoom = await ChatRoom.findById(chatRoomId)
    const reciever = await User.findById(to)
    chatRoom.messages = chatRoom.messages.concat(message._id)
    chatRoom.save()

    console.log('rec', reciever.socketId)

    io.to(user.socketId).emit('SendMessage', message);

    if (reciever.socketId) {
      io.to(reciever.socketId).emit('SendMessage', message);
    }
  })

})

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }
})
const uploadFile = upload.single('file');

app.post('/upload', uploadFile, s3Instance, async (req, res) => {
  const file = req.file
  const resp = await req.s3.writeFile(file)
  console.log(resp)
})

module.exports = httpServer
