const httpServer = require('./app')
const { PORT } = require('./utils/config')

httpServer.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
