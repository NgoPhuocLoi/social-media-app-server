const bcrypt = require('bcrypt')
const User = require('../models/userModel')

const authServices = {
  register: async (info) => {
    const result = {
      status: 200,
      message: '',
    }
    try {
      const oldUser = await User.findOne({ username: info.username })

      if (oldUser) {
        result.status = 400
        result.message = 'Username is already registered!'

        return result
      }
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(info.password, salt)

      const newUser = new User({ ...info, password: hashPassword })
      await newUser.save()
      return { ...result, message: 'Register successfully!', user: newUser }
    } catch (error) {
      console.log(error)
    }
  },

  login: async ({ username, password }) => {
    const result = {
      message: '',
      status: 200,
      user: null,
    }
    try {
      const user = await User.findOne({ username })

      if (!user) {
        result.message = 'User not found'
        result.status = 400
        return result
      }

      const isValid = await bcrypt.compare(password, user.password)

      if (!isValid) {
        ;(result.message = 'Incorrect password'), (result.status = 403)

        return result
      }

      result.message = 'Login successfully'
      result.user = user

      return result
    } catch (error) {
      console.log(error)
    }
  },
}

module.exports = authServices
