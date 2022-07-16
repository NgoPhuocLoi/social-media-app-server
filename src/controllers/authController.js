const { register, login } = require('../services/authService')
const { generateToken } = require('../helpers')

const authController = {
  register: async (req, res) => {
    const { username, password, firstName, lastName } = req.body

    if (!username || !password || !firstName || !lastName)
      return res
        .status(422)
        .json({ success: false, message: 'Missing information' })

    try {
      const { status, message, user } = await register(req.body)

      if (status !== 200)
        return res.status(status).json({ success: false, message })
      const token = generateToken({ username: user.username, id: user._id })
      res.json({
        success: true,
        message,
        user,
        token,
      })
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .json({ success: false, message: 'Error at register user' })
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body

    if (!username || !password)
      return res
        .status(422)
        .json({ success: false, message: 'Missing Information' })

    try {
      const { status, message, user } = await login(req.body)
      let token = null
      if (user) {
        token = generateToken({ username: user.username, _id: user._id })
      }

      res
        .status(status)
        .json({ success: user ? true : false, message, user, token })
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' })
    }
  },
}

module.exports = authController
