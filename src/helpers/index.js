const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' })
}

module.exports = { generateToken }
