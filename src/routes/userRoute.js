const router = require('express').Router()
const verifyToken = require('../middlewares/verifyToken')
const {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unFollowUser,
  getAllUser,
} = require('../controllers/userController')

router.get('/', getAllUser)
router.get('/:id', getUser)
router.put('/:id', verifyToken, updateUser)
router.delete('/:id', deleteUser)
router.put('/:id/follow', followUser)
router.put('/:id/unfollow', unFollowUser)

module.exports = router
