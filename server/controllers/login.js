const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(401).send('Provide email and password')
  }

  const user = await User.findOne({ email: email })

  if (!user) {
    return res.status(401).send('Invalid Email')
  }

  const result = await bcrypt.compare(password, user.passwordHash);
  if (result) {
   
    return res.json({ user: user, token: user.generateVerificationToken() })

  }
  return res.status(401).send('Wrong password')
})


module.exports = router