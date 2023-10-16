const router = require('express').Router()
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/User')
const storage = multer.memoryStorage()

const upload = multer({ dest: './public/profile', storage: storage })

router.post('/avatar', upload.single('avatar'), async (req, res) => {
  if (!req.user) {
    return res.status(401).send('Unauthorized')
  }

  const buffer = await sharp(req.file.buffer).resize(120, 120).png().toBuffer()

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { avatarPhoto: buffer },
    { new: true },
  )
  res.status(200).json(user)
})

router.get('/avatar/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  res.setHeader('content-type', 'image/png')
  res.send(user.avatarPhoto)
})

module.exports = router
