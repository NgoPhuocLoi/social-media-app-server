const User = require('../models/userModel')
const bcrypt = require('bcrypt')

const userServices = {
  getAllUser: async () => {
    try {
      let users = await User.find()
      users.map((user) => {
        const { password, ...otherInfo } = user
        return otherInfo
      })
      return users
    } catch (error) {
      console.log(error)
    }
  },
  getUser: async (id) => {
    try {
      const user = await User.findById(id)

      return user
    } catch (error) {
      console.log(error)
    }
  },
  updateUser: async (id, newInfo, newPassword) => {
    try {
      if (newPassword) {
        const salt = await bcrypt.genSalt(10)
        hashedPassword = await bcrypt.hash(newPassword, salt)

        newInfo.password = hashedPassword
      }
      const user = await User.findByIdAndUpdate(id, newInfo, { new: true })

      return user
    } catch (error) {
      console.log(error)
    }
  },
  deleteUser: async (id) => {
    try {
      const user = await User.findByIdAndDelete(id)
      return user
    } catch (error) {
      console.log(error)
    }
  },
  followUser: async (followUserId, followingUserId) => {
    const result = {
      success: true,
      message: '',
    }
    try {
      const followUser = await User.findById(followUserId)
      const followingUser = await User.findById(followingUserId)

      if (!followUser || !followingUser) {
        result.success = false
        result.message = 'User not found'
        return result
      }

      if (!followUser.followers.includes(followingUser._id)) {
        await followUser.updateOne({ $push: { followers: followingUserId } })
        await followingUser.updateOne({ $push: { followings: followUserId } })

        result.success = true
        result.message = 'User followed'
      } else {
        result.success = false
        result.message = 'User is already followed by you'
      }

      return result
    } catch (error) {
      console.log(error)
    }
  },
  unFollowUser: async (unFollowUserId, unFollowingUserId) => {
    const result = {
      success: true,
      message: '',
    }
    try {
      const followUser = await User.findById(unFollowUserId)
      const followingUser = await User.findById(unFollowingUserId)

      if (!followUser || !followingUser) {
        result.success = false
        result.message = 'User not found'
        return result
      }

      if (followUser.followers.includes(followingUser._id)) {
        await followUser.updateOne({ $pull: { followers: unFollowingUserId } })
        await followingUser.updateOne({
          $pull: { followings: unFollowUserId },
        })

        result.success = true
        result.message = 'User unFollowed'
      } else {
        result.success = false
        result.message = 'User is not followed by you'
      }

      return result
    } catch (error) {
      console.log(error)
    }
  },
}

module.exports = userServices
