const router = require('express').Router()
const { SECRET } = require('../utils/config')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { sendVerificationMail } = require('../utils/email')

router.get('/:token', async (req, res) => {
  if (!req.params.token) {
    return res.status(401).send('Invalid verification URL')
  }
  try {
    const payload = jwt.verify(req.params.token, SECRET)
    const id = payload.id
    await User.findByIdAndUpdate(id, { isVerified: true })
    return res.status(201).send('User verified successfully!')
  } catch (err) {
    console.log(err)
    return res.status(401).json(err)
  }
})

router.get('/', async (req, res) => {
  if (!req.user) {
    return res.status(401).send('Unauthorized')
  }
  sendVerificationMail(req.user)
  return res.status(200).send('Verification Email Sent')
})

module.exports = router
