const jwt = require('jsonwebtoken')

require('dotenv').config()

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || null

    if (!token)
      return res
        .status(403)
        .json({ success: false, message: 'Token not found' })

    const decoded = jwt.verify(token, process.env.JWT_KEY)
    console.log(decoded)
    if (req.body._id !== decoded?.id)
      return res.status(403).json({ success: false, message: 'Invalid Token' })

    next()
  } catch (error) {
    console.log(error)
  }
}

module.exports = verifyToken
