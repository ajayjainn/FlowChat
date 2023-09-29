const express = require('express')
const { PORT } = require('./utils/config')

const app = express()

app.get('/', (req, res) => {
  res.json('hello world')
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
