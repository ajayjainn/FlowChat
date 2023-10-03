const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT || 3000,
  SECRET: process.env.JWT_SECRET,
  EMAIL_KEY:process.env.EMAIL_KEY
}
