const {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unFollowUser,
  getAllUser,
} = require('../services/userServices')
const jwt = require('jsonwebtoken')
const { generateToken } = require('../helpers')

const userController = {
  getAllUser: async (req, res) => {
    try {
      const users = await getAllUser()
      return res.json({ success: true, users })
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' })
    }
  },
  getUser: async (req, res) => {
    const id = req.params.id

    try {
      const user = await getUser(id)
      if (user) {
        const { password, ...otherUserInfo } = user._doc
        return res.json({ success: true, user: otherUserInfo })
      } else
        return res
          .status(400)
          .json({ success: false, message: 'User not found' })
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' })
    }
  },
  updateUser: async (req, res) => {
    const id = req.params.id
    const { _id: currentUserId, isAdmin, password, ...othersInfo } = req.body
    if (id === currentUserId || isAdmin) {
      try {
        const user = await updateUser(id, othersInfo, password)

        if (user) {
          const token = generateToken({
            username: othersInfo.username,
            id: currentUserId,
          })
          return res.json({ success: true, user, token })
        } else {
          return res
            .status(400)
            .json({ success: false, message: 'User not found' })
        }
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: 'Internal Serve Error' })
      }
    } else {
      res.status(403).json({
        success: false,
        message: 'Access denied. You can only update your own information',
      })
    }
  },
  deleteUser: async (req, res) => {
    const id = req.params.id
    const { currentUserId, isAdmin } = req.body
    if (id === currentUserId || isAdmin) {
      try {
        const user = await deleteUser(id)

        if (user) {
          return res.json({ success: true, message: 'Delete successfully' })
        } else {
          return res
            .status(400)
            .json({ success: false, message: 'User not found' })
        }
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: 'Internal Serve Error' })
      }
    } else {
      res.status(403).json({
        success: false,
        message: 'Access denied. You can only delete your own information',
      })
    }
  },
  followUser: async (req, res) => {
    const id = req.params.id
    const { currentUserId } = req.body

    if (id === currentUserId)
      return res.status(403).json({ success: false, message: 'Action denied' })

    try {
      const result = await followUser(id, currentUserId)

      return res.json(result)
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: true, message: 'Internal server error' })
    }
  },
  unFollowUser: async (req, res) => {
    const id = req.params.id
    const { currentUserId } = req.body

    if (id === currentUserId)
      return res.status(403).json({ success: false, message: 'Action denied' })

    try {
      const result = await unFollowUser(id, currentUserId)

      return res.status(result.success ? 200 : 403).json(result)
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: true, message: 'Internal server error' })
    }
  },
}

module.exports = userController
