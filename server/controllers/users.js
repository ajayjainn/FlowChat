const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

const {sendVerificationMail} = require('../utils/email')

router.get('/all', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

router.get('/', async (req, res) => {
  if (req.user) {
    return res.json(req.user)
  }
  res.status(401).send('Unauthorized')
})


router.post('/', async (req, res) => {
  const cred = req.body
  if (!cred.email || !cred.password || !cred.name) {
    return res.status(401).send('Provide all the fields.')
  }

  if (cred.password.length < 8) {
    return res.status(400).send('Password must be atleast 8 letters')
  }

  const pHash = await bcrypt.hash(cred.password, 10)

  try {
    const newUser = await User({
      email: cred.email,
      passwordHash: pHash,
      name: cred.name
    }).save()
    sendVerificationMail(newUser)
    return res.json({ user: newUser, token: newUser.generateVerificationToken() })

  } catch (err) {
    if (err.errors) {
      if(err.errors.email === 'mongoose-unique-validator'){
        if(err.errors.email.king === 'mongoose-unique-validator')
        return res.status(400).send('Username already in use')
      }
    }
    console.log(err);
    return res.status(400).send('Bad request')
  }

})


module.exports = router